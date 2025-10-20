import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, DollarSign, Briefcase, Clock, Building2, Users, 
  TrendingUp, ArrowLeft, Heart, Share2, Upload, CheckCircle, 
  AlertCircle, XCircle 
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { jobService } from '../../services/jobService';
import { applicationService } from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import Modal from '../../components/ui/Modal';
import { formatSalary, formatRelativeTime, getMatchScoreColor } from '../../utils/helpers';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJobDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobById(id);
      setJob(response.job || null);
    } catch (error) {
      console.error('Error fetching job:', error);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setAnalyzing(true);
      
      try {
        // Simulate AI analysis
        setTimeout(() => {
          setAnalysis({
            score: 84,
            strengths: [
              'Skills matched: React, Tailwind CSS, Node.js',
              'Strong project portfolio',
              'Relevant work experience',
            ],
            suggestions: [
              'Add ExpressJS project experience',
              'Include more details about team collaboration',
              'Highlight leadership experience',
            ],
            weaknesses: [
              '1.5 years experience < required 2 years',
              'Missing MongoDB expertise',
            ],
          });
          setAnalyzing(false);
        }, 2000);
      } catch (error) {
        console.error('Error analyzing resume:', error);
        setAnalyzing(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleApply = async () => {
    if (!uploadedFile) {
      alert('Please upload your resume');
      return;
    }

    setApplying(true);
    try {
      await applicationService.applyToJob(id, uploadedFile);
      alert('Application submitted successfully!');
      setShowApplyModal(false);
      setUploadedFile(null);
      setAnalysis(null);
      navigate('/applications');
    } catch (error) {
      console.error('Error applying:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit application';
      alert(errorMessage);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/jobs')}
          className="mb-6"
        >
          Back to Jobs
        </Button>

        {/* Job Header */}
        <Card className="mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formatRelativeTime(job.createdAt || job.postedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-sm">Salary</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                {formatSalary(job.salary)}/mo
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <Briefcase className="w-4 h-4 mr-1" />
                <span className="text-sm">Experience</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{job.experience}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center text-gray-600 mb-1">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">Applicants</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{job.applicants}</p>
            </div>
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">Match Score</span>
              </div>
              <p className={`text-lg font-bold ${getMatchScoreColor(job.matchScore)}`}>
                {job.matchScore}%
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setShowApplyModal(true)}
          >
            Apply Now
          </Button>
        </Card>

        {/* Job Description */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">{job.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Key Responsibilities
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
            {(job.responsibilities || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Requirements
            </h3>
            <ul className="list-disc list-inside space-y-2">
              {(job.requirements || []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Skills Required */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Skills Required</h2>
          <div className="flex flex-wrap gap-2">
            {(job.skills || []).map((skill, index) => (
              <Badge key={index} variant="primary" size="lg">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply to Job"
        size="lg"
      >
        <div className="space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF/DOCX)
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary-50'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              {uploadedFile ? (
                <p className="text-gray-900 font-medium">{uploadedFile.name}</p>
              ) : (
                <>
                  <p className="text-gray-700 font-medium mb-1">
                    Drop your resume here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">PDF or DOCX, max 5MB</p>
                </>
              )}
            </div>
          </div>

          {/* AI Analysis */}
          {analyzing && (
            <div className="text-center py-8">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Analyzing your resume...</p>
            </div>
          )}

          {analysis && (
            <Card className="bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Match Score</h3>
                <div className={`text-3xl font-bold ${getMatchScoreColor(analysis.score)}`}>
                  {analysis.score}%
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-4">
                <div className="flex items-center text-green-700 font-medium mb-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Strengths
                </div>
                <ul className="space-y-1">
                  {analysis.strengths.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 pl-7">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="mb-4">
                <div className="flex items-center text-yellow-700 font-medium mb-2">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Suggestions
                </div>
                <ul className="space-y-1">
                  {analysis.suggestions.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 pl-7">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div>
                <div className="flex items-center text-red-700 font-medium mb-2">
                  <XCircle className="w-5 h-5 mr-2" />
                  Weaknesses
                </div>
                <ul className="space-y-1">
                  {analysis.weaknesses.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700 pl-7">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowApplyModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleApply}
              loading={applying}
              disabled={!uploadedFile}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Mock data
// Removed mockJob to ensure real data display only

export default JobDetail;
