import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X, Sparkles } from 'lucide-react';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Badge from '../../components/ui/Badge';

const PostJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    skills: [],
    jobType: 'Full-Time',
    workMode: 'remote',
  });

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { job } = await jobService.getJobById(id);
        setFormData({
          title: job?.title || '',
          company: job?.company || '',
          location: job?.location || '',
          description: job?.description || '',
          skills: Array.isArray(job?.skills) ? job.skills : [],
          jobType: job?.jobType || 'Full-Time',
          workMode: 'remote',
        });
      } catch (e) {
        console.error('Failed to load job', e);
        alert('Failed to load job');
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        jobType: formData.jobType,
        company: formData.company,
        skills: formData.skills,
      };
      if (id) {
        await jobService.updateJob(id, payload);
        alert('Job updated successfully!');
      } else {
        await jobService.createJob(payload);
        alert('Job posted successfully!');
      }
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('Error posting job:', error);
      alert(id ? 'Failed to update job' : 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = () => {
    // Simulate AI generation
    alert('AI Job Description Generator coming soon!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/employer/dashboard')}
          className="mb-6"
        >
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{id ? 'Edit Job' : 'Post a New Job'}</h1>
          <p className="text-gray-600">{id ? 'Update your job details' : 'Fill in the details to create a job posting'}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Job Details</h2>

            <div className="space-y-5">
              <Input
                label="Job Title"
                type="text"
                name="title"
                placeholder="e.g. Senior React Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Company"
                  type="text"
                  name="company"
                  placeholder="e.g. JASIQ Labs"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />

                <Select
                  label="Work Mode"
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  options={[
                    { value: 'remote', label: 'Remote' },
                    { value: 'onsite', label: 'On-site' },
                    { value: 'hybrid', label: 'Hybrid' },
                  ]}
                />

                <Input
                  label="Location"
                  type="text"
                  name="location"
                  placeholder="e.g. Bangalore, Mumbai"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Select
                  label="Job Type"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  options={[
                    { value: 'Full-Time', label: 'Full-Time' },
                    { value: 'Part-Time', label: 'Part-Time' },
                    { value: 'Contract', label: 'Contract' },
                  ]}
                />
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={Sparkles}
                onClick={handleAIGenerate}
              >
                AI Generate
              </Button>
            </div>

            <Textarea
              name="description"
              placeholder="Describe the role, responsibilities, requirements, and what makes your company great..."
              value={formData.description}
              onChange={handleChange}
              rows={10}
              required
            />

            <p className="text-sm text-gray-500 mt-2">
              Include key responsibilities, requirements, and benefits
            </p>
          </Card>

          <Card className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Skills Required</h2>

            <div className="flex gap-2 mb-4">
              <Input
                type="text"
                placeholder="Add a skill (e.g. React, Node.js)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(e);
                  }
                }}
              />
              <Button
                type="button"
                variant="primary"
                icon={Plus}
                onClick={handleAddSkill}
              >
                Add
              </Button>
            </div>

            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="primary" size="lg" className="pr-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 hover:text-primary-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {formData.skills.length === 0 && (
              <p className="text-sm text-gray-500">No skills added yet</p>
            )}
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/employer/dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={loading}
            >
              {id ? 'Update Job' : 'Post Job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
