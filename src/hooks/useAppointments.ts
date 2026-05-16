import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

// Types matching Convex
export type DoctorId = Id<"doctors">;
export type AppointmentId = Id<"appointments">;

export interface Doctor {
  _id: DoctorId;
  slug: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  bio: string;
  photo: string;
  workingDays: string[];
  sessions: { start: string; end: string }[];
  isActive: boolean;
}

export interface Appointment {
  _id: AppointmentId;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  service: string;
  doctorId: DoctorId;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notes?: string;
  cancellationReason?: string;
  cancelledAt?: number;
  confirmedAt?: number;
  completedAt?: number;
  _creationTime: number;
}

// Doctors list
export const useDoctors = () => {
  const data = useQuery(api.doctors.list);
  return { data: data || [], isLoading: data === undefined };
};

// Availability for doctor + date
export const useAvailability = (doctorId: DoctorId | undefined, date: string | undefined) => {
  const data = useQuery(
    api.appointments.getAvailability,
    doctorId && date ? { doctorId, date } : "skip"
  );
  return { data, isLoading: doctorId && date && data === undefined };
};

// Blocked dates
export const useBlockedDates = () => {
  const data = useQuery(api.blockedDates.list);
  return { data: data || [], isLoading: data === undefined };
};

// Create appointment
export const useCreateAppointment = () => {
  const mutate = useMutation(api.appointments.create);
  return mutate;
};

// Lookup by phone
export const useAppointmentsByPhone = (phone: string) => {
  const data = useQuery(
    api.appointments.byPhone,
    phone.trim().length >= 10 ? { phone } : "skip"
  );
  return { data: data || [], isLoading: phone.trim().length >= 10 && data === undefined };
};

// Patient cancel
export const useCancelByPatient = () => {
  const mutate = useMutation(api.appointments.cancelByPatient);
  return mutate;
};
