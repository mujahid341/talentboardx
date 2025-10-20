import { useState, useEffect } from 'react';
import { 
  Users, Briefcase, TrendingUp, Shield, Lock, Unlock,
  ArrowUpCircle, Flag, CheckCircle, XCircle, Search
} from 'lucide-react';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Loading from '../../components/ui/Loading';
import Modal from '../../components/ui/Modal';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [flaggedJobs, setFlaggedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const { jobs } = await jobService.getAllJobs();
      setStats({
        totalUsers: mockStats.totalUsers,
        totalJobs: jobs.length,
        avgAIScore: mockStats.avgAIScore,
        flaggedItems: mockStats.flaggedItems,
      });
      setUsers(mockUsers);
      setFlaggedJobs(mockFlaggedJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setStats(mockStats);
      setUsers(mockUsers);
      setFlaggedJobs(mockFlaggedJobs);
      setLoading(false);
    }
  };

  const handleUserAction = (user, action) => {
    setSelectedUser(user);
    if (action === 'view') {
      setShowUserModal(true);
    } else if (action === 'suspend') {
      if (window.confirm(`Are you sure you want to suspend ${user.name}?`)) {
        alert(`User ${user.name} suspended`);
        fetchAdminData();
      }
    } else if (action === 'activate') {
      alert(`User ${user.name} activated`);
      fetchAdminData();
    } else if (action === 'promote') {
      if (window.confirm(`Promote ${user.name} to admin?`)) {
        alert(`User ${user.name} promoted to admin`);
        fetchAdminData();
      }
    }
  };

  const handleJobAction = (job, action) => {
    if (action === 'approve') {
      alert(`Job "${job.title}" approved`);
      setFlaggedJobs(flaggedJobs.filter(j => j.id !== job.id));
    } else if (action === 'suspend') {
      if (window.confirm(`Suspend job "${job.title}"?`)) {
        alert(`Job "${job.title}" suspended`);
        setFlaggedJobs(flaggedJobs.filter(j => j.id !== job.id));
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage users, jobs, and platform settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-sm text-green-600 mt-1">+12 this week</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                <p className="text-sm text-green-600 mt-1">+8 this week</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg AI Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgAIScore}%</p>
                <p className="text-sm text-green-600 mt-1">+2% improvement</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Flagged Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.flaggedItems}</p>
                <p className="text-sm text-red-600 mt-1">Needs attention</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Manage Users */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Manage Users</h2>
            <div className="w-64">
              <Input
                type="text"
                placeholder="Search users..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-primary">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge variant={user.role === 'admin' ? 'danger' : 'primary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.joinedDate}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        {user.status === 'active' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction(user, 'suspend')}
                          >
                            <Lock className="w-4 h-4 text-red-600" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction(user, 'activate')}
                          >
                            <Unlock className="w-4 h-4 text-green-600" />
                          </Button>
                        )}
                        {user.role !== 'admin' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUserAction(user, 'promote')}
                          >
                            <ArrowUpCircle className="w-4 h-4 text-primary" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <span className="font-semibold text-primary">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={user.role === 'admin' ? 'danger' : 'primary'}>{user.role}</Badge>
                  <Badge variant={user.status === 'active' ? 'success' : 'danger'}>{user.status}</Badge>
                </div>
                <div className="flex gap-2">
                  {user.status === 'active' ? (
                    <Button
                      variant="danger"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUserAction(user, 'suspend')}
                    >
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUserAction(user, 'activate')}
                    >
                      Activate
                    </Button>
                  )}
                  {user.role !== 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleUserAction(user, 'promote')}
                    >
                      Promote
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Flagged Jobs */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Flagged Jobs</h2>

          {flaggedJobs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Flag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No flagged jobs at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {flaggedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                    <Badge variant="warning">{job.reason}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      icon={CheckCircle}
                      onClick={() => handleJobAction(job, 'approve')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={XCircle}
                      onClick={() => handleJobAction(job, 'suspend')}
                    >
                      Suspend
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* User Detail Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Details"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="text-center pb-4 border-b">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <Badge variant="primary">{selectedUser.role}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant={selectedUser.status === 'active' ? 'success' : 'danger'}>
                  {selectedUser.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Joined:</span>
                <span className="font-medium">{selectedUser.joinedDate}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Mock data
const mockStats = {
  totalUsers: 410,
  totalJobs: 130,
  avgAIScore: 83,
  flaggedItems: 3,
};

const mockUsers = [
  {
    id: 1,
    name: 'Ankit Kumar',
    email: 'ankit.kumar@email.com',
    role: 'jobseeker',
    status: 'active',
    joinedDate: 'Oct 10, 2024',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    role: 'employer',
    status: 'active',
    joinedDate: 'Oct 12, 2024',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    email: 'rahul.verma@email.com',
    role: 'jobseeker',
    status: 'suspended',
    joinedDate: 'Oct 08, 2024',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    email: 'sneha.patel@email.com',
    role: 'employer',
    status: 'active',
    joinedDate: 'Oct 15, 2024',
  },
];

const mockFlaggedJobs = [
  {
    id: 1,
    title: 'Data Engineer',
    company: 'Tech Corp',
    reason: 'Duplicate Listing',
  },
  {
    id: 2,
    title: 'Senior Developer',
    company: 'StartupXYZ',
    reason: 'Suspicious Content',
  },
];

export default AdminDashboard;
