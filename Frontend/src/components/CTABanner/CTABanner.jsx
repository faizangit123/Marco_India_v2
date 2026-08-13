import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CTABanner.css';

const CTABanner = () => {
  return (
    <section className="cta-banner">
      <div className="container">
        <motion.div 
          className="cta-banner__content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-banner__title">Ready to start your next project?</h2>
          <p className="cta-banner__subtitle">Connect with our experts to design and deploy enterprise-grade infrastructure tailored to your needs.</p>
          <Link to="/contact" className="cta-banner__btn">
            <span>Get in Touch</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
