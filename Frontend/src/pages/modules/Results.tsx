import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Download,
  Upload,
  Filter,
  TrendingUp,
  Award,
  BookOpen
} from 'lucide-react';

const sampleResults = [
  { id: '1', name: 'Rahul Sharma', rollNo: '001', maths: 95, physics: 88, chemistry: 82, english: 90, cs: 98, total: 453, percentage: 90.6, grade: 'A+' },
  { id: '2', name: 'Priya Patel', rollNo: '002', maths: 88, physics: 92, chemistry: 85, english: 78, cs: 95, total: 438, percentage: 87.6, grade: 'A' },
  { id: '3', name: 'Amit Kumar', rollNo: '003', maths: 72, physics: 68, chemistry: 70, english: 75, cs: 80, total: 365, percentage: 73.0, grade: 'B' },
  { id: '4', name: 'Sneha Reddy', rollNo: '004', maths: 98, physics: 95, chemistry: 92, english: 88, cs: 100, total: 473, percentage: 94.6, grade: 'A+' },
  { id: '5', name: 'Vikram Singh', rollNo: '005', maths: 85, physics: 78, chemistry: 80, english: 82, cs: 88, total: 413, percentage: 82.6, grade: 'A-' },
];

const studentResults = [
  { exam: 'Mid-term 1', date: '2024-03', maths: 92, physics: 85, chemistry: 78, english: 88, cs: 95, total: 438, grade: 'A' },
  { exam: 'Unit Test 1', date: '2024-02', maths: 88, physics: 82, chemistry: 80, english: 85, cs: 90, total: 425, grade: 'A' },
  { exam: 'Pre-Board', date: '2024-01', maths: 95, physics: 88, chemistry: 82, english: 90, cs: 98, total: 453, grade: 'A+' },
];

export default function Results() {
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = sampleResults.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.rollNo.includes(searchTerm)
  );

  const classAverage = Math.round(sampleResults.reduce((acc, r) => acc + r.percentage, 0) / sampleResults.length);
  const toppers = sampleResults.filter(r => r.grade === 'A+').length;

  if (role === 'student') {
    const latestResult = studentResults[0];
    
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Results</h1>
            <p className="text-muted-foreground mt-1">View your academic performance</p>
          </div>

          {/* Latest Result Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latest Grade</p>
                  <p className="text-2xl font-bold text-foreground">{latestResult.grade}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Marks</p>
                  <p className="text-2xl font-bold text-success">{latestResult.total}/500</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-info/10">
                  <BookOpen className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Percentage</p>
                  <p className="text-2xl font-bold text-info">{(latestResult.total / 5).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject-wise Performance */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Subject-wise Performance (Latest Exam)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Mathematics', score: latestResult.maths, color: 'bg-primary' },
                { name: 'Physics', score: latestResult.physics, color: 'bg-info' },
                { name: 'Chemistry', score: latestResult.chemistry, color: 'bg-success' },
                { name: 'English', score: latestResult.english, color: 'bg-warning' },
                { name: 'Computer Science', score: latestResult.cs, color: 'bg-accent' },
              ].map((subject) => (
                <div key={subject.name} className="text-center p-4 rounded-xl bg-muted/30">
                  <div className="relative w-16 h-16 mx-auto mb-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-muted"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={`${subject.score * 1.76} 176`}
                        className={subject.color.replace('bg-', 'text-')}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                      {subject.score}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{subject.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam History */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Exam History</h2>
            <div className="space-y-3">
              {studentResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground">{result.exam}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(result.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{result.total}/500</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-sm font-medium">
                      {result.grade}
                    </span>
                  </div>
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
            <h1 className="text-3xl font-bold text-foreground">Results Management</h1>
            <p className="text-muted-foreground mt-1">View and manage student exam results</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {(role === 'admin' || role === 'faculty') && (
              <Button variant="hero">
                <Upload className="h-4 w-4 mr-2" />
                Upload Results
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold text-foreground">{sampleResults.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Class Average</p>
            <p className="text-2xl font-bold text-primary">{classAverage}%</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Top Performers</p>
            <p className="text-2xl font-bold text-success">{toppers}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Pass Rate</p>
            <p className="text-2xl font-bold text-info">100%</p>
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

        {/* Results Table */}
        <div className="bg-card rounded-xl shadow-soft overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left text-sm font-semibold text-foreground">Roll No</th>
                <th className="p-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Maths</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Physics</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Chemistry</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">English</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">CS</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Total</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">%</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4 text-sm text-muted-foreground">{result.rollNo}</td>
                  <td className="p-4 font-medium text-foreground">{result.name}</td>
                  <td className="p-4 text-center text-foreground">{result.maths}</td>
                  <td className="p-4 text-center text-foreground">{result.physics}</td>
                  <td className="p-4 text-center text-foreground">{result.chemistry}</td>
                  <td className="p-4 text-center text-foreground">{result.english}</td>
                  <td className="p-4 text-center text-foreground">{result.cs}</td>
                  <td className="p-4 text-center font-medium text-foreground">{result.total}</td>
                  <td className="p-4 text-center text-primary font-medium">{result.percentage}%</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      result.grade === 'A+' ? 'bg-success/10 text-success' :
                      result.grade === 'A' ? 'bg-primary/10 text-primary' :
                      result.grade === 'A-' ? 'bg-info/10 text-info' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {result.grade}
                    </span>
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
