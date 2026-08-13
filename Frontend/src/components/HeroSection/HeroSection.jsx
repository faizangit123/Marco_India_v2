import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import './HeroSection.css';

const SLIDES = [
  {
    label: "Network Solutions",
    title: "ENTERPRISE\nNETWORK\nINFRASTRUCTURE",
    subtitle: "Building enterprise-grade network infrastructure for modern businesses across India.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
    ctaText: "Explore Services",
    ctaLink: "/services"
  },
  {
    label: "Security Systems",
    title: "INTELLIGENT\nCCTV &\nSURVEILLANCE",
    subtitle: "Smart surveillance and security infrastructure protecting businesses 24/7.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=80",
    ctaText: "Get a Quote",
    ctaLink: "/contact"
  },
  {
    label: "Fiber Optics",
    title: "HIGH-SPEED\nFIBER OPTIC\nSOLUTIONS",
    subtitle: "Delivering ultra-fast fiber optic connectivity for next-generation infrastructure.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80",
    ctaText: "Learn More",
    ctaLink: "/services/fiber-optic-cabling"
  },
  {
    label: "Telecom Infrastructure",
    title: "RELIABLE\nTELECOM\nINFRASTRUCTURE",
    subtitle: "Comprehensive telecom and communication solutions you can depend on.",
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

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section 
      className="hero" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hero__container">
        
        {/* Left Side: Text Content */}
        <div className="hero__content-side">
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
                className="hero__label"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                — {SLIDES[currentIndex].label}
              </motion.span>
              
              <motion.h1 
                className="hero__title"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
              >
                {SLIDES[currentIndex].title.split('\n').map((line, i) => (
                  <span key={i} className="hero__title-line">{line}</span>
                ))}
              </motion.h1>
              
              <motion.p 
                className="hero__subtitle"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
                }}
              >
                {SLIDES[currentIndex].subtitle}
              </motion.p>
              
              <motion.div 
                className="hero__actions"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
                }}
              >
                <a href={SLIDES[currentIndex].ctaLink} className="hero__cta">
                  <span>{SLIDES[currentIndex].ctaText}</span>
                  <span className="hero__cta-icon"><ChevronRight size={18} /></span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="hero__controls">
            <div className="hero__counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </div>
            <div className="hero__nav-arrows">
              <button onClick={prevSlide} className="hero__nav-btn" aria-label="Previous Slide"><ArrowLeft size={20}/></button>
              <button onClick={nextSlide} className="hero__nav-btn" aria-label="Next Slide"><ArrowRight size={20}/></button>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hero__image-side">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="hero__image-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src={SLIDES[currentIndex].image} 
                alt={SLIDES[currentIndex].title}
                className="hero__image"
                initial={{ scale: 1.0 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 6, ease: "linear" }}
              />
              <div className="hero__image-overlay"></div>
            </motion.div>
          </AnimatePresence>
          
          <div className="hero__progress-bar">
            {SLIDES.map((_, idx) => (
              <div key={idx} className={`hero__progress-dot ${idx === currentIndex ? 'active' : ''}`} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;