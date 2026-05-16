import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format, isSunday, startOfToday, isBefore } from "date-fns";
import {
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  FileText,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  useDoctors,
  useAvailability,
  useBlockedDates,
  useCreateAppointment,
  type DoctorId,
} from "@/hooks/useAppointments";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { sendAppointmentEmails } from "@/lib/email";

const services = [
  { id: "consultation", name: "General Consultation", duration: "20 min", icon: Stethoscope },
  { id: "root-canal", name: "Root Canal Treatment (RCT)", duration: "45–60 min", icon: Sparkles },
  { id: "smile-design", name: "Smile Design / Cosmetic", duration: "45–60 min", icon: Sparkles },
  { id: "teeth-whitening", name: "Teeth Whitening / Bleaching", duration: "45 min", icon: Sparkles },
  { id: "crown-bridge", name: "Crown & Bridge", duration: "45 min", icon: Sparkles },
  { id: "filling", name: "Dental Restoration / Filling", duration: "30 min", icon: Sparkles },
  { id: "implant", name: "Dental Implants", duration: "60 min", icon: Sparkles },
  { id: "braces", name: "Braces / Orthodontics", duration: "30 min", icon: Sparkles },
  { id: "dentures", name: "Dentures", duration: "45 min", icon: Sparkles },
  { id: "xray", name: "Digital Dental X-Ray", duration: "10 min", icon: Sparkles },
  { id: "kids", name: "Pediatric Dentistry", duration: "30 min", icon: Sparkles },
];

type Step = 1 | 2 | 3 | 4 | 5;

const formatDisplayTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

const BookingSystem = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<DoctorId | "">("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const { data: blockedDates } = useBlockedDates();
  const { data: availability, isLoading: slotsLoading } = useAvailability(
    selectedDoctorId || undefined,
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined
  );
  const createAppointment = useCreateAppointment();

  const selectedDoctor = useMemo(
    () => doctors.find((d) => d._id === selectedDoctorId),
    [doctors, selectedDoctorId]
  );

  const isDateBlocked = (date: Date) => {
    if (isSunday(date)) return true;
    if (isBefore(date, startOfToday())) return true;
    if (blockedDates?.some((bd) => bd.blockedDate === format(date, "yyyy-MM-dd"))) return true;
    return false;
  };

  const handleSubmit = async () => {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedService ||
      !selectedDoctorId ||
      !formData.name ||
      !formData.phone
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const result = await createAppointment({
        patientName: formData.name,
        patientPhone: formData.phone,
        patientEmail: formData.email || undefined,
        service: selectedService,
        doctorId: selectedDoctorId as DoctorId,
        appointmentDate: format(selectedDate, "yyyy-MM-dd"),
        appointmentTime: selectedTime,
        notes: formData.notes || undefined,
      });

      // Fire-and-forget email confirmations (booking already saved)
      if (formData.email && result) {
        sendAppointmentEmails({
          patientName: formData.name,
          patientPhone: formData.phone,
          patientEmail: formData.email,
          doctorName: result.doctorName,
          service: selectedService,
          appointmentDate: format(selectedDate, "EEEE, MMMM d, yyyy"),
          appointmentTime: formatDisplayTime(selectedTime),
          notes: formData.notes,
        }).catch(() => {
          /* already logged inside sendAppointmentEmails */
        });
      }

      toast({
        title: "Appointment Booked! 🎉",
        description: `Confirmed for ${format(selectedDate, "EEEE, MMMM d")} at ${formatDisplayTime(
          selectedTime
        )} with ${result?.doctorName}. A confirmation has been sent to your email.`,
      });

      // Redirect home after success
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast({
        title: "Booking failed",
        description: (error as Error).message || "Something went wrong. Please call us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedDoctorId;
      case 3:
        return !!selectedDate;
      case 4:
        return !!selectedTime;
      case 5:
        return formData.name.trim().length > 1 && formData.phone.trim().length >= 10;
      default:
        return false;
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-lg overflow-hidden">
      {/* Steps */}
      <div className="bg-primary/5 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 5 && (
                <div
                  className={cn(
                    "w-6 sm:w-12 h-1 mx-1 rounded transition-colors",
                    step > s ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-lg mx-auto mt-2 text-[10px] sm:text-xs text-muted-foreground">
          <span>Service</span>
          <span>Doctor</span>
          <span>Date</span>
          <span>Time</span>
          <span>Details</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                What service do you need?
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Pick the treatment you're looking for. You can mention more details later.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.name)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      selectedService === s.name
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="font-semibold text-foreground">{s.name}</div>
                    <div className="text-sm text-muted-foreground">{s.duration}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Choose your doctor
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Both our doctors are highly experienced. Pick whoever's timings suit you.
              </p>
              {doctorsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {doctors.map((d) => (
                    <button
                      key={d._id}
                      onClick={() => setSelectedDoctorId(d._id)}
                      className={cn(
                        "p-4 rounded-2xl border-2 text-left transition-all flex gap-4",
                        selectedDoctorId === d._id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {d.photo ? (
                        <img
                          src={d.photo}
                          alt={d.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate">{d.name}</div>
                        <div className="text-xs text-muted-foreground mb-1 line-clamp-2">
                          {d.specialization}
                        </div>
                        <div className="text-xs text-primary font-medium">
                          {d.sessions
                            .map((sess) => `${formatDisplayTime(sess.start)}–${formatDisplayTime(sess.end)}`)
                            .join(" & ")}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Choose a date
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sundays are closed. We're open Monday–Saturday.
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full sm:w-auto justify-start text-left font-normal h-12 px-4 rounded-xl",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setSelectedTime("");
                    }}
                    disabled={isDateBlocked}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {selectedDate && (
                <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm text-muted-foreground">Selected date</div>
                  <div className="font-semibold text-foreground">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                Pick a time slot
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {selectedDoctor?.name}
                {selectedDate && <> · {format(selectedDate, "EEEE, MMMM d")}</>}
              </p>
              {slotsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : availability?.isBlocked ? (
                <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-sm">
                  {availability.reason || "This date is unavailable. Please pick another date."}
                </div>
              ) : !availability || availability.allSlots.length === 0 ? (
                <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
                  No slots available for this date.
                </div>
              ) : (
                <>
                  {selectedDoctor?.sessions.map((session, idx) => {
                    const sessionSlots = availability.allSlots.filter((slot) => {
                      const [sh, sm] = session.start.split(":").map(Number);
                      const [eh, em] = session.end.split(":").map(Number);
                      const [h, m] = slot.split(":").map(Number);
                      const slotMin = h * 60 + m;
                      return slotMin >= sh * 60 + sm && slotMin < eh * 60 + em;
                    });
                    if (sessionSlots.length === 0) return null;
                    const sessionLabel =
                      parseInt(session.start.split(":")[0]) < 12 ? "Morning" : "Evening";
                    return (
                      <div key={idx} className="mb-6">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          {sessionLabel} session · {formatDisplayTime(session.start)} –{" "}
                          {formatDisplayTime(session.end)}
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                          {sessionSlots.map((time) => {
                            const isBooked = availability.bookedSlots.includes(time);
                            return (
                              <button
                                key={time}
                                onClick={() => !isBooked && setSelectedTime(time)}
                                disabled={isBooked}
                                className={cn(
                                  "py-3 px-2 rounded-xl text-sm font-medium transition-all",
                                  isBooked
                                    ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                    : selectedTime === time
                                    ? "bg-primary text-white"
                                    : "bg-muted/50 text-foreground hover:bg-primary/10"
                                )}
                              >
                                {formatDisplayTime(time)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-6">Your details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="+91 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-xs text-muted-foreground">(recommended for confirmation)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Notes (Optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Any specific concerns or requests..."
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-primary/5 rounded-xl p-4 mt-6">
                  <h4 className="font-heading font-semibold text-foreground mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium text-foreground text-right">{selectedService}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Doctor:</span>
                      <span className="font-medium text-foreground text-right">
                        {selectedDoctor?.name}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium text-foreground text-right">
                        {selectedDate && format(selectedDate, "EEE, MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium text-foreground text-right">
                        {selectedTime && formatDisplayTime(selectedTime)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 pt-2 border-t border-primary/10">
                      <span className="text-muted-foreground">Consultation Fee:</span>
                      <span className="font-medium text-foreground">
                        ₹{selectedDoctor?.consultationFee || 500}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <button
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
            disabled={step === 1 || submitting}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors",
              step === 1 || submitting
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-muted"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => (s < 5 ? ((s + 1) as Step) : s))}
              disabled={!canProceed()}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                canProceed()
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all",
                canProceed() && !submitting ? "btn-cta" : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Confirm Booking
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
