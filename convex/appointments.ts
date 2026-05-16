import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

/** Build 30-minute time slots from a doctor's sessions */
function generateSlots(sessions: { start: string; end: string }[], intervalMin = 30): string[] {
  const slots: string[] = [];
  for (const session of sessions) {
    const [sh, sm] = session.start.split(":").map(Number);
    const [eh, em] = session.end.split(":").map(Number);
    let mins = sh * 60 + sm;
    const endMins = eh * 60 + em;
    while (mins + intervalMin <= endMins + 1) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      mins += intervalMin;
    }
  }
  return slots;
}

export const getAvailability = query({
  args: { doctorId: v.id("doctors"), date: v.string() },
  handler: async (ctx, args) => {
    const doctor = await ctx.db.get(args.doctorId);
    if (!doctor) {
      return { allSlots: [], bookedSlots: [], availableSlots: [], isBlocked: true, reason: "Doctor not found" };
    }

    // Sunday closed
    const day = new Date(args.date + "T00:00:00").getUTCDay();
    if (day === 0) {
      return { allSlots: [], bookedSlots: [], availableSlots: [], isBlocked: true, reason: "Clinic closed on Sunday" };
    }

    // Blocked dates
    const block = await ctx.db
      .query("blockedDates")
      .withIndex("by_date", (q) => q.eq("blockedDate", args.date))
      .first();
    if (block && (block.appliesTo === "all" || block.appliesTo === args.doctorId)) {
      return { allSlots: [], bookedSlots: [], availableSlots: [], isBlocked: true, reason: block.reason || "Unavailable" };
    }

    const allSlots = generateSlots(doctor.sessions);
    const existing = await ctx.db
      .query("appointments")
      .withIndex("by_doctor_date", (q) => q.eq("doctorId", args.doctorId).eq("appointmentDate", args.date))
      .collect();
    const bookedSlots = existing
      .filter((a) => a.status === "pending" || a.status === "confirmed")
      .map((a) => a.appointmentTime);
    const availableSlots = allSlots.filter((s) => !bookedSlots.includes(s));

    return { allSlots, bookedSlots, availableSlots, isBlocked: false };
  },
});

export const create = mutation({
  args: {
    patientName: v.string(),
    patientPhone: v.string(),
    patientEmail: v.optional(v.string()),
    service: v.string(),
    doctorId: v.id("doctors"),
    appointmentDate: v.string(),
    appointmentTime: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const doctor = await ctx.db.get(args.doctorId);
    if (!doctor) throw new Error("Doctor not found");

    // Race condition guard
    const existing = await ctx.db
      .query("appointments")
      .withIndex("by_doctor_date", (q) =>
        q.eq("doctorId", args.doctorId).eq("appointmentDate", args.appointmentDate)
      )
      .collect();
    const taken = existing.find(
      (a) =>
        a.appointmentTime === args.appointmentTime &&
        (a.status === "pending" || a.status === "confirmed")
    );
    if (taken) throw new Error("That time slot is no longer available.");

    // Verify slot is within doctor's hours
    const validSlots = generateSlots(doctor.sessions);
    if (!validSlots.includes(args.appointmentTime)) {
      throw new Error("Selected time is outside the doctor's available hours.");
    }

    const id = await ctx.db.insert("appointments", {
      patientName: args.patientName.trim(),
      patientPhone: args.patientPhone.trim(),
      patientEmail: args.patientEmail?.trim() || undefined,
      service: args.service,
      doctorId: args.doctorId,
      doctorName: doctor.name,
      appointmentDate: args.appointmentDate,
      appointmentTime: args.appointmentTime,
      status: "pending",
      notes: args.notes?.trim() || undefined,
    });

    return await ctx.db.get(id);
  },
});

export const byPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    const phone = args.phone.trim();
    if (phone.length < 10) return [];
    const list = await ctx.db
      .query("appointments")
      .withIndex("by_phone", (q) => q.eq("patientPhone", phone))
      .collect();
    return list
      .sort((a, b) => {
        if (a.appointmentDate !== b.appointmentDate) {
          return b.appointmentDate.localeCompare(a.appointmentDate);
        }
        return a.appointmentTime.localeCompare(b.appointmentTime);
      })
      .slice(0, 50);
  },
});

export const cancelByPatient = mutation({
  args: { appointmentId: v.id("appointments"), phone: v.string(), reason: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const apt = await ctx.db.get(args.appointmentId);
    if (!apt) throw new Error("Not found");
    if (apt.patientPhone !== args.phone) throw new Error("Phone does not match");
    if (["cancelled", "completed", "no_show"].includes(apt.status)) {
      throw new Error(`Already ${apt.status}`);
    }
    await ctx.db.patch(args.appointmentId, {
      status: "cancelled",
      cancellationReason: args.reason || "Patient cancellation",
      cancelledAt: Date.now(),
    });
    return await ctx.db.get(args.appointmentId);
  },
});

// =================== ADMIN ===================

export const adminList = query({
  args: {
    token: v.string(),
    status: v.optional(v.string()),
    date: v.optional(v.string()),
    doctorId: v.optional(v.id("doctors")),
    search: v.optional(v.string()),
    fromDate: v.optional(v.string()),
    toDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);

    let list = await ctx.db.query("appointments").collect();

    if (args.status && args.status !== "all") {
      list = list.filter((a) => a.status === args.status);
    }
    if (args.date) {
      list = list.filter((a) => a.appointmentDate === args.date);
    }
    if (args.doctorId) {
      list = list.filter((a) => a.doctorId === args.doctorId);
    }
    if (args.fromDate && args.toDate) {
      list = list.filter(
        (a) => a.appointmentDate >= args.fromDate! && a.appointmentDate <= args.toDate!
      );
    }
    if (args.search) {
      const s = args.search.toLowerCase();
      list = list.filter(
        (a) =>
          a.patientName.toLowerCase().includes(s) ||
          a.patientPhone.includes(args.search!) ||
          a.service.toLowerCase().includes(s) ||
          (a.patientEmail || "").toLowerCase().includes(s)
      );
    }

    return list
      .sort((a, b) => {
        if (a.appointmentDate !== b.appointmentDate) {
          return b.appointmentDate.localeCompare(a.appointmentDate);
        }
        return a.appointmentTime.localeCompare(b.appointmentTime);
      })
      .slice(0, 500);
  },
});

export const adminUpdateStatus = mutation({
  args: {
    token: v.string(),
    appointmentId: v.id("appointments"),
    status: v.string(),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const allowed = ["pending", "confirmed", "cancelled", "completed", "no_show"];
    if (!allowed.includes(args.status)) throw new Error("Invalid status");

    const patch: any = { status: args.status };
    if (args.status === "cancelled") {
      patch.cancellationReason = args.reason || "Cancelled by clinic";
      patch.cancelledAt = Date.now();
    } else if (args.status === "confirmed") {
      patch.confirmedAt = Date.now();
    } else if (args.status === "completed") {
      patch.completedAt = Date.now();
    }

    await ctx.db.patch(args.appointmentId, patch);
    return await ctx.db.get(args.appointmentId);
  },
});

export const adminEdit = mutation({
  args: {
    token: v.string(),
    appointmentId: v.id("appointments"),
    patch: v.any(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);

    const patch = { ...args.patch };
    if (patch.doctorId && !patch.doctorName) {
      const d = await ctx.db.get(patch.doctorId);
      if (d) patch.doctorName = d.name;
    }

    await ctx.db.patch(args.appointmentId, patch);
    return await ctx.db.get(args.appointmentId);
  },
});

export const adminDelete = mutation({
  args: { token: v.string(), appointmentId: v.id("appointments") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.appointmentId);
    return { ok: true };
  },
});
