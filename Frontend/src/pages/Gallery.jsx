import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ZoomIn, Loader } from 'lucide-react';
import apiClient from '../api/client';
import './InnerPage.css';
import './Gallery.css';

const CATEGORIES = ['All', 'CCTV', 'Telecom', 'Signal Boosting', 'Networking', 'Fiber Optic', 'Other'];

const Gallery = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await apiClient.get('/api/gallery/');
        const items = Array.isArray(data) ? data : data.results || [];
        setProjects(items);
      } catch {
        setError('Unable to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <h1 className="page-hero__title">Project <span>Gallery</span></h1>
          <nav className="page-hero__breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Gallery</span>
          </nav>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="inner-section__header">
            <span className="inner-section__badge">Our Work</span>
            <h2 className="inner-section__title">Installations Across <span>India</span></h2>
            <p className="inner-section__subtitle">
              A selection of our completed projects spanning CCTV surveillance, telecom infrastructure, signal boosting, and enterprise networking.
            </p>
          </div>

          <div className="gallery-page__filters">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`gallery-page__filter ${activeFilter === cat ? 'gallery-page__filter--active' : ''}`}
                onClick={() => setActiveFilter(cat)}>{cat}</button>
            ))}
          </div>

          {loading ? (
            <div className="gallery-page__loading"><Loader size={24} className="auth-form__spinner" /> Loading gallery...</div>
          ) : error ? (
            <div className="gallery-page__empty">{error}</div>
          ) : projects.length === 0 ? (
            <div className="gallery-page__empty">No projects to display yet. Check back soon!</div>
          ) : (
            <div className="gallery-page__grid">
              {filtered.map((project, i) => (
                <div key={project.id || i} className="gallery-page__item" onClick={() => setLightbox(project)}>
                  <img src={project.image || project.src} alt={project.title} className="gallery-page__img" loading="lazy" />
                  <div className="gallery-page__item-overlay">
                    <ZoomIn size={24} />
                    <span className="gallery-page__item-title">{project.title}</span>
                    <span className="gallery-page__item-location">{project.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div className="gallery-page__lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery-page__lightbox-close" aria-label="Close"><X size={24} /></button>
          <div className="gallery-page__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.image || lightbox.src} alt={lightbox.title} />
            <div className="gallery-page__lightbox-info">
              <strong>{lightbox.title}</strong>
              <span>{lightbox.location}</span>
              {lightbox.scope && <p>{lightbox.scope}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
