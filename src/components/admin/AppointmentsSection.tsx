import { useState } from "react";
import { Loader2, Download } from "lucide-react";
import {
  useAdminAppointments,
  useUpdateAppointmentStatus,
  useDeleteAppointment,
} from "@/hooks/useAdminAppointments";
import { useToast } from "@/hooks/use-toast";
import AppointmentTable from "./AppointmentTable";
import AppointmentFilters from "./AppointmentFilters";
import { Button } from "@/components/ui/button";

const AppointmentsSection = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    status: "all",
    date: "",
    doctor: "",
    search: "",
  });

  const { data: appointments, isLoading } = useAdminAppointments(filters);
  const updateStatus = useUpdateAppointmentStatus();
  const deleteAppt = useDeleteAppointment();

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status });
      toast({ title: "Status updated", description: `Appointment marked as ${status}.` });
    } catch (err) {
      toast({
        title: "Update failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAppt(id);
      toast({ title: "Deleted", description: "Appointment removed permanently." });
    } catch (err) {
      toast({
        title: "Delete failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const exportCSV = () => {
    if (!appointments || appointments.length === 0) return;
    const headers = [
      "Date",
      "Time",
      "Patient",
      "Phone",
      "Email",
      "Service",
      "Doctor",
      "Status",
      "Notes",
    ];
    const rows = appointments.map((a) => [
      a.appointmentDate,
      a.appointmentTime,
      a.patientName,
      a.patientPhone,
      a.patientEmail || "",
      a.service,
      a.doctorName,
      a.status,
      (a.notes || "").replace(/[\n,]/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Appointments</h2>
          <p className="text-muted-foreground text-sm">
            {appointments?.length ?? 0} appointments
          </p>
        </div>
        <Button onClick={exportCSV} variant="outline" disabled={!appointments?.length}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <AppointmentFilters
        status={filters.status}
        date={filters.date}
        doctor={filters.doctor}
        search={filters.search}
        onStatusChange={(v) => setFilters((p) => ({ ...p, status: v }))}
        onDateChange={(v) => setFilters((p) => ({ ...p, date: v }))}
        onDoctorChange={(v) => setFilters((p) => ({ ...p, doctor: v }))}
        onSearchChange={(v) => setFilters((p) => ({ ...p, search: v }))}
        onClear={() => setFilters({ status: "all", date: "", doctor: "", search: "" })}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <AppointmentTable
          appointments={appointments || []}
          onUpdateStatus={handleStatusUpdate}
          onDelete={handleDelete}
          isUpdating={false}
          isDeleting={false}
        />
      )}
    </div>
  );
};

export default AppointmentsSection;
