import { Search, Calendar as CalendarIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDoctors } from "@/hooks/useAppointments";

interface FiltersProps {
  status: string;
  date: string;
  doctor: string;
  search: string;
  onStatusChange: (s: string) => void;
  onDateChange: (s: string) => void;
  onDoctorChange: (s: string) => void;
  onSearchChange: (s: string) => void;
  onClear: () => void;
}

const AppointmentFilters = ({
  status,
  date,
  doctor,
  search,
  onStatusChange,
  onDateChange,
  onDoctorChange,
  onSearchChange,
  onClear,
}: FiltersProps) => {
  const { data: doctors = [] } = useDoctors();
  const hasFilters = status !== "all" || date || doctor || search;

  return (
    <div className="bg-card rounded-lg border p-4 space-y-3">
      <div className="grid md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Name, phone, service…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="no_show">No-Show</SelectItem>
          </SelectContent>
        </Select>

        <Select value={doctor || "all"} onValueChange={(v) => onDoctorChange(v === "all" ? "" : v)}>
          <SelectTrigger>
            <SelectValue placeholder="All doctors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All doctors</SelectItem>
            {doctors.map((d) => (
              <SelectItem key={d._id} value={d._id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="w-3 h-3 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default AppointmentFilters;
