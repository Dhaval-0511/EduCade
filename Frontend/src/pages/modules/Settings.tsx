import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Moon,
  Globe,
  Shield,
  Save
} from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Profile Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full hero-gradient flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {user?.name.charAt(0)}
              </div>
              <div>
                <Button variant="outline" size="sm">Change Photo</Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue={user?.email} className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" placeholder="+91 9876543210" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={user?.role || ''} disabled className="capitalize" />
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="currentPassword" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
              <div></div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="newPassword" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10" />
                </div>
              </div>
            </div>
            <Button variant="outline">Update Password</Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">New Notice Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when new notices are posted</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Fee Reminders</p>
                <p className="text-sm text-muted-foreground">Receive reminders for pending fees</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Result Announcements</p>
                <p className="text-sm text-muted-foreground">Get notified when results are published</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </p>
                <p className="text-sm text-muted-foreground">Use dark theme across the application</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="w-full md:w-64 p-2 rounded-lg border border-input bg-background text-foreground">
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="hero" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
