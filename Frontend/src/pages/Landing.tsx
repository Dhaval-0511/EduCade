import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  ClipboardCheck, 
  FileText, 
  Bell,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Building2
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'User Management',
    description: 'Role-based access for admins, faculty, and students with tailored dashboards.',
  },
  {
    icon: Calendar,
    title: 'Timetable Management',
    description: 'Create and manage weekly schedules linked to subjects and divisions.',
  },
  {
    icon: ClipboardCheck,
    title: 'Attendance Tracking',
    description: 'Day-wise attendance marking with comprehensive reports and analytics.',
  },
  {
    icon: FileText,
    title: 'Fees Management',
    description: 'Track payments, dues, and generate fee reports per student.',
  },
  {
    icon: BookOpen,
    title: 'Results & Grading',
    description: 'Manual or bulk upload of exam results with grade calculations.',
  },
  {
    icon: Bell,
    title: 'Notices & Alerts',
    description: 'PDF-based announcements with department-wise distribution.',
  },
];

const benefits = [
  'Designed specifically for rural education needs',
  'Works offline with sync capabilities',
  'Multi-language support for regional accessibility',
  'Simple interface for first-time computer users',
  'Secure data storage with regular backups',
  'Affordable pricing for rural institutions',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="hero-gradient p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EduCade</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/auth?mode=signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="hero">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Building2 className="h-4 w-4" />
            <span>Built for Schools & Colleges</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Empowering Rural Education
            <br />
            <span className="text-primary">One School at a Time</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A comprehensive ERP system designed specifically for rural schools and colleges. 
            Manage students, faculty, attendance, fees, and more with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth?mode=signin">
              <Button variant="outline" size="xl">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive tools to digitize and streamline your institution's operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose EduCade?
              </h2>
              <p className="text-muted-foreground mb-8">
                We understand the unique challenges faced by rural educational institutions. 
                Our platform is built from the ground up to address these needs.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="hero-gradient rounded-2xl p-8 text-primary-foreground">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-foreground/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Schools</div>
                  </div>
                  <div className="bg-primary-foreground/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Students</div>
                  </div>
                  <div className="bg-primary-foreground/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">5K+</div>
                    <div className="text-sm opacity-90">Faculty</div>
                  </div>
                  <div className="bg-primary-foreground/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">99%</div>
                    <div className="text-sm opacity-90">Uptime</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 accent-gradient rounded-xl p-4 shadow-floating animate-float">
                <div className="text-accent-foreground text-center">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-xs">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 hero-gradient">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join hundreds of schools and colleges already using EduCade to streamline their operations.
          </p>
          <Link to="/auth?mode=signup">
            <Button variant="accent" size="xl">
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-secondary/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="hero-gradient p-1.5 rounded-md">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">EduCade</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 EduCade. Empowering rural education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
