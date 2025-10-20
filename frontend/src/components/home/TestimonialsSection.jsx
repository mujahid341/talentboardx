import { motion } from 'framer-motion';

const TestimonialsSection = () => {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      avatar: "SJ",
      quote: "TalentBoardX helped me land my dream job! The AI resume analyzer gave me insights I never thought of.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "HR Manager",
      avatar: "MC",
      quote: "The AI matching system saved us countless hours. We found the perfect candidates in half the time.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Product Designer",
      avatar: "ER",
      quote: "The resume suggestions were spot-on. I improved my profile and got 3x more interview calls!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from real people
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
