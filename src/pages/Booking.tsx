import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Calendar, Clock, Loader2, X, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useAppointmentsByPhone, useCancelByPatient } from "@/hooks/useAppointments";
import type { Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BookingSystem from "@/components/booking/BookingSystem";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  no_show: "bg-gray-200 text-gray-800",
};

const BookingPage = () => {
  const { toast } = useToast();
  const [lookupPhone, setLookupPhone] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const { data: appointments, isLoading } = useAppointmentsByPhone(lookupPhone);
  const cancelMutation = useCancelByPatient();

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    setCancellingId(id);
    try {
      await cancelMutation({
        appointmentId: id as Id<"appointments">,
        phone: lookupPhone,
      });
      toast({ title: "Appointment cancelled", description: "Your appointment has been cancelled." });
    } catch (err) {
      toast({
        title: "Could not cancel",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="container-custom relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Book Your Appointment
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Schedule a visit with Dr. Prathmesh Rai or Dr. Kalpana Sharma Rai in just a few clicks.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <BookingSystem />
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    Check Your Appointments
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Enter the phone number you booked with to see and cancel your appointments.
                  </p>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={lookupPhone}
                      onChange={(e) => setLookupPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {lookupPhone.trim().length >= 10 && (
                    <div className="mt-4 space-y-3">
                      {isLoading ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : appointments && appointments.length > 0 ? (
                        appointments.map((apt) => (
                          <div key={apt._id} className="bg-muted/50 rounded-xl p-4 text-sm">
                            <div className="flex items-center justify-between mb-2 gap-2">
                              <span className="font-semibold text-foreground truncate">{apt.service}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${statusColors[apt.status]}`}
                              >
                                {apt.status}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">{apt.doctorName}</div>
                            <div className="flex items-center gap-4 text-muted-foreground text-xs">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(parseISO(apt.appointmentDate), "MMM d, yyyy")}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {apt.appointmentTime}
                              </div>
                            </div>
                            {(apt.status === "pending" || apt.status === "confirmed") && (
                              <button
                                onClick={() => handleCancel(apt._id)}
                                disabled={cancellingId === apt._id}
                                className="mt-3 text-xs text-destructive hover:underline flex items-center gap-1 disabled:opacity-50"
                              >
                                <X className="w-3 h-3" />
                                {cancellingId === apt._id ? "Cancelling..." : "Cancel this appointment"}
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm text-center py-4">
                          No appointments found for this number.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 rounded-2xl p-6">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Prefer to call?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our team will be happy to help you over the phone.
                  </p>
                  <a
                    href="tel:+917974519062"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 79745 19062
                  </a>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Clinic Hours</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Monday – Saturday</div>
                      <div className="text-foreground font-medium">10:30 AM – 3:30 PM</div>
                      <div className="text-foreground font-medium">5:30 PM – 8:30 PM</div>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-destructive">Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      Dr. Kalpana Sharma Rai consults only in the morning session (10:30 AM – 3:30 PM).
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BookingPage;
