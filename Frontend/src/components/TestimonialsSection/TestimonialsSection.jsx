import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import apiClient from '../../api/client';
import './TestimonialsSection.css';

const CLIENTS = ['Reliance', 'Tata Group', 'Airtel', 'Jio', 'Wipro', 'HCL', 'Infosys', 'Godrej'];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionActive, setSectionActive] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data } = await apiClient.get('/api/testimonials/');
        if (data.active === false) { setSectionActive(false); return; }
        const items = Array.isArray(data) ? data : data.results || [];
        setTestimonials(items);
      } catch {
        setSectionActive(false);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (!sectionActive || (!loading && testimonials.length === 0)) return null;

  const next = () => setActive((a) => (a + 1) % testimonials.length);
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        
        <div className="testimonials__layout">
          <motion.div 
            className="testimonials__left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="testimonials__badge">— TESTIMONIALS</span>
            <h2 className="testimonials__title">WHAT OUR CLIENTS SAY.</h2>
          </motion.div>

          <div className="testimonials__right">
            {loading ? (
              <div className="testimonials__loading"><Loader size={24} className="auth-form__spinner" /></div>
            ) : (
              <div className="testimonials__carousel-wrap">
                <Quote size={48} className="testimonials__quote-mark" strokeWidth={1} />
                
                <div className="testimonials__carousel">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="testimonial__card"
                    >
                      <p className="testimonial__text">"{testimonials[active].text}"</p>
                      <div className="testimonial__author">
                        <strong className="testimonial__name">{testimonials[active].name}</strong>
                        <span className="testimonial__role">{testimonials[active].role}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="testimonials__controls">
                  <button onClick={prev} className="testimonials__nav-btn"><ChevronLeft size={20} /></button>
                  <button onClick={next} className="testimonials__nav-btn"><ChevronRight size={20} /></button>
                </div>
              </div>
            )}
          </div>
        </div>

        <motion.div 
          className="testimonials__clients"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="testimonials__logos">
            {CLIENTS.map((name) => <span key={name} className="testimonials__logo">{name}</span>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
