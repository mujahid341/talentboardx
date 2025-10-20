import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    resumePath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'shortlisted', 'rejected'],
      default: 'submitted',
    },
    aiMatchScore: {
      type: Number,
      default: null,
    },
    aiFeedback: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', ApplicationSchema);
export default Application;
