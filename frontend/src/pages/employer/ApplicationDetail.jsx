import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Calendar, Download,
  CheckCircle, XCircle, AlertCircle, FileText, Award
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import { getMatchScoreColor } from '../../utils/helpers';

const ApplicationDetail = () => {
  const { id, applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicationDetail();
  }, [applicationId]);

  const fetchApplicationDetail = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setApplication(mockApplication);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching application:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      // Update application status
      alert(`Application ${status}`);
      navigate(`/employer/jobs/${id}/applications`);
    } catch (error) {
      console.error('Error updating status:', error);
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
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back to Applications
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - JD & Resume */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
                <Badge variant="primary">React Developer</Badge>
              </div>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h3 className="font-semibold mb-2">Required Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockApplication.job.skills.map((skill, index) => (
                      <Badge key={index} variant="gray">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Experience:</h3>
                  <p>{mockApplication.job.experience}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location:</h3>
                  <p>{mockApplication.job.location}</p>
                </div>
              </div>
            </Card>

            {/* Resume Preview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Resume</h2>
                <Button variant="outline" size="sm" icon={Download}>
                  Download
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockApplication.candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Experience:</h3>
                  <p className="text-gray-700">{mockApplication.candidate.experience}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Education:</h3>
                  <p className="text-gray-700">{mockApplication.candidate.education}</p>
                </div>
              </div>
            </Card>

            {/* AI Evaluation */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">AI Evaluation Summary</h2>

              {/* Match Score */}
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg mb-6">
                <div className="flex items-center">
                  <Award className="w-6 h-6 text-primary mr-3" />
                  <span className="font-semibold text-gray-900">Overall Match Score</span>
                </div>
                <span className={`text-3xl font-bold ${getMatchScoreColor(mockApplication.analysis.matchScore)}`}>
                  {mockApplication.analysis.matchScore}%
                </span>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Skills</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockApplication.analysis.skillsScore}%
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockApplication.analysis.experienceScore}%
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Education</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockApplication.analysis.educationScore}%
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-4">
                <div className="flex items-center text-green-700 font-semibold mb-3">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Strengths
                </div>
                <ul className="space-y-2">
                  {mockApplication.analysis.strengths.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="mb-4">
                <div className="flex items-center text-yellow-700 font-semibold mb-3">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Areas for Improvement
                </div>
                <ul className="space-y-2">
                  {mockApplication.analysis.suggestions.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <div className="flex items-center text-red-700 font-semibold mb-3">
                  <XCircle className="w-5 h-5 mr-2" />
                  Concerns
                </div>
                <ul className="space-y-2">
                  {mockApplication.analysis.weaknesses.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <span className="text-red-600 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Right Column - Candidate Info */}
          <div className="space-y-6">
            {/* Candidate Card */}
            <Card>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {mockApplication.candidate.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {mockApplication.candidate.name}
                </h2>
                <p className="text-gray-600">{mockApplication.candidate.title}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">{mockApplication.candidate.email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">{mockApplication.candidate.phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">{mockApplication.candidate.location}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-sm">Applied 2 days ago</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Take Action</h3>
              <div className="space-y-3">
                <Button
                  variant="success"
                  className="w-full"
                  icon={CheckCircle}
                  onClick={() => handleStatusUpdate('shortlisted')}
                >
                  Shortlist Candidate
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  icon={XCircle}
                  onClick={() => handleStatusUpdate('rejected')}
                >
                  Reject Application
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  icon={FileText}
                >
                  Schedule Interview
                </Button>
              </div>
            </Card>

            {/* Application Status */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Application Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Status</span>
                  <Badge variant="warning">Under Review</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Applied On</span>
                  <span className="text-sm font-medium">Oct 18, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Resume Score</span>
                  <span className={`text-sm font-bold ${getMatchScoreColor(82)}`}>
                    82%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data
const mockApplication = {
  id: 1,
  job: {
    title: 'React Developer',
    skills: ['React', 'Node.js', 'REST API'],
    experience: '2+ years',
    location: 'Remote',
  },
  candidate: {
    name: 'Ankit Kumar',
    title: 'Frontend Developer',
    email: 'ankit.kumar@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    skills: ['React', 'JavaScript', 'GraphQL', 'TypeScript'],
    experience: '1.5 years',
    education: 'B.Tech in Computer Science',
  },
  analysis: {
    matchScore: 82,
    skillsScore: 90,
    experienceScore: 75,
    educationScore: 100,
    strengths: [
      'Strong proficiency in React and modern JavaScript',
      'Experience with GraphQL and TypeScript',
      'Good understanding of frontend best practices',
    ],
    suggestions: [
      'Could benefit from more Node.js experience',
      'Add more details about REST API projects',
    ],
    weaknesses: [
      'Experience slightly below requirement (1.5 vs 2 years)',
      'Limited backend development experience',
    ],
  },
};

export default ApplicationDetail;
