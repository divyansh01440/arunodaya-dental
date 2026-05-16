import emailjs from "@emailjs/browser";

// EmailJS configuration — set these in your .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const PATIENT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_PATIENT_TEMPLATE as string | undefined;
const CLINIC_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CLINIC_TEMPLATE as string | undefined;

export const CLINIC_EMAIL = "arunodayadentalclinic@gmail.com";

export interface AppointmentEmailData {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorName: string;
  service: string;
  appointmentDate: string; // formatted "Mon, May 25, 2026"
  appointmentTime: string; // formatted "2:30 PM"
  notes?: string;
}

function isConfigured(): boolean {
  const ok = !!(SERVICE_ID && PUBLIC_KEY && PATIENT_TEMPLATE_ID && CLINIC_TEMPLATE_ID);
  if (!ok) {
    console.warn(
      "EmailJS is not fully configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_PATIENT_TEMPLATE, VITE_EMAILJS_CLINIC_TEMPLATE in .env to enable booking confirmation emails."
    );
  }
  return ok;
}

/**
 * Send confirmation emails to both patient and clinic.
 * Fails gracefully — never throws. Booking succeeds even if email fails.
 */
export async function sendAppointmentEmails(data: AppointmentEmailData): Promise<{
  patientSent: boolean;
  clinicSent: boolean;
}> {
  if (!isConfigured()) {
    return { patientSent: false, clinicSent: false };
  }

  const params = {
    patient_name: data.patientName,
    patient_phone: data.patientPhone,
    patient_email: data.patientEmail,
    doctor_name: data.doctorName,
    service: data.service,
    appointment_date: data.appointmentDate,
    appointment_time: data.appointmentTime,
    notes: data.notes || "—",
    clinic_email: CLINIC_EMAIL,
    clinic_name: "Arunodaya Dental Clinic",
    clinic_phone: "+91 79745 19062",
    clinic_address:
      "#1140, Opposite Commercial Auto, Besides Shastri Bridge, Napier Town, Jabalpur — 482001, MP",
  };

  let patientSent = false;
  let clinicSent = false;

  // Patient confirmation
  if (data.patientEmail) {
    try {
      await emailjs.send(SERVICE_ID!, PATIENT_TEMPLATE_ID!, params, { publicKey: PUBLIC_KEY! });
      patientSent = true;
    } catch (err) {
      console.error("Failed to send patient confirmation email:", err);
    }
  }

  // Clinic notification
  try {
    await emailjs.send(SERVICE_ID!, CLINIC_TEMPLATE_ID!, params, { publicKey: PUBLIC_KEY! });
    clinicSent = true;
  } catch (err) {
    console.error("Failed to send clinic notification email:", err);
  }

  return { patientSent, clinicSent };
}
