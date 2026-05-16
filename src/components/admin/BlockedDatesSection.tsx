import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Plus, Trash2, Loader2, Calendar as CalendarIcon } from "lucide-react";
import {
  useBlockedDatesAdmin,
  useAddBlockedDate,
  useDeleteBlockedDate,
} from "@/hooks/useAdminAppointments";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const BlockedDatesSection = () => {
  const { toast } = useToast();
  const { data: blockedDates = [], isLoading } = useBlockedDatesAdmin();
  const addBlocked = useAddBlockedDate();
  const deleteBlocked = useDeleteBlockedDate();

  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleAdd = async () => {
    if (!date) {
      toast({ title: "Pick a date", variant: "destructive" });
      return;
    }
    setAdding(true);
    try {
      await addBlocked({ date, reason });
      toast({ title: "Date blocked", description: `${date} is now unavailable for booking.` });
      setDate("");
      setReason("");
    } catch (err) {
      toast({
        title: "Could not block",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Unblock this date?")) return;
    setDeletingId(id);
    try {
      await deleteBlocked(id);
      toast({ title: "Unblocked", description: "Date is now available again." });
    } catch (err) {
      toast({ title: "Failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Blocked Dates</h2>
        <p className="text-muted-foreground text-sm">
          Block specific dates so patients can't book on holidays or off-days. Sundays are blocked automatically.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Block a Date
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="block-date">Date</Label>
              <Input
                id="block-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="block-reason">Reason (optional)</Label>
              <Input
                id="block-reason"
                type="text"
                placeholder="e.g. Diwali holiday"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} disabled={adding || !date} className="w-full">
              {adding ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
              Block Date
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Currently Blocked</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : blockedDates.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No blocked dates. Sundays are blocked automatically.
              </p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {blockedDates.map((bd) => (
                  <div
                    key={bd._id}
                    className="flex items-center justify-between p-3 border border-border rounded-xl hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {format(parseISO(bd.blockedDate), "EEEE, MMMM d, yyyy")}
                        </p>
                        {bd.reason && (
                          <p className="text-xs text-muted-foreground">{bd.reason}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(bd._id)}
                      disabled={deletingId === bd._id}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
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

export default BlockedDatesSection;
