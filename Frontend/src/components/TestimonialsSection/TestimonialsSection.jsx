import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import apiClient from '../../api/client';
import './TestimonialsSection.css';

const CLIENTS = ['Reliance', 'Tata Group', 'Airtel', 'Jio', 'Wipro', 'HCL', 'Infosys', 'Godrej'];

const StarRating = ({ rating }) => (
  <div className="testimonial__stars">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={14} className={i < rating ? 'testimonial__star--filled' : 'testimonial__star--empty'} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionActive, setSectionActive] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    if (!isVisible || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isVisible, testimonials.length]);

  if (!sectionActive || (!loading && testimonials.length === 0)) return null;

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className="testimonials section" ref={sectionRef} id="testimonials">
      <div className="container">
        <div className={`testimonials__header ${isVisible ? 'testimonials__header--visible' : ''}`}>
          <span className="testimonials__badge">Testimonials</span>
          <h2 className="testimonials__title">
            What Our <span className="testimonials__title-accent">Clients Say</span>
          </h2>
        </div>

        {loading ? (
          <div className="gallery__loading"><Loader size={24} className="auth-form__spinner" /></div>
        ) : (
          <>
            <div className={`testimonials__carousel ${isVisible ? 'testimonials__carousel--visible' : ''}`}>
              <button className="testimonials__nav testimonials__nav--prev" onClick={prev} aria-label="Previous testimonial">
                <ChevronLeft size={20} />
              </button>
              <div className="testimonials__track">
                {testimonials.map((t, i) => (
                  <div key={t.id || i} className={`testimonial__card ${i === active ? 'testimonial__card--active' : ''}`}>
                    <Quote size={28} className="testimonial__quote-icon" />
                    <p className="testimonial__text">{t.text}</p>
                    <StarRating rating={t.rating} />
                    <div className="testimonial__author">
                      <div className="testimonial__avatar">{(t.name || 'U').charAt(0)}</div>
                      <div>
                        <strong className="testimonial__name">{t.name}</strong>
                        <span className="testimonial__role">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="testimonials__nav testimonials__nav--next" onClick={next} aria-label="Next testimonial">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setActive(i)} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
          </>
        )}

        <div className={`testimonials__clients ${isVisible ? 'testimonials__clients--visible' : ''}`}>
          <p className="testimonials__clients-label">Trusted by leading brands across India</p>
          <div className="testimonials__logos">
            {CLIENTS.map((name) => <span key={name} className="testimonials__logo">{name}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
