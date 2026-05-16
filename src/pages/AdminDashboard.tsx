import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  CalendarX,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import OverviewSection from "@/components/admin/OverviewSection";
import AppointmentsSection from "@/components/admin/AppointmentsSection";
import CalendarSection from "@/components/admin/CalendarSection";
import BlockedDatesSection from "@/components/admin/BlockedDatesSection";

type View = "overview" | "appointments" | "calendar" | "blocked";

const navItems = [
  { id: "overview" as View, label: "Overview", icon: LayoutDashboard },
  { id: "appointments" as View, label: "Appointments", icon: Calendar },
  { id: "calendar" as View, label: "Calendar", icon: CalendarDays },
  { id: "blocked" as View, label: "Blocked Dates", icon: CalendarX },
];

const AdminDashboard = () => {
  const { admin, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!admin || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [admin, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin || !isAdmin) return null;

  const handleSignOut = () => {
    signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border
          transform transition-transform lg:transform-none flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary overflow-hidden flex-shrink-0">
              <img src="/logo-icon.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-heading font-bold text-sm truncate">Arunodaya Dental</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${
                  view === item.id
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-muted"
                }
              `}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {view === item.id && <ChevronRight className="w-3 h-3" />}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            ↗ View public site
          </a>
          <div className="px-3 py-2 text-xs">
            <p className="font-medium truncate">{admin.email}</p>
            <p className="text-muted-foreground">{admin.role}</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 -ml-1 text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading font-semibold text-sm">
            {navItems.find((n) => n.id === view)?.label}
          </span>
          <div className="w-5" />
        </header>

        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {view === "overview" && <OverviewSection />}
          {view === "appointments" && <AppointmentsSection />}
          {view === "calendar" && <CalendarSection />}
          {view === "blocked" && <BlockedDatesSection />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
