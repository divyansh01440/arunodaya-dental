import { format, parseISO } from "date-fns";
import { MoreHorizontal, Check, X, Clock, Trash2, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Appointment } from "@/hooks/useAdminAppointments";

interface AppointmentTableProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  confirmed: "bg-green-500/10 text-green-700 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-700 border-red-500/20",
  completed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  no_show: "bg-gray-200 text-gray-700 border-gray-300",
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const AppointmentTable = ({
  appointments,
  onUpdateStatus,
  onDelete,
  isUpdating,
  isDeleting,
}: AppointmentTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((apt) => (
                  <TableRow key={apt._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{apt.patientName}</p>
                        {apt.notes && (
                          <p className="text-xs text-muted-foreground truncate max-w-[200px] mt-0.5">
                            {apt.notes}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{apt.service}</TableCell>
                    <TableCell className="text-sm">{apt.doctorName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">
                          {format(parseISO(apt.appointmentDate), "MMM d, yyyy")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(apt.appointmentTime)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[apt.status] || ""}>
                        {apt.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <a
                          href={`tel:${apt.patientPhone}`}
                          className="flex items-center gap-1 hover:text-primary"
                        >
                          <Phone className="w-3 h-3" />
                          {apt.patientPhone}
                        </a>
                        {apt.patientEmail && (
                          <a
                            href={`mailto:${apt.patientEmail}`}
                            className="flex items-center gap-1 text-muted-foreground hover:text-primary truncate max-w-[180px]"
                          >
                            <Mail className="w-3 h-3" />
                            {apt.patientEmail}
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={isUpdating}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onUpdateStatus(apt._id, "confirmed")}>
                            <Check className="h-4 w-4 mr-2 text-green-600" />
                            Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onUpdateStatus(apt._id, "completed")}>
                            <Clock className="h-4 w-4 mr-2 text-blue-600" />
                            Mark Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onUpdateStatus(apt._id, "cancelled")}>
                            <X className="h-4 w-4 mr-2 text-red-600" />
                            Cancel
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onUpdateStatus(apt._id, "no_show")}>
                            <X className="h-4 w-4 mr-2 text-gray-600" />
                            Mark No-Show
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteId(apt._id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AppointmentTable;
