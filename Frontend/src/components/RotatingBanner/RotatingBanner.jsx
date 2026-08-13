import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './RotatingBanner.css';

const MESSAGES = [
  "🔒 Professional CCTV Installation & Maintenance",
  "🌐 Complete Network Infrastructure Solutions",
  "💡 Fiber Optic & Telecom Infrastructure",
  "📞 Contact Marco India for Your Next Project"
];

const RotatingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="rotating-banner">
      <div className="rotating-banner__content container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="rotating-banner__text"
          >
            {MESSAGES[currentIndex]}
          </motion.div>
        </AnimatePresence>
        <button 
          className="rotating-banner__close" 
          onClick={() => setIsVisible(false)}
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default RotatingBanner;
