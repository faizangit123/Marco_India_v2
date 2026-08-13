import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="about section" id="about" ref={containerRef}>
      <div className="container about__container">
        
        <motion.div 
          className="about__content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="about__label">— ABOUT MARCO INDIA</span>
          <h2 className="about__title">
            WE BUILD THE INFRASTRUCTURE BEHIND MODERN BUSINESS.
          </h2>
          <div className="about__text">
            <p>
              Since 2015, Marco India has been at the forefront of security and connectivity
              infrastructure. We deliver end-to-end solutions that businesses across India rely on every day.
            </p>
            <p>
              Our approach combines cutting-edge technology with hands-on expertise, ensuring that every installation is engineered for reliability and built to scale with your organization's needs.
            </p>
          </div>
          <a href="/about" className="about__link">
            <span>Discover Our Story</span>
            <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div 
          className="about__image-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div style={{ y: y1 }} className="about__image-inner">
            <img 
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80" 
              alt="Telecom Infrastructure" 
              className="about__image"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
