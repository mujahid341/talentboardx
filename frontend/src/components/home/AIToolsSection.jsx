import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Search, FileText, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const AIToolsSection = () => {
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

  const tools = [
    {
      icon: Upload,
      title: 'Resume Analyzer',
      description: 'Upload resume → AI scores & suggests improvements',
      gradient: 'from-purple-500 to-purple-700',
      hoverBorder: 'hover:border-purple-300',
      hoverBg: 'group-hover:bg-purple-600',
      bgGradient: 'from-purple-500/5 to-cyan-500/5'
    },
    {
      icon: Search,
      title: 'JD Matcher',
      description: 'Compare job description to resume for perfect fit',
      gradient: 'from-cyan-500 to-cyan-700',
      hoverBorder: 'hover:border-cyan-300',
      hoverBg: 'group-hover:bg-cyan-600',
      bgGradient: 'from-cyan-500/5 to-purple-500/5'
    },
    {
      icon: FileText,
      title: 'HR Report',
      description: 'Auto-generated hiring report with AI insights',
      gradient: 'from-purple-600 to-pink-600',
      hoverBorder: 'hover:border-purple-300',
      hoverBg: 'group-hover:bg-purple-600',
      bgGradient: 'from-purple-500/5 to-pink-500/5'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            GenAI Tools to Level Up Your Hiring
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Leverage cutting-edge AI technology to make smarter hiring decisions
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`group relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-purple-100 ${tool.hoverBorder}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                <p className="text-gray-600 mb-6">
                  {tool.description}
                </p>
                <Link to="/register">
                  <Button variant="outline" className={`w-full ${tool.hoverBg} group-hover:text-white group-hover:border-transparent`}>
                    Try Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIToolsSection;
