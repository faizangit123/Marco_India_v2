import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ZoomIn, Loader } from 'lucide-react';
import apiClient from '../api/client';
import './InnerPage.css';
import './Gallery.css';

const CATEGORIES = ['All', 'CCTV', 'Telecom', 'Signal Boosting', 'Networking', 'Fiber Optic', 'Other'];

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const DEFAULT_PROJECTS = [
  {
    id: 'def-1',
    title: 'Commercial Complex HD CCTV Surveillance',
    category: 'CCTV',
    location: 'Jamshedpur, Jharkhand',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
    scope: 'High-definition 4K IP CCTV surveillance network deployed across a multi-tier commercial complex with 24/7 NVR recording.'
  },
  {
    id: 'def-2',
    title: 'Enterprise Server Rack & Structured Cabling',
    category: 'Networking',
    location: 'Ranchi, Jharkhand',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    scope: 'Structured server rack cabling, enterprise firewall configuration, and high-throughput Cat6A routing infrastructure.'
  },
  {
    id: 'def-3',
    title: 'Industrial Optical Fiber Backbone Deployment',
    category: 'Fiber Optic',
    location: 'Bokaro Steel City, Jharkhand',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    scope: 'Low-latency armored single-mode optical fiber installation connecting multi-building industrial manufacturing plants.'
  },
  {
    id: 'def-4',
    title: 'Multi-Band Cellular Signal Booster System',
    category: 'Signal Boosting',
    location: 'Dhanbad, Jharkhand',
    image: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80',
    scope: 'Multi-band enterprise GSM/4G/5G signal booster repeater installation covering 50,000+ sq ft basement and office floors.'
  },
  {
    id: 'def-5',
    title: 'Telecom Tower RF Alignment & Maintenance',
    category: 'Telecom',
    location: 'Patna, Bihar',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    scope: 'Microwave dish realignment, waveguide inspection, line-of-sight optimization, and structural tower safety certification.'
  },
  {
    id: 'def-6',
    title: 'Comprehensive IT Infrastructure AMC Support',
    category: 'Other',
    location: 'Kolkata, West Bengal',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    scope: 'Comprehensive 24/7 AMC monitoring, preventative maintenance, thermal audits, and rapid hardware replacement response.'
  }
];

const Gallery = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [galleryActive, setGalleryActive] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await apiClient.get('/api/gallery/');
        // Handle gallery disabled
        if (data.active === false) {
          setGalleryActive(false);
          setLoading(false);
          return;
        }
        const items = Array.isArray(data) ? data : data.results || [];
        if (items.length > 0) {
          // Fix relative image URLs
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
        // Use default showcase items on network error
        setProjects(DEFAULT_PROJECTS);
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

          {!galleryActive ? (
            <div className="gallery-page__empty">Gallery is currently unavailable. Please check back later.</div>
          ) : loading ? (
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
