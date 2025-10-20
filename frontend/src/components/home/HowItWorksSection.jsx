import { motion } from 'framer-motion';
import { Upload, Search, FileText, BarChart3, Target, FileCheck, TrendingUp, Users, Briefcase } from 'lucide-react';

const HowItWorksSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const jobSeekerSteps = [
    { icon: Upload, text: "Upload your resume" },
    { icon: BarChart3, text: "Get AI Score + Suggestions" },
    { icon: Target, text: "Apply to matching jobs" }
  ];

  const employerSteps = [
    { icon: FileText, text: "Post a job" },
    { icon: FileCheck, text: "View applicant fit reports" },
    { icon: TrendingUp, text: "Hire confidently with AI data" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Here's How TalentBoardX Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple, powerful, and AI-driven
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Job Seekers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              For Job Seekers
            </h3>
            <div className="space-y-6">
              {jobSeekerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-purple-600">Step {index + 1}</span>
                    </div>
                    <p className="text-gray-900 font-medium">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gradient-to-br from-cyan-50 to-purple-50 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-cyan-600" />
              For Employers
            </h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-cyan-600">Step {index + 1}</span>
                    </div>
                    <p className="text-gray-900 font-medium">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
