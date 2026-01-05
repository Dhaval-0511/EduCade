import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Calendar,
  ClipboardCheck,
  Clock,
  BookOpen,
  Bell,
  FileText,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const todaySchedule = [
  { time: '09:00 AM', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101' },
  { time: '10:30 AM', subject: 'Physics', teacher: 'Mrs. Patel', room: 'Room 203' },
  { time: '12:00 PM', subject: 'English', teacher: 'Ms. Kumar', room: 'Room 105' },
  { time: '02:00 PM', subject: 'Computer Science', teacher: 'Mr. Reddy', room: 'Lab 2' },
];

const recentNotices = [
  { title: 'Mid-term Exam Schedule Released', date: 'Today', type: 'exam' },
  { title: 'Annual Sports Day Registration', date: 'Yesterday', type: 'event' },
  { title: 'Library Book Return Reminder', date: '2 days ago', type: 'reminder' },
];

const stats = [
  { label: 'Attendance', value: '92%', icon: ClipboardCheck, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Pending Fees', value: '₹5,000', icon: FileText, color: 'text-warning', bg: 'bg-warning/10' },
  { label: 'GPA', value: '8.5', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Classes Today', value: '4', icon: Calendar, color: 'text-info', bg: 'bg-info/10' },
];

const subjects = [
  { name: 'Mathematics', grade: 'A', attendance: 95, color: 'bg-primary' },
  { name: 'Physics', grade: 'A-', attendance: 90, color: 'bg-info' },
  { name: 'English', grade: 'B+', attendance: 88, color: 'bg-success' },
  { name: 'Computer Science', grade: 'A', attendance: 98, color: 'bg-warning' },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Hello, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your academic overview for today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/timetable/student">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Full Timetable
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
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fee Alert */}
        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex items-center gap-4">
          <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-foreground">Fee Payment Reminder</p>
            <p className="text-sm text-muted-foreground">You have ₹5,000 pending fees. Due date: 15th Jan 2024</p>
          </div>
          <Link to="/fees/student">
            <Button variant="accent" size="sm">Pay Now</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today's Classes</h2>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </span>
            </div>
            <div className="space-y-3">
              {todaySchedule.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-center min-w-[70px]">
                    <Clock className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm font-medium text-foreground">{cls.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.teacher} • {cls.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notices */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Notices</h2>
              <Link to="/notices/student">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentNotices.map((notice, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className={`mt-0.5 ${
                    notice.type === 'exam' ? 'text-destructive' :
                    notice.type === 'event' ? 'text-primary' : 'text-warning'
                  }`}>
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{notice.title}</p>
                    <p className="text-xs text-muted-foreground">{notice.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Subject Performance</h2>
            <Link to="/results/student">
              <Button variant="ghost" size="sm">View Details</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <div key={subject.name} className="p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                  <p className="font-medium text-foreground">{subject.name}</p>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{subject.grade}</p>
                    <p className="text-xs text-muted-foreground">Grade</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{subject.attendance}%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${subject.color}`}
                    style={{ width: `${subject.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
