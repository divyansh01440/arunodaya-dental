import { useEffect, useState, useCallback } from "react";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const TOKEN_KEY = "arunodaya_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const useAuth = () => {
  const convex = useConvex();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setAdmin(null);
      setLoading(false);
      return;
    }
    try {
      const me = await convex.query(api.auth.me, { token });
      if (me) {
        setAdmin({ id: me.id, email: me.email, name: me.name, role: me.role });
      } else {
        clearToken();
        setAdmin(null);
      }
    } catch {
      clearToken();
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, [convex]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await convex.mutation(api.auth.login, { email, password });
        setToken(result.token);
        setAdmin({
          id: result.admin.id,
          email: result.admin.email,
          name: result.admin.name,
          role: result.admin.role,
        });
        return { ok: true as const };
      } catch (err) {
        return { ok: false as const, error: (err as Error).message || "Login failed" };
      }
    },
    [convex]
  );

  const signOut = useCallback(async () => {
    const token = getToken();
    if (token) {
      try {
        await convex.mutation(api.auth.logout, { token });
      } catch {
        /* ignore */
      }
    }
    clearToken();
    setAdmin(null);
  }, [convex]);

  return {
    admin,
    user: admin, // alias
    loading,
    isAdmin: !!admin && (admin.role === "admin" || admin.role === "superadmin"),
    signIn,
    signOut,
    refresh,
  };
};
