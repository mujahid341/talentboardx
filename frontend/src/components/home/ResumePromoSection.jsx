import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

const ResumePromoSection = () => {
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

  const metrics = [
    { label: "Resume Quality", score: 85, color: "bg-green-400" },
    { label: "Skills Match", score: 92, color: "bg-cyan-400" },
    { label: "Experience Level", score: 78, color: "bg-purple-400" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-cyan-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bTAtOHYyaDJ2LTJoLTJ6bTQgNHYyaDJ2LTJoLTJ6bS00LTR2Mmgydi0yaC0yem0wIDh2Mmgydi0yaC0yem00LTR2Mmgydi0yaC0yem0tOC00djJoMnYtMmgtMnptMCA4djJoMnYtMmgtMnptNCAwaC0ydjJoMnYtMnptLTQtNHYyaDJ2LTJoLTJ6bTggMHYyaDJ2LTJoLTJ6bS00LTR2Mmgydi0yaC0yem00IDR2Mmgydi0yaC0yem0tOC00djJoMnYtMmgtMnptOCA0aC0ydjJoMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-white space-y-6"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold"
            >
              Optimize Your Resume with AI
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-purple-100"
            >
              Upload your resume and get a personalized match score and improvement suggestions — instantly.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/register">
                <Button 
                  size="lg"
                  className="bg-white !text-purple-700 hover:bg-purple-50 shadow-xl"
                >
                  <Upload className="mr-2 w-5 h-5 text-purple-700" />
                  <span className="text-purple-700 font-semibold">Upload Resume</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  {metrics.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{item.label}</span>
                        <span className="text-white font-bold">{item.score}%</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.score}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute -top-4 -right-4 bg-cyan-400 rounded-xl p-4 shadow-xl"
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumePromoSection;
