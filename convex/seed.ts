import { mutation } from "./_generated/server";
import { hashPassword } from "./auth";

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    // Admin
    const adminEmail = "arunodayadentalclinic@gmail.com";
    const existingAdmin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", adminEmail))
      .first();

    if (!existingAdmin) {
      await ctx.db.insert("admins", {
        email: adminEmail,
        passwordHash: await hashPassword("dental@1234"),
        name: "Arunodaya Dental Clinic",
        role: "superadmin",
      });
    }

    // Doctors
    const doctors = [
      {
        slug: "prathmesh-rai",
        name: "Dr. Prathmesh Rai",
        qualification: "BDS, MDS — Conservative Dentistry & Endodontics (Indore)",
        specialization: "Endodontist · Cosmetic & Aesthetic Dentist",
        experience: 17,
        consultationFee: 500,
        bio:
          "Dr. Prathmesh Rai is the founder of Arunodaya Dental Clinic with 17 years of clinical experience. " +
          "A specialist endodontist, he is best known for delivering virtually painless root canal treatments " +
          "and beautiful cosmetic smile transformations. He has been recognized by the Indian Dental Association (IDA) " +
          "for his lectures and contributions to dental education.",
        photo: "/photos/doctor-prathmesh.jpg",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        sessions: [
          { start: "10:30", end: "15:30" },
          { start: "17:30", end: "20:30" },
        ],
        isActive: true,
      },
      {
        slug: "kalpana-sharma-rai",
        name: "Dr. Kalpana Sharma Rai",
        qualification: "BDS, MDS — Conservative Dentistry & Endodontics (Karnataka)",
        specialization: "Endodontist · Cosmetic Dentist · Dental Surgeon",
        experience: 18,
        consultationFee: 500,
        bio:
          "With 18 years of expertise, Dr. Kalpana Sharma Rai brings academic rigour and a gentle, " +
          "patient-first approach to every consultation. She previously served on the faculty of " +
          "Modern Dental College, Indore (2008–11). A member of the Indian Dental Association, she " +
          "specialises in conservative dentistry, endodontics, and aesthetic procedures. Available for " +
          "morning consultations.",
        photo: "/photos/doctor-kalpana.jpg",
        workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        sessions: [{ start: "10:30", end: "15:30" }],
        isActive: true,
      },
    ];

    for (const d of doctors) {
      const existing = await ctx.db
        .query("doctors")
        .withIndex("by_slug", (q) => q.eq("slug", d.slug))
        .first();
      if (existing) {
        await ctx.db.patch(existing._id, d);
      } else {
        await ctx.db.insert("doctors", d);
      }
    }

    return { ok: true, message: "Seed complete" };
  },
});
