import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Users, TrendingUp, Plus, Edit, Trash2, Eye,
  Calendar, DollarSign, MapPin 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import { formatDate, formatSalary } from '../../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { jobs } = await jobService.getAllJobs();
      setJobs(jobs);
      // Minimal stats based on jobs; keep UI similar
      setStats({
        jobsPosted: jobs.length,
        applications: 0,
        avgScore: 0,
        chartData: [],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats(mockStats);
      setJobs(mockJobs);
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobService.deleteJob(jobId);
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#06B6D4] py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome, {user?.name} 👋
          </h1>
          <p className="text-purple-100 text-lg">Here's what's happening with your job postings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Stats Section */}
        <div className="mb-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Jobs Posted</p>
                <p className="text-3xl font-bold text-gray-900">{stats.jobsPosted}</p>
                <p className="text-sm text-green-600 mt-1">+2 this month</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
                <p className="text-sm text-green-600 mt-1">+18 this week</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Match Score</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgScore}%</p>
                <p className="text-sm text-green-600 mt-1">+3% improvement</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Applications Chart */}
        {/*<Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Applications Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#4F46E5" 
                strokeWidth={2}
                dot={{ fill: '#4F46E5', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card> */}

        {/* Job Listings */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Job Listings</h2>
            <Link to="/employer/post-job">
              <Button variant="primary" icon={Plus}>
                Post New Job
              </Button>
            </Link>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Job Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Applications
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Posted
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-600">{formatSalary(job.salary)}/mo</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="primary">{job.applications} applicants</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{formatDate(job.createdAt || job.postedAt)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={job.status === 'active' ? 'success' : 'gray'}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/employer/jobs/${job.id}/applications`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/employer/jobs/${job.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <Badge variant={job.status === 'active' ? 'success' : 'gray'}>
                    {job.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Applications</span>
                  <Badge variant="primary">{job.applications}</Badge>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Posted</span>
                  <span className="text-sm text-gray-900">{formatDate(job.postedAt)}</span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/employer/jobs/${job.id}/applications`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/employer/jobs/${job.id}/edit`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
      </div>
    </div>
  );
};

// Mock data
const mockStats = {
  jobsPosted: 12,
  applications: 112,
  avgScore: 81,
  chartData: [
    { date: 'Oct 10', applications: 8 },
    { date: 'Oct 11', applications: 12 },
    { date: 'Oct 12', applications: 15 },
    { date: 'Oct 13', applications: 18 },
    { date: 'Oct 14', applications: 22 },
    { date: 'Oct 15', applications: 28 },
    { date: 'Oct 16', applications: 25 },
  ],
};

const mockJobs = [
  {
    id: 1,
    title: 'React Developer',
    location: 'Remote',
    salary: 60000,
    applications: 34,
    postedAt: new Date('2024-10-15'),
    status: 'active',
  },
  {
    id: 2,
    title: 'Node.js Developer',
    location: 'Bangalore',
    salary: 70000,
    applications: 28,
    postedAt: new Date('2024-10-10'),
    status: 'active',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    location: 'Mumbai',
    salary: 80000,
    applications: 42,
    postedAt: new Date('2024-10-05'),
    status: 'closed',
  },
];

export default Dashboard;
