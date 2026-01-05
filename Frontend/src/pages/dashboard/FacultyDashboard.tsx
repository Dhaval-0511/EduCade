import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Users, 
  Calendar,
  ClipboardCheck,
  Clock,
  BookOpen,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const todayClasses = [
  { time: '09:00 AM', subject: 'Mathematics', class: 'Class 10-A', status: 'completed' },
  { time: '10:30 AM', subject: 'Physics', class: 'Class 12-B', status: 'ongoing' },
  { time: '12:00 PM', subject: 'Mathematics', class: 'Class 9-C', status: 'upcoming' },
  { time: '02:00 PM', subject: 'Physics Lab', class: 'Class 11-A', status: 'upcoming' },
];

const pendingTasks = [
  { task: 'Mark attendance for Class 10-A', due: 'Today', priority: 'high' },
  { task: 'Upload results for Mid-term Exam', due: 'Tomorrow', priority: 'medium' },
  { task: 'Review fee defaulters list', due: 'This week', priority: 'low' },
];

const stats = [
  { label: 'My Students', value: '156', icon: Users, color: 'bg-primary/10 text-primary' },
  { label: 'Classes Today', value: '4', icon: Calendar, color: 'bg-info/10 text-info' },
  { label: 'Pending Attendance', value: '2', icon: ClipboardCheck, color: 'bg-warning/10 text-warning' },
  { label: 'Subjects', value: '3', icon: BookOpen, color: 'bg-success/10 text-success' },
];

export default function FacultyDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Good Morning, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              You have 4 classes scheduled for today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/attendance/faculty">
              <Button variant="hero">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-5 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today's Schedule</h2>
              <Link to="/timetable/faculty">
                <Button variant="ghost" size="sm">View Full</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {todayClasses.map((cls, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    cls.status === 'ongoing' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="text-center min-w-[70px]">
                    <Clock className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm font-medium text-foreground">{cls.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.class}</p>
                  </div>
                  <div>
                    {cls.status === 'completed' && (
                      <span className="inline-flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" /> Done
                      </span>
                    )}
                    {cls.status === 'ongoing' && (
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full animate-pulse-soft">
                        <Clock className="h-3 w-3" /> Now
                      </span>
                    )}
                    {cls.status === 'upcoming' && (
                      <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Pending Tasks</h2>
              <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                {pendingTasks.length} pending
              </span>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={`mt-0.5 ${
                    task.priority === 'high' ? 'text-destructive' :
                    task.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                  }`}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{task.task}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                  </div>
                  <Button variant="ghost" size="sm">Do it</Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/attendance/faculty" className="block">
              <div className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors text-center">
                <ClipboardCheck className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Mark Attendance</p>
              </div>
            </Link>
            <Link to="/results/faculty" className="block">
              <div className="p-4 rounded-xl bg-success/5 hover:bg-success/10 transition-colors text-center">
                <BookOpen className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Upload Results</p>
              </div>
            </Link>
            <Link to="/notices/faculty" className="block">
              <div className="p-4 rounded-xl bg-warning/5 hover:bg-warning/10 transition-colors text-center">
                <Bell className="h-8 w-8 text-warning mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Post Notice</p>
              </div>
            </Link>
            <Link to="/users/faculty" className="block">
              <div className="p-4 rounded-xl bg-info/5 hover:bg-info/10 transition-colors text-center">
                <Users className="h-8 w-8 text-info mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">My Students</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
