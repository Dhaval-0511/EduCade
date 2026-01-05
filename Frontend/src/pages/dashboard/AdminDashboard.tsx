import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  Calendar,
  TrendingUp,
  UserPlus,
  FileText,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Students', value: '1,234', icon: GraduationCap, change: '+12%', color: 'text-primary' },
  { label: 'Total Faculty', value: '56', icon: Users, change: '+3%', color: 'text-info' },
  { label: 'Departments', value: '8', icon: Building2, change: '0', color: 'text-success' },
  { label: 'Active Classes', value: '42', icon: Calendar, change: '+5%', color: 'text-warning' },
];

const recentActivities = [
  { action: 'New student enrolled', name: 'Rahul Sharma', time: '2 hours ago', type: 'student' },
  { action: 'Fee payment received', name: 'Priya Patel', time: '3 hours ago', type: 'fee' },
  { action: 'New notice published', name: 'Exam Schedule', time: '5 hours ago', type: 'notice' },
  { action: 'Attendance marked', name: 'Class 10-A', time: '6 hours ago', type: 'attendance' },
];

const quickActions = [
  { label: 'Add Student', icon: UserPlus, href: '/users/admin', color: 'hero-gradient' },
  { label: 'Add Faculty', icon: Users, href: '/users/admin', color: 'bg-info' },
  { label: 'Create Notice', icon: Bell, href: '/notices/admin', color: 'bg-success' },
  { label: 'View Reports', icon: FileText, href: '/results/admin', color: 'bg-warning' },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening at your institution today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">{stat.change}</span>
                <span className="text-sm text-muted-foreground">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.href}>
                  <button className={`w-full ${action.color} p-4 rounded-xl text-primary-foreground hover:opacity-90 transition-all duration-200`}>
                    <action.icon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === 'student' && <GraduationCap className="h-5 w-5 text-primary" />}
                    {activity.type === 'fee' && <FileText className="h-5 w-5 text-success" />}
                    {activity.type === 'notice' && <Bell className="h-5 w-5 text-warning" />}
                    {activity.type === 'attendance' && <Calendar className="h-5 w-5 text-info" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4">Today's Attendance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-xl">
              <p className="text-3xl font-bold text-success">92%</p>
              <p className="text-sm text-muted-foreground">Overall Present</p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-xl">
              <p className="text-3xl font-bold text-destructive">5%</p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-xl">
              <p className="text-3xl font-bold text-warning">3%</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
            <div className="text-center p-4 bg-info/10 rounded-xl">
              <p className="text-3xl font-bold text-info">1,136</p>
              <p className="text-sm text-muted-foreground">Present Today</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
