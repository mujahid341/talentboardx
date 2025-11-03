import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Briefcase, MapPin, Calendar, TrendingUp, FileText,
  CheckCircle, AlertCircle, XCircle, Download, Building2, DollarSign,
  Clock, User
} from 'lucide-react';
import { applicationService } from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import AiMatchFeedback from '../../components/ui/AiMatchFeedback';
import { formatDate, formatSalary, getMatchScoreColor } from '../../utils/helpers';
import { API_BASE_URL } from '../../config/api.config';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicationDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchApplicationDetail = async () => {
    try {
      setLoading(true);
      const response = await applicationService.getApplicationById(id);
      console.log('Application detail:', response);
      setApplication(response.application);
    } catch (error) {
      console.error('Error fetching application:', error);
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || 'submitted').toLowerCase();
    const variants = {
      submitted: 'warning',
      pending: 'warning',
      reviewing: 'primary',
      shortlisted: 'success',
      rejected: 'danger',
      accepted: 'success',
    };
    return variants[statusLower] || 'gray';
  };

  const getStatusIcon = (status) => {
    const statusLower = (status || 'submitted').toLowerCase();
    switch (statusLower) {
      case 'shortlisted':
      case 'accepted':
        return <CheckCircle className="w-5 h-5" />;
      case 'rejected':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Not Found</h2>
          <Button onClick={() => navigate('/applications')}>Back to Applications</Button>
        </div>
      </div>
    );
  }

  const job = application.jobId || {};

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/applications')}
          className="mb-6"
        >
          Back to Applications
        </Button>

        {/* Application Status Header */}
        <Card className="mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title || 'Job Title'}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span>{job.company || 'Company'}</span>
                  </div>
                  {job.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(application.status)}
              <Badge variant={getStatusBadge(application.status)} size="lg">
                {(application.status || 'submitted').charAt(0).toUpperCase() + 
                 (application.status || 'submitted').slice(1)}
              </Badge>
            </div>
          </div>

          {/* Application Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Applied On</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(application.createdAt)}
              </p>
            </div>

            {job.salary && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm">Salary</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {formatSalary(job.salary)}/mo
                </p>
              </div>
            )}

            {job.experience && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Experience</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{job.experience}</p>
              </div>
            )}

            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">AI Match Score</span>
              </div>
              {application.aiMatchScore ? (
                <p className={`text-lg font-bold ${getMatchScoreColor(application.aiMatchScore)}`}>
                  {application.aiMatchScore}%
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">Pending analysis...</p>
              )}
            </div>
          </div>
        </Card>

        {/* Application Status Card */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Application Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <User className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Current Status</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(application.status)}
                <Badge variant={getStatusBadge(application.status)} size="lg">
                  {(application.status || 'submitted').charAt(0).toUpperCase() + 
                   (application.status || 'submitted').slice(1)}
                </Badge>
              </div>
            </div>

            {/* AI Match Score */}
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center text-primary mb-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">AI Match Score</span>
              </div>
              {application.aiMatchScore ? (
                <p className={`text-2xl font-bold ${getMatchScoreColor(application.aiMatchScore)}`}>
                  {application.aiMatchScore}%
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">Pending analysis...</p>
              )}
            </div>

            {/* Applied Date */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Submitted On</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(application.createdAt)}
              </p>
            </div>
          </div>
        </Card>

        {/* Resume Section */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Submitted Resume</h2>
            </div>
            {application.resumePath && (
              <a
                href={`${API_BASE_URL}/${application.resumePath}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button variant="outline" size="sm" icon={Download}>
                  Download Resume
                </Button>
              </a>
            )}
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700">
              <FileText className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium">
                {application.resumePath ? application.resumePath.split('/').pop() : 'Resume.pdf'}
              </span>
            </div>
          </div>
        </Card>

        {/* AI Feedback Section */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">AI Analysis & Feedback</h2>
          </div>
          {application.aiFeedback && application.aiMatchScore ? (
            <AiMatchFeedback
              aiMatchScore={application.aiMatchScore}
              aiFeedback={typeof application.aiFeedback === 'string' 
                ? { recommendation: application.aiFeedback } 
                : application.aiFeedback
              }
            />
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center py-6">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium mb-1">AI Analysis Pending</p>
                <p className="text-sm text-gray-500">
                  Your resume is being analyzed. AI feedback will be available soon.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Job Details Section */}
        {job.description && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{job.description}</p>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                    Key Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Skills Section */}
        {job.skills && job.skills.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="primary" size="lg">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link to={`/jobs/${job._id || job.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Full Job Details
            </Button>
          </Link>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => navigate('/applications')}
          >
            Back to Applications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
