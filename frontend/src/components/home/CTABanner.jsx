import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const CTABanner = () => {
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
    <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600 relative overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Ready to transform your hiring journey?
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-purple-100 max-w-2xl mx-auto"
          >
            Join thousands of job seekers and employers who trust TalentBoardX
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button 
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
              >
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register?role=employer">
              <Button 
                size="lg"
                className="bg-purple-800 text-white hover:bg-purple-900 shadow-xl w-full sm:w-auto"
              >
                Post a Job
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
