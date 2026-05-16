import { useAdminStats } from "@/hooks/useAdminAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  XCircle,
  Loader2,
  AlertCircle,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const COLORS = ["#1e3a8a", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

const statusBadge: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  no_show: "bg-gray-200 text-gray-800",
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const OverviewSection = () => {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading || !stats) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Today's Appointments",
      value: stats.todayCount,
      subtitle: `${stats.todayConfirmed} confirmed`,
      icon: Calendar,
      color: "bg-blue-500/10 text-blue-700",
    },
    {
      label: "Pending Approval",
      value: stats.pending,
      subtitle: "Awaiting confirmation",
      icon: AlertCircle,
      color: "bg-yellow-500/10 text-yellow-700",
    },
    {
      label: "This Week",
      value: stats.thisWeek,
      subtitle: "Last 7 days",
      icon: TrendingUp,
      color: "bg-green-500/10 text-green-700",
    },
    {
      label: "Total Bookings",
      value: stats.totalAll,
      subtitle: "All-time",
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Completed (30d)",
      value: stats.completedThisMonth,
      subtitle: "This month",
      icon: CheckCircle2,
      color: "bg-cyan-500/10 text-cyan-700",
    },
    {
      label: "Cancelled (30d)",
      value: stats.cancelledThisMonth,
      subtitle: "This month",
      icon: XCircle,
      color: "bg-red-500/10 text-red-700",
    },
  ];

  // Format series data for chart
  const seriesData = stats.series.map((s) => ({
    date: format(parseISO(s._id), "MMM d"),
    count: s.count,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
          Welcome back 👋
        </h2>
        <p className="text-muted-foreground text-sm">
          Here's what's happening at Arunodaya Dental Clinic.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.subtitle}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trend chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Appointments — Last 14 Days</CardTitle>
          </CardHeader>
          <CardContent>
            {seriesData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">
                No appointments yet.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={seriesData}>
                  <defs>
                    <linearGradient id="apttrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#apttrend)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Upcoming
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
            ) : (
              stats.upcoming.map((apt) => (
                <div key={apt._id} className="border-l-2 border-primary pl-3 py-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm truncate">{apt.patientName}</p>
                    <Badge variant="outline" className={`${statusBadge[apt.status]} text-[10px]`}>
                      {apt.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{apt.service}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(parseISO(apt.appointmentDate), "MMM d")} · {formatTime(apt.appointmentTime)} · {apt.doctorName}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-4 h-4" />
              Top Services (last 30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.byService.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={stats.byService} layout="vertical" margin={{ left: 100 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis
                    dataKey="_id"
                    type="category"
                    tick={{ fontSize: 11 }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {stats.byService.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* By doctor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-4 h-4" />
              By Doctor (last 30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.byDoctor.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No data yet.</p>
            ) : (
              <div className="space-y-4 pt-2">
                {stats.byDoctor.map((d, i) => {
                  const total = stats.byDoctor.reduce((acc, x) => acc + x.count, 0);
                  const pct = total > 0 ? (d.count / total) * 100 : 0;
                  return (
                    <div key={d._id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{d._id}</span>
                        <span className="text-muted-foreground">
                          {d.count} ({Math.round(pct)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            background: COLORS[i % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSection;
