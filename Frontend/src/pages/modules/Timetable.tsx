import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus, Clock, User, MapPin } from 'lucide-react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

const sampleTimetable = {
  Monday: [
    { time: '09:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: '101' },
    { time: '11:00', subject: 'Physics', teacher: 'Mrs. Patel', room: '203' },
    { time: '14:00', subject: 'English', teacher: 'Ms. Kumar', room: '105' },
  ],
  Tuesday: [
    { time: '10:00', subject: 'Chemistry', teacher: 'Mr. Singh', room: 'Lab 1' },
    { time: '12:00', subject: 'Computer Science', teacher: 'Mr. Reddy', room: 'Lab 2' },
    { time: '15:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: '101' },
  ],
  Wednesday: [
    { time: '09:00', subject: 'Physics', teacher: 'Mrs. Patel', room: '203' },
    { time: '11:00', subject: 'English', teacher: 'Ms. Kumar', room: '105' },
    { time: '14:00', subject: 'Chemistry', teacher: 'Mr. Singh', room: 'Lab 1' },
  ],
  Thursday: [
    { time: '10:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: '101' },
    { time: '12:00', subject: 'Physics Lab', teacher: 'Mrs. Patel', room: 'Lab 3' },
    { time: '16:00', subject: 'Computer Science', teacher: 'Mr. Reddy', room: 'Lab 2' },
  ],
  Friday: [
    { time: '09:00', subject: 'English', teacher: 'Ms. Kumar', room: '105' },
    { time: '11:00', subject: 'Chemistry', teacher: 'Mr. Singh', room: 'Lab 1' },
    { time: '14:00', subject: 'Mathematics', teacher: 'Mr. Sharma', room: '101' },
  ],
  Saturday: [
    { time: '09:00', subject: 'Computer Science Lab', teacher: 'Mr. Reddy', room: 'Lab 2' },
    { time: '11:00', subject: 'Physics', teacher: 'Mrs. Patel', room: '203' },
  ],
};

const subjectColors: Record<string, string> = {
  'Mathematics': 'bg-primary/20 border-primary text-primary',
  'Physics': 'bg-info/20 border-info text-info',
  'Physics Lab': 'bg-info/20 border-info text-info',
  'Chemistry': 'bg-success/20 border-success text-success',
  'English': 'bg-warning/20 border-warning text-warning',
  'Computer Science': 'bg-accent/20 border-accent text-accent-foreground',
  'Computer Science Lab': 'bg-accent/20 border-accent text-accent-foreground',
};

export default function Timetable() {
  const { role } = useParams();
  const { user } = useAuth();
  const canEdit = role === 'admin' || role === 'faculty';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Timetable</h1>
            <p className="text-muted-foreground mt-1">
              {role === 'student' ? 'Your weekly class schedule' : 'Manage class schedules'}
            </p>
          </div>
          {canEdit && (
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          )}
        </div>

        {/* Timetable Grid */}
        <div className="bg-card rounded-xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left text-sm font-semibold text-foreground w-20">Time</th>
                  {weekDays.map((day) => (
                    <th key={day} className="p-4 text-left text-sm font-semibold text-foreground">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time} className="border-t border-border">
                    <td className="p-4 text-sm text-muted-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </td>
                    {weekDays.map((day) => {
                      const schedule = sampleTimetable[day as keyof typeof sampleTimetable]?.find(
                        (s) => s.time === time
                      );
                      return (
                        <td key={`${day}-${time}`} className="p-2">
                          {schedule ? (
                            <div
                              className={`p-3 rounded-lg border ${
                                subjectColors[schedule.subject] || 'bg-muted border-border text-foreground'
                              }`}
                            >
                              <p className="font-medium text-sm">{schedule.subject}</p>
                              <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                                <User className="h-3 w-3" />
                                {schedule.teacher}
                              </div>
                              <div className="flex items-center gap-1 mt-0.5 text-xs opacity-80">
                                <MapPin className="h-3 w-3" />
                                {schedule.room}
                              </div>
                            </div>
                          ) : (
                            <div className="h-20"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-card rounded-xl p-4 shadow-soft">
          <h3 className="text-sm font-semibold text-foreground mb-3">Subject Colors</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(subjectColors).slice(0, 5).map(([subject, color]) => (
              <div key={subject} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${color.split(' ')[0]}`}></div>
                <span className="text-sm text-muted-foreground">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
