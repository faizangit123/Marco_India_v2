import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, Loader } from 'lucide-react';
import apiClient from '../../api/client';
import './GallerySection.css';

const CATEGORIES = ['All', 'CCTV', 'Telecom', 'Signal Boosting', 'Networking', 'Fiber Optic', 'Other'];

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [projects, setProjects] = useState([]);
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
        setProjects(items);
      } catch {
        setGalleryActive(false);
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

  if (!galleryActive || (!loading && projects.length === 0)) return null;

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="gallery section" ref={sectionRef} id="gallery">
      <div className="container">
        <div className={`gallery__header ${isVisible ? 'gallery__header--visible' : ''}`}>
          <span className="gallery__badge">Our Work</span>
          <h2 className="gallery__title">
            Project <span className="gallery__title-accent">Gallery</span>
          </h2>
          <p className="gallery__subtitle">
            A showcase of our installations across India — from CCTV systems to telecom infrastructure.
          </p>
        </div>

        <div className={`gallery__filters ${isVisible ? 'gallery__filters--visible' : ''}`}>
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`gallery__filter ${activeFilter === cat ? 'gallery__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat)}>{cat}</button>
          ))}
        </div>

        {loading ? (
          <div className="gallery__loading"><Loader size={24} className="auth-form__spinner" /></div>
        ) : (
          <div className="gallery__grid">
            {filtered.map((project, i) => (
              <div key={project.id || i} className={`gallery__item ${isVisible ? 'gallery__item--visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }} onClick={() => setLightbox(project)}>
                <img src={project.image || project.src} alt={project.title} className="gallery__img" loading="lazy" />
                <div className="gallery__item-overlay">
                  <ZoomIn size={24} />
                  <span className="gallery__item-title">{project.title}</span>
                  <span className="gallery__item-location">{project.location}</span>
                </div>
              </div>
            ))}
          </div>
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
