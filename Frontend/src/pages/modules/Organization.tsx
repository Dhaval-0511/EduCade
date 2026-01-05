import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  GraduationCap, 
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Users,
  ChevronRight
} from 'lucide-react';

const schoolStructure = [
  {
    id: '1',
    name: 'Primary Section',
    type: 'section',
    classes: [
      { id: '1a', name: 'Class 1', divisions: ['A', 'B'] },
      { id: '1b', name: 'Class 2', divisions: ['A', 'B', 'C'] },
      { id: '1c', name: 'Class 3', divisions: ['A', 'B'] },
    ],
  },
  {
    id: '2',
    name: 'Middle Section',
    type: 'section',
    classes: [
      { id: '2a', name: 'Class 6', divisions: ['A', 'B', 'C'] },
      { id: '2b', name: 'Class 7', divisions: ['A', 'B'] },
      { id: '2c', name: 'Class 8', divisions: ['A', 'B', 'C'] },
    ],
  },
  {
    id: '3',
    name: 'High School',
    type: 'section',
    classes: [
      { id: '3a', name: 'Class 9', divisions: ['A', 'B', 'C', 'D'] },
      { id: '3b', name: 'Class 10', divisions: ['A', 'B', 'C'] },
    ],
  },
];

const collegeStructure = [
  {
    id: '1',
    name: 'Computer Science',
    type: 'department',
    years: [
      { id: '1a', name: 'First Year', divisions: ['FY-A', 'FY-B'] },
      { id: '1b', name: 'Second Year', divisions: ['SY-A', 'SY-B'] },
      { id: '1c', name: 'Third Year', divisions: ['TY-A', 'TY-B'] },
    ],
  },
  {
    id: '2',
    name: 'Electronics',
    type: 'department',
    years: [
      { id: '2a', name: 'First Year', divisions: ['FY-A'] },
      { id: '2b', name: 'Second Year', divisions: ['SY-A'] },
      { id: '2c', name: 'Third Year', divisions: ['TY-A'] },
    ],
  },
];

export default function Organization() {
  const [orgType, setOrgType] = useState<'school' | 'college'>('school');
  const [orgName, setOrgName] = useState('Rural Public School');

  const structure = orgType === 'school' ? schoolStructure : collegeStructure;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organization Setup</h1>
            <p className="text-muted-foreground mt-1">Configure your institution structure</p>
          </div>
        </div>

        {/* Organization Type Selection */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4">Institution Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Institution Name</Label>
              <Input
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Enter institution name"
              />
            </div>
            <div className="space-y-2">
              <Label>Institution Type</Label>
              <div className="flex gap-4">
                <button
                  onClick={() => setOrgType('school')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    orgType === 'school'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <GraduationCap className={`h-8 w-8 mx-auto mb-2 ${
                    orgType === 'school' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <p className={`font-medium ${
                    orgType === 'school' ? 'text-primary' : 'text-muted-foreground'
                  }`}>School (K-12)</p>
                  <p className="text-xs text-muted-foreground mt-1">Standards & Classes</p>
                </button>
                <button
                  onClick={() => setOrgType('college')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    orgType === 'college'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Building2 className={`h-8 w-8 mx-auto mb-2 ${
                    orgType === 'college' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <p className={`font-medium ${
                    orgType === 'college' ? 'text-primary' : 'text-muted-foreground'
                  }`}>College</p>
                  <p className="text-xs text-muted-foreground mt-1">Departments & Years</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Structure View */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              {orgType === 'school' ? 'School Structure' : 'College Structure'}
            </h2>
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              Add {orgType === 'school' ? 'Section' : 'Department'}
            </Button>
          </div>

          <div className="space-y-4">
            {structure.map((section) => (
              <div key={section.id} className="border border-border rounded-xl overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg hero-gradient">
                      {orgType === 'school' ? (
                        <BookOpen className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Building2 className="h-5 w-5 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{section.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {orgType === 'school' 
                          ? `${section.classes.length} Classes`
                          : `${section.years?.length} Years`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(orgType === 'school' ? section.classes : section.years)?.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{item.name}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.divisions.map((div) => (
                            <span
                              key={div}
                              className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium"
                            >
                              {div}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{Math.floor(Math.random() * 30) + 20} students</span>
                        </div>
                      </div>
                    ))}
                    <button className="p-3 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-medium">Add {orgType === 'school' ? 'Class' : 'Year'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="hero" size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
