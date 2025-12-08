import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Compass,
  LayoutDashboard,
  BookOpen,
  MapPin,
  LogOut,
  Menu,
  Map
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/bookings', label: 'Bookings', icon: BookOpen },
  { to: '/admin/tours', label: 'Tours', icon: Map },
  { to: '/admin/destinations', label: 'Destinations', icon: MapPin },
];


function NavItem({ to, label, icon: Icon, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export default function AdminLayout() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // Redirect if logged in but not admin
  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have admin access.',
        // variant: 'destructive',
      });
      navigate('/', { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut(); 
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const Sidebar = ({ onItemClick }) => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-lg">
          <Compass className="h-6 w-6 text-primary" />
          Nayah Adventure
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} onClick={onItemClick} />
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col bg-background border-r">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-background border-b p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold">
          <Compass className="h-6 w-6 text-primary" />
          Admin
        </Link>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar onItemClick={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
