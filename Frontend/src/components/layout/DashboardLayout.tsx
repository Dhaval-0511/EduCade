import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  FileText,
  BookOpen,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Building2,
} from 'lucide-react';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', roles: ['admin', 'faculty', 'student'] },
  { icon: Building2, label: 'Organization', href: '/organization', roles: ['admin'] },
  { icon: Users, label: 'Users', href: '/users', roles: ['admin', 'faculty'] },
  { icon: Calendar, label: 'Timetable', href: '/timetable', roles: ['admin', 'faculty', 'student'] },
  { icon: ClipboardCheck, label: 'Attendance', href: '/attendance', roles: ['admin', 'faculty', 'student'] },
  { icon: FileText, label: 'Fees', href: '/fees', roles: ['admin', 'faculty', 'student'] },
  { icon: BookOpen, label: 'Results', href: '/results', roles: ['admin', 'faculty', 'student'] },
  { icon: Bell, label: 'Notices', href: '/notices', roles: ['admin', 'faculty', 'student'] },
  { icon: Settings, label: 'Settings', href: '/settings', roles: ['admin', 'faculty', 'student'] },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-primary/10 text-primary';
      case 'faculty': return 'bg-info/10 text-info';
      case 'student': return 'bg-success/10 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-effect h-16">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-2">
            <div className="hero-gradient p-1.5 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">EduCade</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-4 border-b border-sidebar-border">
            <div className="hero-gradient p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">EduCade</span>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sidebar-foreground truncate">{user?.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getRoleBadgeColor(user?.role || '')}`}>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={`${item.href}/${user?.role}`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
