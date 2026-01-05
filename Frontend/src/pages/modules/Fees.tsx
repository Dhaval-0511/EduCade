import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  IndianRupee
} from 'lucide-react';

const sampleFees = [
  { id: '1', name: 'Rahul Sharma', rollNo: '001', total: 50000, paid: 50000, status: 'paid' },
  { id: '2', name: 'Priya Patel', rollNo: '002', total: 50000, paid: 25000, status: 'partial' },
  { id: '3', name: 'Amit Kumar', rollNo: '003', total: 50000, paid: 0, status: 'pending' },
  { id: '4', name: 'Sneha Reddy', rollNo: '004', total: 50000, paid: 50000, status: 'paid' },
  { id: '5', name: 'Vikram Singh', rollNo: '005', total: 50000, paid: 35000, status: 'partial' },
  { id: '6', name: 'Anita Desai', rollNo: '006', total: 50000, paid: 50000, status: 'paid' },
];

const studentFeeDetails = {
  tuition: { amount: 35000, paid: 35000, status: 'paid' },
  library: { amount: 5000, paid: 5000, status: 'paid' },
  laboratory: { amount: 5000, paid: 0, status: 'pending' },
  sports: { amount: 3000, paid: 3000, status: 'paid' },
  miscellaneous: { amount: 2000, paid: 0, status: 'pending' },
};

export default function Fees() {
  const { role } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFees = sampleFees.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.rollNo.includes(searchTerm)
  );

  const totalCollected = sampleFees.reduce((acc, f) => acc + f.paid, 0);
  const totalPending = sampleFees.reduce((acc, f) => acc + (f.total - f.paid), 0);

  if (role === 'student') {
    const totalFee = Object.values(studentFeeDetails).reduce((acc, f) => acc + f.amount, 0);
    const paidFee = Object.values(studentFeeDetails).reduce((acc, f) => acc + f.paid, 0);
    const pendingFee = totalFee - paidFee;

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Fees</h1>
            <p className="text-muted-foreground mt-1">View and manage your fee payments</p>
          </div>

          {/* Fee Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <IndianRupee className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Fee</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalFee.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid</p>
                  <p className="text-2xl font-bold text-success">₹{paidFee.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-warning/10">
                  <AlertCircle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">₹{pendingFee.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Fee Breakdown</h2>
              <Button variant="hero">Pay Now</Button>
            </div>
            <div className="space-y-4">
              {Object.entries(studentFeeDetails).map(([key, fee]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium text-foreground capitalize">{key} Fee</p>
                    <p className="text-sm text-muted-foreground">
                      Paid: ₹{fee.paid.toLocaleString()} / ₹{fee.amount.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      fee.status === 'paid'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {fee.status === 'paid' ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                  </span>
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
            <h1 className="text-3xl font-bold text-foreground">Fees Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage student fee payments</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold text-foreground">{sampleFees.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold text-success">₹{totalCollected.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Total Pending</p>
            <p className="text-2xl font-bold text-warning">₹{totalPending.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft">
            <p className="text-sm text-muted-foreground">Collection Rate</p>
            <p className="text-2xl font-bold text-primary">
              {Math.round((totalCollected / (totalCollected + totalPending)) * 100)}%
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

        {/* Fee List */}
        <div className="bg-card rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left text-sm font-semibold text-foreground">Roll No</th>
                <th className="p-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="p-4 text-right text-sm font-semibold text-foreground">Total</th>
                <th className="p-4 text-right text-sm font-semibold text-foreground">Paid</th>
                <th className="p-4 text-right text-sm font-semibold text-foreground">Pending</th>
                <th className="p-4 text-center text-sm font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4 text-sm text-muted-foreground">{fee.rollNo}</td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{fee.name}</p>
                  </td>
                  <td className="p-4 text-right text-foreground">₹{fee.total.toLocaleString()}</td>
                  <td className="p-4 text-right text-success">₹{fee.paid.toLocaleString()}</td>
                  <td className="p-4 text-right text-warning">₹{(fee.total - fee.paid).toLocaleString()}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        fee.status === 'paid'
                          ? 'bg-success/10 text-success'
                          : fee.status === 'partial'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-destructive/10 text-destructive'
                      }`}
                    >
                      {fee.status === 'paid' ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : fee.status === 'partial' ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <AlertCircle className="h-3 w-3" />
                      )}
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
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
