import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Plus,
  FileText,
  Calendar,
  Download,
  Bell,
  AlertTriangle,
  Info,
  Megaphone
} from 'lucide-react';

const sampleNotices = [
  {
    id: '1',
    title: 'Mid-term Examination Schedule',
    description: 'The mid-term examinations for all classes will commence from 15th January 2024. Please find the attached schedule.',
    date: '2024-01-08',
    department: 'All',
    type: 'exam',
    attachment: 'midterm_schedule.pdf',
  },
  {
    id: '2',
    title: 'Annual Sports Day Registration',
    description: 'Registration for Annual Sports Day is now open. Students interested in participating should register by 10th January.',
    date: '2024-01-07',
    department: 'All',
    type: 'event',
    attachment: null,
  },
  {
    id: '3',
    title: 'Library Book Return Reminder',
    description: 'All students are requested to return borrowed books before the semester ends. Late returns will incur a fine.',
    date: '2024-01-05',
    department: 'All',
    type: 'reminder',
    attachment: null,
  },
  {
    id: '4',
    title: 'Holiday Notice - Republic Day',
    description: 'The institution will remain closed on 26th January 2024 on account of Republic Day.',
    date: '2024-01-04',
    department: 'All',
    type: 'holiday',
    attachment: null,
  },
  {
    id: '5',
    title: 'Parent-Teacher Meeting',
    description: 'PTM for all classes will be held on 20th January 2024. All parents are requested to attend.',
    date: '2024-01-03',
    department: 'All',
    type: 'meeting',
    attachment: 'ptm_agenda.pdf',
  },
];

const typeConfig = {
  exam: { icon: FileText, color: 'text-destructive', bg: 'bg-destructive/10' },
  event: { icon: Megaphone, color: 'text-primary', bg: 'bg-primary/10' },
  reminder: { icon: Bell, color: 'text-warning', bg: 'bg-warning/10' },
  holiday: { icon: Calendar, color: 'text-success', bg: 'bg-success/10' },
  meeting: { icon: Info, color: 'text-info', bg: 'bg-info/10' },
};

export default function Notices() {
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const canCreate = role === 'admin' || role === 'faculty';

  const filteredNotices = sampleNotices.filter(n =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notices</h1>
            <p className="text-muted-foreground mt-1">
              {canCreate ? 'Manage and publish notices' : 'View important announcements'}
            </p>
          </div>
          {canCreate && (
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Create Notice
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Notice Categories */}
        <div className="flex gap-2 flex-wrap">
          {Object.entries(typeConfig).map(([type, config]) => (
            <button
              key={type}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.bg} ${config.color} hover:opacity-80 transition-opacity capitalize`}
            >
              <config.icon className="h-3.5 w-3.5" />
              {type}
            </button>
          ))}
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const config = typeConfig[notice.type as keyof typeof typeConfig];
            return (
              <div
                key={notice.id}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${config.bg}`}>
                    <config.icon className={`h-6 w-6 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{notice.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(notice.date).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color} capitalize`}>
                            {notice.type}
                          </span>
                        </div>
                      </div>
                      {notice.attachment && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      )}
                    </div>
                    <p className="mt-3 text-muted-foreground">{notice.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl shadow-soft">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">No notices found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
