import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Check, 
  X, 
  Search,
  Download,
  Filter
} from 'lucide-react';

const sampleStudents = [
  { id: '1', name: 'Rahul Sharma', rollNo: '001', status: 'present' },
  { id: '2', name: 'Priya Patel', rollNo: '002', status: 'present' },
  { id: '3', name: 'Amit Kumar', rollNo: '003', status: 'absent' },
  { id: '4', name: 'Sneha Reddy', rollNo: '004', status: 'present' },
  { id: '5', name: 'Vikram Singh', rollNo: '005', status: 'present' },
  { id: '6', name: 'Anita Desai', rollNo: '006', status: 'absent' },
  { id: '7', name: 'Karthik Nair', rollNo: '007', status: 'present' },
  { id: '8', name: 'Meera Iyer', rollNo: '008', status: 'present' },
];

const studentAttendanceHistory = [
  { date: '2024-01-08', present: true },
  { date: '2024-01-07', present: true },
  { date: '2024-01-06', present: false },
  { date: '2024-01-05', present: true },
  { date: '2024-01-04', present: true },
  { date: '2024-01-03', present: true },
  { date: '2024-01-02', present: false },
  { date: '2024-01-01', present: true },
];

export default function Attendance() {
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState(sampleStudents);
  const isFacultyOrAdmin = role === 'admin' || role === 'faculty';

  const toggleAttendance = (studentId: string) => {
    if (!isFacultyOrAdmin) return;
    setStudents(students.map(s => 
      s.id === studentId 
        ? { ...s, status: s.status === 'present' ? 'absent' : 'present' }
        : s
    ));
  };

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.includes(searchTerm)
  );

  if (role === 'student') {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Attendance</h1>
            <p className="text-muted-foreground mt-1">View your attendance record</p>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-6 shadow-soft text-center">
              <p className="text-4xl font-bold text-success">92%</p>
              <p className="text-muted-foreground mt-1">Overall Attendance</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft text-center">
              <p className="text-4xl font-bold text-primary">138</p>
              <p className="text-muted-foreground mt-1">Days Present</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft text-center">
              <p className="text-4xl font-bold text-destructive">12</p>
              <p className="text-muted-foreground mt-1">Days Absent</p>
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Attendance</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {studentAttendanceHistory.map((day, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center ${
                    day.present 
                      ? 'bg-success/10 border border-success/30' 
                      : 'bg-destructive/10 border border-destructive/30'
                  }`}
                >
                  <p className="text-xs text-muted-foreground">
                    {new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </p>
                  {day.present ? (
                    <Check className="h-5 w-5 text-success mx-auto mt-1" />
                  ) : (
                    <X className="h-5 w-5 text-destructive mx-auto mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground mt-1">Mark and manage student attendance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="hero">
              <Calendar className="h-4 w-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold text-foreground">{students.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Present</p>
            <p className="text-2xl font-bold text-success">{presentCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Absent</p>
            <p className="text-2xl font-bold text-destructive">{absentCount}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Percentage</p>
            <p className="text-2xl font-bold text-primary">
              {Math.round((presentCount / students.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Student List */}
        <div className="bg-card rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left text-sm font-semibold text-foreground">Roll No</th>
                <th className="p-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Status</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4 text-sm text-muted-foreground">{student.rollNo}</td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{student.name}</p>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === 'present'
                          ? 'bg-success/10 text-success'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {student.status === 'present' ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      variant={student.status === 'present' ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => toggleAttendance(student.id)}
                    >
                      {student.status === 'present' ? 'Mark Absent' : 'Mark Present'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
