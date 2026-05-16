import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  admins: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.string(), // "admin" | "superadmin"
    lastLogin: v.optional(v.number()),
  }).index("by_email", ["email"]),

  doctors: defineTable({
    slug: v.string(),
    name: v.string(),
    qualification: v.string(),
    specialization: v.string(),
    experience: v.number(),
    consultationFee: v.number(),
    bio: v.string(),
    photo: v.string(),
    workingDays: v.array(v.string()),
    sessions: v.array(
      v.object({
        start: v.string(), // "HH:mm"
        end: v.string(),
      })
    ),
    isActive: v.boolean(),
  }).index("by_slug", ["slug"]),

  appointments: defineTable({
    patientName: v.string(),
    patientPhone: v.string(),
    patientEmail: v.optional(v.string()),
    service: v.string(),
    doctorId: v.id("doctors"),
    doctorName: v.string(),
    appointmentDate: v.string(), // "yyyy-MM-dd"
    appointmentTime: v.string(), // "HH:mm"
    status: v.string(), // pending | confirmed | cancelled | completed | no_show
    notes: v.optional(v.string()),
    cancellationReason: v.optional(v.string()),
    cancelledAt: v.optional(v.number()),
    confirmedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
  })
    .index("by_phone", ["patientPhone"])
    .index("by_date", ["appointmentDate"])
    .index("by_doctor_date", ["doctorId", "appointmentDate"])
    .index("by_status", ["status"]),

  blockedDates: defineTable({
    blockedDate: v.string(), // "yyyy-MM-dd"
    reason: v.string(),
    appliesTo: v.string(), // "all" or doctor id
  }).index("by_date", ["blockedDate"]),

  sessions: defineTable({
    token: v.string(),
    adminId: v.id("admins"),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
