import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("doctors").collect();
    return docs.filter((d) => d.isActive).sort((a, b) => a._creationTime - b._creationTime);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("doctors")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    doctorId: v.id("doctors"),
    patch: v.any(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.doctorId, args.patch);
    return await ctx.db.get(args.doctorId);
  },
});
