import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Dashboards
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

// Modules
import Timetable from "./pages/modules/Timetable";
import Attendance from "./pages/modules/Attendance";
import Fees from "./pages/modules/Fees";
import Results from "./pages/modules/Results";
import Notices from "./pages/modules/Notices";
import Users from "./pages/modules/Users";
import Organization from "./pages/modules/Organization";
import Settings from "./pages/modules/Settings";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Dashboard Router
const DashboardRouter = () => {
  const { user } = useAuth();
  
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      return <Navigate to="/auth" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/:role"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organization/:role"
        element={
          <ProtectedRoute>
            <Organization />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:role"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timetable/:role"
        element={
          <ProtectedRoute>
            <Timetable />
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendance/:role"
        element={
          <ProtectedRoute>
            <Attendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/fees/:role"
        element={
          <ProtectedRoute>
            <Fees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results/:role"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notices/:role"
        element={
          <ProtectedRoute>
            <Notices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/:role"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
