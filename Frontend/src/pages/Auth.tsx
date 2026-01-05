import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  BookOpen, 
  Users,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

const roleConfig = {
  admin: {
    icon: ShieldCheck,
    label: 'Administrator',
    description: 'Full system access and management',
    color: 'bg-primary',
  },
  faculty: {
    icon: BookOpen,
    label: 'Faculty',
    description: 'Manage classes, attendance & results',
    color: 'bg-info',
  },
  student: {
    icon: Users,
    label: 'Student',
    description: 'View schedules, results & notices',
    color: 'bg-success',
  },
};

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, user } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const result = await login(email, password);
        if (!result.success) {
          setError(result.error || 'Login failed');
        }
      } else {
        if (!name.trim()) {
          setError('Please enter your name');
          setIsLoading(false);
          return;
        }
        const result = await signup(email, password, name, role);
        if (!result.success) {
          setError(result.error || 'Signup failed');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary-foreground/20 p-3 rounded-xl">
              <GraduationCap className="h-10 w-10 text-primary-foreground" />
            </div>
            <div>
              {/* name */}
              <h1 className="text-3xl font-bold text-primary-foreground">EduCade</h1>
              <p className="text-primary-foreground/80">Education Management System</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-primary-foreground mb-4">
            {mode === 'signin' ? 'Welcome Back!' : 'Name'}
          </h2>
          <p className="text-primary-foreground/80 max-w-md">
            {mode === 'signin' 
              ? 'Sign in to access your personalized dashboard and manage your educational journey.'
              : 'Create an account to start managing your school or college with our comprehensive ERP system.'
            }
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(roleConfig).map(([key, config]) => (
            <div key={key} className="bg-primary-foreground/10 rounded-xl p-4 text-center">
              <config.icon className="h-6 w-6 text-primary-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-primary-foreground">{config.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 text-muted-foreground mb-8">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="hero-gradient p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">EduCade</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {mode === 'signin' 
              ? 'Enter your credentials to access your dashboard'
              : 'Fill in your details to get started'
            }
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div className="space-y-3">
                <Label>Select Your Role</Label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(roleConfig).map(([key, config]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRole(key as UserRole)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        role === key
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <config.icon className={`h-6 w-6 mx-auto mb-2 ${
                        role === key ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <div className={`text-sm font-medium ${
                        role === key ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {config.label}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {roleConfig[role].description}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
            <Button variant="outline" size="lg" className="w-full" type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError('');
                }}
                className="text-primary font-medium hover:underline"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
