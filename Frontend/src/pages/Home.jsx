import HeroSection from '../components/HeroSection/HeroSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import AboutSection from '../components/AboutSection/AboutSection';
import GallerySection from '../components/GallerySection/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection/TestimonialsSection';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
    </main>
  );
};

export default Home;
