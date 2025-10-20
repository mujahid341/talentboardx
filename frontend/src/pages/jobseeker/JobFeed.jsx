import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import { formatSalary, formatRelativeTime, getMatchScoreColor } from '../../utils/helpers';

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
  });
  const [savedJobs, setSavedJobs] = useState(new Set());

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      console.log('Fetching jobs with filters:', filters);
      
      // Only send non-empty filters to API
      const apiFilters = {};
      if (filters.search) apiFilters.search = filters.search;
      if (filters.location) apiFilters.location = filters.location;
      if (filters.jobType) apiFilters.jobType = filters.jobType;
      
      const response = await jobService.getAllJobs(apiFilters);
      console.log('API response:', response);
      
      // Handle different response formats
      let jobsData = [];
      if (response.jobs) {
        jobsData = response.jobs;
      } else if (Array.isArray(response)) {
        jobsData = response;
      } else if (response.data && Array.isArray(response.data)) {
        jobsData = response.data;
      }
      
      console.log('Processed jobs data:', jobsData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                name="search"
                placeholder="Search jobs, skills, companies..."
                icon={Search}
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <Select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              options={[
                { value: '', label: 'All Locations' },
                { value: 'Remote', label: 'Remote' },
                { value: 'Bangalore', label: 'Bangalore' },
                { value: 'Mumbai', label: 'Mumbai' },
                { value: 'Delhi', label: 'Delhi' },
                { value: 'Hyderabad', label: 'Hyderabad' },
              ]}
            />
            <Select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              options={[
                { value: '', label: 'All Job Types' },
                { value: 'Full-Time', label: 'Full-Time' },
                { value: 'Part-Time', label: 'Part-Time' },
                { value: 'Contract', label: 'Contract' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {jobs.length} Jobs Found
                </h2>
                <p className="text-gray-600 mt-1">Find your perfect opportunity</p>
              </div>
              <Button variant="outline" onClick={fetchJobs} disabled={loading}>
                Refresh
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <Card key={job.id} hover className="relative">
                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        savedJobs.has(job.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* Company Logo */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.jobType || 'Full-Time'}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-sm">{formatSalary(job.salary)}/mo</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{formatRelativeTime(job.createdAt || job.postedAt)}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(job.skills || []).slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="gray">
                        {skill}
                      </Badge>
                    ))}
                    {(job.skills || []).length > 4 && (
                      <Badge variant="gray">+{job.skills.length - 4} more</Badge>
                    )}
                  </div>

                  {/* Match Score */}
                  {job.matchScore && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-primary mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Match Score
                        </span>
                      </div>
                      <span className={`text-lg font-bold ${getMatchScoreColor(job.matchScore)}`}>
                        {job.matchScore}%
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link to={`/jobs/${job.id}`} className="flex-1">
                      <Button variant="primary" className="w-full">
                        Apply Now
                      </Button>
                    </Link>
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="primary">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Removed mock data to ensure only real data is displayed

export default JobFeed;
