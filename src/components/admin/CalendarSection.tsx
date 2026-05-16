import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, parseISO, addMonths, subMonths, startOfWeek, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useAdminAppointments } from "@/hooks/useAdminAppointments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  no_show: "bg-gray-100 text-gray-800 border-gray-200",
};

const CalendarSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const from = format(startOfMonth(currentMonth), "yyyy-MM-dd");
  const to = format(endOfMonth(currentMonth), "yyyy-MM-dd");

  const { data: appointments = [], isLoading } = useAdminAppointments({ from, to });

  // Build days of the month grid (Sunday first)
  const daysInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    // Pad before to start week on Monday for India context
    const firstDay = startOfWeek(monthStart, { weekStartsOn: 1 });
    const padBefore: Date[] = [];
    let cur = firstDay;
    while (cur < monthStart) {
      padBefore.push(cur);
      cur = addDays(cur, 1);
    }
    return [...padBefore, ...days];
  }, [currentMonth]);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of appointments) {
      if (a.status === "cancelled") continue;
      map[a.appointmentDate] = (map[a.appointmentDate] || 0) + 1;
    }
    return map;
  }, [appointments]);

  const appointmentsForSelected = useMemo(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return appointments
      .filter((a) => a.appointmentDate === dateStr)
      .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime));
  }, [appointments, selectedDate]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Calendar</h2>
        <p className="text-muted-foreground text-sm">Browse and view appointments by day.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="font-heading font-semibold text-lg">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Weekday header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div
                      key={d}
                      className="text-center text-xs font-semibold text-muted-foreground py-2"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">
                  {daysInMonth.map((day, idx) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const count = appointmentsByDate[dateStr] || 0;
                    const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                    const isSel = isSameDay(day, selectedDate);
                    const isSunday = day.getDay() === 0;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          aspect-square p-1 rounded-lg text-sm transition-all relative
                          ${!isCurrentMonth ? "text-muted-foreground/40" : ""}
                          ${isSel ? "bg-primary text-white" : "hover:bg-muted"}
                          ${isToday(day) && !isSel ? "ring-2 ring-primary" : ""}
                          ${isSunday && isCurrentMonth && !isSel ? "bg-muted/30" : ""}
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <span className="font-medium">{format(day, "d")}</span>
                          {count > 0 && isCurrentMonth && (
                            <span
                              className={`text-[10px] font-bold mt-0.5 px-1.5 rounded-full ${
                                isSel ? "bg-white/20" : "bg-primary text-white"
                              }`}
                            >
                              {count}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Selected day details */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-heading font-semibold mb-1">
              {format(selectedDate, "EEEE")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {format(selectedDate, "MMMM d, yyyy")}
            </p>

            {appointmentsForSelected.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No appointments on this date.
              </p>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {appointmentsForSelected.map((apt) => (
                  <div
                    key={apt._id}
                    className="border border-border rounded-xl p-3 hover:bg-muted/30 transition"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{apt.patientName}</p>
                        <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
                      </div>
                      <Badge variant="outline" className={`${statusColors[apt.status]} text-[10px] flex-shrink-0`}>
                        {apt.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>🕐 {formatTime(apt.appointmentTime)}</p>
                      <p>👨‍⚕️ {apt.doctorName}</p>
                      <p>📞 {apt.patientPhone}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarSection;
