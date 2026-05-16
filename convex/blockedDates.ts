import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("blockedDates").collect();
    return items.sort((a, b) => a.blockedDate.localeCompare(b.blockedDate));
  },
});

export const add = mutation({
  args: {
    token: v.string(),
    blockedDate: v.string(),
    reason: v.string(),
    appliesTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);

    const existing = await ctx.db
      .query("blockedDates")
      .withIndex("by_date", (q) => q.eq("blockedDate", args.blockedDate))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        reason: args.reason || existing.reason,
        appliesTo: args.appliesTo || existing.appliesTo,
      });
      return await ctx.db.get(existing._id);
    }

    const id = await ctx.db.insert("blockedDates", {
      blockedDate: args.blockedDate,
      reason: args.reason || "",
      appliesTo: args.appliesTo || "all",
    });
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("blockedDates") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
    return { ok: true };
  },
});
