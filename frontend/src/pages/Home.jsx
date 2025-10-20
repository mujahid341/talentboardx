import HeroSection from '../components/home/HeroSection';
import AIToolsSection from '../components/home/AIToolsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import ResumePromoSection from '../components/home/ResumePromoSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTABanner from '../components/home/CTABanner';
import HomeFooter from '../components/home/HomeFooter';
import PublicNavbar from '../components/layout/PublicNavbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <HeroSection />
      <AIToolsSection />
      <HowItWorksSection />
      <ResumePromoSection />
      <TestimonialsSection />
      <CTABanner />
      <HomeFooter />
    </div>
  );
};

export default Home;
