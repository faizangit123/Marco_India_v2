import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, Loader } from 'lucide-react';
import apiClient from '../../api/client';
import './GallerySection.css';

const CATEGORIES = ['All', 'CCTV', 'Telecom', 'Signal Boosting', 'Networking', 'Fiber Optic', 'Other'];

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const DEFAULT_PROJECTS = [
  {
    id: 'def-1',
    title: 'Commercial Complex HD CCTV Surveillance',
    category: 'CCTV',
    location: 'Jamshedpur, Jharkhand',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80'
  },
  {
    id: 'def-2',
    title: 'Enterprise Server Rack & Structured Cabling',
    category: 'Networking',
    location: 'Ranchi, Jharkhand',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80'
  },
  {
    id: 'def-3',
    title: 'Industrial Optical Fiber Backbone Deployment',
    category: 'Fiber Optic',
    location: 'Bokaro Steel City, Jharkhand',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80'
  },
  {
    id: 'def-4',
    title: 'Multi-Band Cellular Signal Booster System',
    category: 'Signal Boosting',
    location: 'Dhanbad, Jharkhand',
    image: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80'
  },
  {
    id: 'def-5',
    title: 'Telecom Tower RF Alignment & Maintenance',
    category: 'Telecom',
    location: 'Patna, Bihar',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'
  },
  {
    id: 'def-6',
    title: 'Comprehensive IT Infrastructure AMC Support',
    category: 'Other',
    location: 'Kolkata, West Bengal',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'
  }
];

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [galleryActive, setGalleryActive] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await apiClient.get('/api/gallery/');
        if (data.active === false) {
          setGalleryActive(false);
          return;
        }
        const items = Array.isArray(data) ? data : data.results || [];
        if (items.length > 0) {
          const fixed = items.map(item => ({
            ...item,
            image: item.image && !item.image.startsWith('http')
              ? `${API_BASE}${item.image}`
              : item.image
          }));
          setProjects(fixed);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch {
        setProjects(DEFAULT_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  if (!galleryActive) return null;

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="gallery section" ref={sectionRef} id="gallery">
      <div className="container">
        <motion.div 
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="gallery__badge">Our Work</span>
          <h2 className="gallery__title">
            Project <span className="gallery__title-accent">Gallery</span>
          </h2>
          <p className="gallery__subtitle">
            A showcase of our installations across India — from CCTV systems to telecom infrastructure.
          </p>
        </motion.div>

        <div className={`gallery__filters ${isVisible ? 'gallery__filters--visible' : ''}`}>
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`gallery__filter ${activeFilter === cat ? 'gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat)}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <div className="gallery__loading"><Loader size={24} className="auth-form__spinner" /></div>
        ) : (
          <motion.div 
            className="gallery__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filtered.map((project, i) => (
              <motion.div 
                key={project.id || i} 
                className="gallery__item"
                onClick={() => setLightbox(project)}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                }}
              >
                <img src={project.image || project.src} alt={project.title} className="gallery__img" loading="lazy" />
                <div className="gallery__item-overlay">
                  <ZoomIn size={24} />
                  <span className="gallery__item-title">{project.title}</span>
                  <span className="gallery__item-location">{project.location}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery__lightbox-close" aria-label="Close lightbox"><X size={24} /></button>
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image || lightbox.src} alt={lightbox.title} />
            <div className="gallery__lightbox-info">
              <strong>{lightbox.title}</strong>
              <span>{lightbox.location} · {lightbox.category}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
