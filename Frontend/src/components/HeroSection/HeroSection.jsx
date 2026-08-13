import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceRequestForm from '../ServiceRequestForm/ServiceRequestForm';
import './HeroSection.css';

const SLIDES = [
  {
    title: "CCTV & Security Solutions",
    subtitle: "Protecting your premises with cutting-edge surveillance technology",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=80",
    ctaText: "Get a Quote",
    ctaLink: "/contact"
  },
  {
    title: "Network Infrastructure",
    subtitle: "Enterprise-grade networking solutions for modern businesses",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
    ctaText: "Our Services",
    ctaLink: "/services"
  },
  {
    title: "Fiber Optic & Telecom",
    subtitle: "High-speed connectivity through advanced fiber optic installations",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80",
    ctaText: "Learn More",
    ctaLink: "/services/fiber-optic-cabling"
  },
  {
    title: "AMC & Maintenance",
    subtitle: "Reliable maintenance contracts to keep your systems running 24/7",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80",
    ctaText: "Contact Us",
    ctaLink: "/contact"
  }
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const scrollToNext = () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const nextSection = hero.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section 
      className="hero" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="hero__bg"
          style={{ backgroundImage: `url(${SLIDES[currentIndex].image})` }}
        >
          <div className="hero__overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="hero__content container">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="hero__text-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
              exit: { opacity: 0, transition: { duration: 0.2 } }
            }}
          >
            <motion.span 
              className="hero__badge my-[20px]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              Trusted Across India
            </motion.span>
            
            <motion.h1 
              className="hero__title"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              {SLIDES[currentIndex].title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? <span className="hero__title-accent">{word}</span> : word + ' '}
                </span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="hero__subtitle"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              {SLIDES[currentIndex].subtitle}
            </motion.p>
            
            <motion.div 
              className="hero__actions"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <a href={SLIDES[currentIndex].ctaLink} className="hero__cta hero__cta--primary">
                {SLIDES[currentIndex].ctaText}
              </a>
              <a href="/services" className="hero__cta hero__cta--secondary">View All Services</a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <ServiceRequestForm />

        <motion.div 
          className="hero__trust"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="hero__trust-item">
            <strong>500+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className="hero__trust-divider" />
          <div className="hero__trust-item">
            <strong>50+</strong>
            <span>Cities Covered</span>
          </div>
          <div className="hero__trust-divider" />
          <div className="hero__trust-item">
            <strong>24/7</strong>
            <span>Support Available</span>
          </div>
        </motion.div>
      </div>

      <div className="hero__nav hero__nav--prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </div>
      <div className="hero__nav hero__nav--next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </div>

      <div className="hero__dots">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            className={`hero__dot ${idx === currentIndex ? 'hero__dot--active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button className="hero__scroll" onClick={scrollToNext} aria-label="Scroll to next section">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-icon">
          <ChevronDown size={20} />
        </span>
      </button>
    </section>
  );
};

export default HeroSection;