import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Plus,
  Filter,
  UserPlus,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  MoreVertical
} from 'lucide-react';

const sampleStudents = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '9876543210', class: 'Class 10-A', rollNo: '001', status: 'active' },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '9876543211', class: 'Class 10-A', rollNo: '002', status: 'active' },
  { id: '3', name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '9876543212', class: 'Class 10-B', rollNo: '003', status: 'active' },
  { id: '4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '9876543213', class: 'Class 10-A', rollNo: '004', status: 'active' },
  { id: '5', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '9876543214', class: 'Class 10-B', rollNo: '005', status: 'inactive' },
];

const sampleFaculty = [
  { id: '1', name: 'Mr. Sharma', email: 'sharma@school.edu', phone: '9876543220', department: 'Mathematics', subjects: ['Mathematics'], status: 'active' },
  { id: '2', name: 'Mrs. Patel', email: 'patel@school.edu', phone: '9876543221', department: 'Science', subjects: ['Physics'], status: 'active' },
  { id: '3', name: 'Mr. Singh', email: 'singh@school.edu', phone: '9876543222', department: 'Science', subjects: ['Chemistry'], status: 'active' },
  { id: '4', name: 'Ms. Kumar', email: 'kumar@school.edu', phone: '9876543223', department: 'Languages', subjects: ['English'], status: 'active' },
  { id: '5', name: 'Mr. Reddy', email: 'reddy@school.edu', phone: '9876543224', department: 'Computer Science', subjects: ['Computer Science'], status: 'active' },
];

export default function Users() {
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'faculty'>('students');
  const isAdmin = role === 'admin';

  const filteredStudents = sampleStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.rollNo.includes(searchTerm)
  );

  const filteredFaculty = sampleFaculty.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {role === 'faculty' ? 'My Students' : 'User Management'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {role === 'faculty' ? 'View and manage your students' : 'Manage students and faculty members'}
            </p>
          </div>
          <Button variant="hero">
            <UserPlus className="h-4 w-4 mr-2" />
            Add {activeTab === 'students' ? 'Student' : 'Faculty'}
          </Button>
        </div>

        {/* Tabs (Admin only) */}
        {isAdmin && (
          <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'students'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Students
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'faculty'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              Faculty
            </button>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or roll number..."
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

        {/* Students Grid */}
        {(activeTab === 'students' || role === 'faculty') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-card rounded-xl p-5 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full hero-gradient flex items-center justify-center text-primary-foreground font-semibold text-lg">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{student.phone}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{student.class}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    student.status === 'active'
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Faculty Grid (Admin only) */}
        {activeTab === 'faculty' && isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-card rounded-xl p-5 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-info/20 flex items-center justify-center text-info font-semibold text-lg">
                      {faculty.name.split(' ').pop()?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{faculty.name}</h3>
                      <p className="text-sm text-muted-foreground">{faculty.department}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{faculty.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{faculty.phone}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {faculty.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
