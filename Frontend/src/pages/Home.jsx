import HeroSection from '../components/HeroSection/HeroSection';
import StatsSection from '../components/StatsSection/StatsSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import AboutSection from '../components/AboutSection/AboutSection';
import GallerySection from '../components/GallerySection/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import CTABanner from '../components/CTABanner/CTABanner';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <CTABanner />
    </main>
  );
};

export default Home;
