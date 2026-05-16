import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getToken } from "./useAuth";
import type { Id } from "../../convex/_generated/dataModel";
import type { Appointment } from "./useAppointments";

export type { Appointment };

export interface AdminStats {
  totalAll: number;
  todayCount: number;
  todayConfirmed: number;
  pending: number;
  thisWeek: number;
  thisMonth: number;
  cancelledThisMonth: number;
  completedThisMonth: number;
  byService: { _id: string; count: number }[];
  byDoctor: { _id: string; count: number }[];
  upcoming: Appointment[];
  series: { _id: string; count: number }[];
}

export const useAdminAppointments = (filters: {
  status?: string;
  date?: string;
  doctor?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
} = {}) => {
  const token = getToken();
  const data = useQuery(
    api.appointments.adminList,
    token
      ? {
          token,
          status: filters.status,
          date: filters.date || undefined,
          doctorId: (filters.doctor || undefined) as Id<"doctors"> | undefined,
          search: filters.search || undefined,
          fromDate: filters.fromDate,
          toDate: filters.toDate,
        }
      : "skip"
  );
  return { data: data || [], isLoading: !!token && data === undefined };
};

export const useAdminStats = () => {
  const token = getToken();
  const data = useQuery(api.stats.overview, token ? { token } : "skip");
  return { data, isLoading: !!token && data === undefined };
};

export const useUpdateAppointmentStatus = () => {
  const mutate = useMutation(api.appointments.adminUpdateStatus);
  return async ({ id, status, reason }: { id: string; status: string; reason?: string }) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return await mutate({ token, appointmentId: id as Id<"appointments">, status, reason });
  };
};

export const useEditAppointment = () => {
  const mutate = useMutation(api.appointments.adminEdit);
  return async ({ id, patch }: { id: string; patch: any }) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return await mutate({ token, appointmentId: id as Id<"appointments">, patch });
  };
};

export const useDeleteAppointment = () => {
  const mutate = useMutation(api.appointments.adminDelete);
  return async (id: string) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return await mutate({ token, appointmentId: id as Id<"appointments"> });
  };
};

export const useBlockedDatesAdmin = () => {
  const data = useQuery(api.blockedDates.list);
  return { data: data || [], isLoading: data === undefined };
};

export const useAddBlockedDate = () => {
  const mutate = useMutation(api.blockedDates.add);
  return async ({ date, reason, appliesTo }: { date: string; reason: string; appliesTo?: string }) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return await mutate({ token, blockedDate: date, reason, appliesTo: appliesTo || "all" });
  };
};

export const useDeleteBlockedDate = () => {
  const mutate = useMutation(api.blockedDates.remove);
  return async (id: string) => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");
    return await mutate({ token, id: id as Id<"blockedDates"> });
  };
};
