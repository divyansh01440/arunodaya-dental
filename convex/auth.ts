import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple SHA-256 hash (Convex runtime supports Web Crypto)
async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + "arunodaya_salt_v1");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateToken(): string {
  // 32 random bytes → hex
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const inputHash = await hashPassword(args.password);
    if (inputHash !== admin.passwordHash) {
      throw new Error("Invalid credentials");
    }

    // Update last login
    await ctx.db.patch(admin._id, { lastLogin: Date.now() });

    // Create session token
    const token = generateToken();
    await ctx.db.insert("sessions", {
      token,
      adminId: admin._id,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    });

    return {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  },
});

export const me = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session) return null;
    if (session.expiresAt < Date.now()) return null;

    const admin = await ctx.db.get(session.adminId);
    if (!admin) return null;

    return {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (session) await ctx.db.delete(session._id);
    return null;
  },
});

// Helper used by other admin mutations to verify the token
export async function requireAdmin(ctx: any, token: string) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q: any) => q.eq("token", token))
    .first();
  if (!session) throw new Error("Not authenticated");
  if (session.expiresAt < Date.now()) throw new Error("Session expired");
  const admin = await ctx.db.get(session.adminId);
  if (!admin) throw new Error("Admin not found");
  return admin;
}

// Export hashPassword so seed can use it
export { hashPassword };
