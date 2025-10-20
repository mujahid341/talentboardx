import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, TrendingUp, Mail, Calendar } from 'lucide-react';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import { formatDate, getMatchScoreColor } from '../../utils/helpers';

const Applications = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [id]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobApplications(id);
      setJob(response.job || mockJob);
      setApplications(response.applications || mockApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setJob(mockJob);
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
        {/* Back Button */}
        <Link to="/employer/dashboard">
          <Button variant="ghost" icon={ArrowLeft} className="mb-6">
            Back to Dashboard
          </Button>
        </Link>

        {/* Job Info */}
        <Card className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{job?.title}</h1>
          <p className="text-gray-600 mb-4">
            {applications.length} applications received
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
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
        </Card>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No applications found
            </h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'No one has applied to this job yet'
                : `No ${filter} applications`}
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} hover>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-semibold text-primary">
                        {application.candidateName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {application.candidateName}
                      </h3>
                      <p className="text-gray-600 mb-3">{application.candidateTitle}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          <span>{application.candidateEmail}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Applied {formatDate(application.appliedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          <span className={getMatchScoreColor(application.matchScore)}>
                            {application.matchScore}% Match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadge(application.status)} size="lg">
                      {application.status}
                    </Badge>
                    <Link to={`/employer/jobs/${id}/applications/${application.id}`}>
                      <Button variant="primary" size="sm">
                        Review
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
const mockJob = {
  id: 1,
  title: 'React Developer',
};

const mockApplications = [
  {
    id: 1,
    candidateName: 'Ankit Kumar',
    candidateTitle: 'Frontend Developer',
    candidateEmail: 'ankit.kumar@email.com',
    status: 'reviewing',
    matchScore: 84,
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    candidateName: 'Priya Sharma',
    candidateTitle: 'React Developer',
    candidateEmail: 'priya.sharma@email.com',
    status: 'shortlisted',
    matchScore: 91,
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    candidateName: 'Rahul Verma',
    candidateTitle: 'Full Stack Developer',
    candidateEmail: 'rahul.verma@email.com',
    status: 'pending',
    matchScore: 76,
    appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export default Applications;
