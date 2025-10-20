import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, TrendingUp, Eye } from 'lucide-react';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import { formatDate, formatSalary, getMatchScoreColor } from '../../utils/helpers';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await jobService.getMyApplications();
      setApplications(response.applications || mockApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications(mockApplications);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      reviewing: 'primary',
      shortlisted: 'success',
      rejected: 'danger',
    };
    return variants[status] || 'gray';
  };

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track your job applications and their status</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['all', 'pending', 'reviewing', 'shortlisted', 'rejected'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-600 mb-6">
              Start applying to jobs to see them here
            </p>
            <Link to="/jobs">
              <Button variant="primary">Browse Jobs</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} hover>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.jobTitle}
                      </h3>
                      <p className="text-gray-600 mb-3">{application.company}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{application.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Applied {formatDate(application.appliedAt)}</span>
                        </div>
                        {application.matchScore && (
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span className={getMatchScoreColor(application.matchScore)}>
                              {application.matchScore}% Match
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadge(application.status)} size="lg">
                      {application.status}
                    </Badge>
                    <Link to={`/jobs/${application.jobId}`}>
                      <Button variant="outline" size="sm" icon={Eye}>
                        View Job
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Mock data
const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'React Developer',
    company: 'JASIQ Labs',
    location: 'Remote',
    status: 'reviewing',
    matchScore: 84,
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Frontend Developer',
    company: 'Tech Innovators',
    location: 'Bangalore',
    status: 'shortlisted',
    matchScore: 78,
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    jobId: 3,
    jobTitle: 'Full Stack Developer',
    company: 'Digital Solutions',
    location: 'Mumbai',
    status: 'pending',
    matchScore: 92,
    appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export default Applications;
