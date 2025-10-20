import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection = () => {
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#06B6D4] min-h-[90vh] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-white space-y-8"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Smarter Hiring.
              <br />
              <span className="text-cyan-300">Stronger Matches.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-purple-100 max-w-xl"
            >
              AI analyzes resumes, scores matches, and improves outcomes.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/register?role=jobseeker">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-700 hover:bg-purple-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all w-full sm:w-auto"
                >
                  Find Jobs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register?role=employer">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
                >
                  Post a Job
                </Button>
              </Link>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-sm text-purple-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Powered by Gemini · Built by JASIQ Labs
            </motion.p>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-96">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div className="w-64 h-80 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
                    <div className="space-y-4">
                      <div className="h-4 bg-white/30 rounded w-3/4"></div>
                      <div className="h-4 bg-white/30 rounded w-1/2"></div>
                      <div className="h-32 bg-white/20 rounded-xl"></div>
                      <div className="h-4 bg-white/30 rounded w-2/3"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-cyan-400/50 rounded flex-1"></div>
                        <div className="h-8 bg-purple-400/50 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
