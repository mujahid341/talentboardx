import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], required: true },
    company: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    skills: [String],
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);
export default Job;
