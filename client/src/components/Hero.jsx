import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Award, Building2, Zap, Wind, CheckCircle2 } from 'lucide-react';

const slides = [
  {
    title: "Cool Comfort, Premium Products",
    tagline: "Commercial Air Conditioning & Cold Room Systems",
    description: "Discover our extensive range of air conditioners and refrigeration hardware designed to keep your facilities cool and efficient, no matter the season.",
    highlight: "Trusted Sri Lankan Cooling Partner Since 1998"
  },
  {
    title: "The Future of Cool, Under One Roof",
    tagline: "Copeland, LG, Embraco & Refco Swiss Accessories",
    description: "Enhance your cooling setup with top-quality accessories and genuine OEM compressors. Elevate your operational comfort and thermodynamic efficiency.",
    highlight: "100% Genuine Certified Hardware & Spare Parts"
  },
  {
    title: "Cooling Experts, Dedicated World",
    tagline: "Turnkey Cold Storage & Preventative Maintenance",
    description: "Join us for a more comfortable, reliable world. Dedicated to transforming residential, commercial, and industrial spaces with innovative climate solutions.",
    highlight: "Over 1,650+ Industrial Facilities Powered"
  }
];

export default function Hero({ onOpenQuote, onExploreProducts }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section id="home" style={{
      position: 'relative',
      paddingTop: '3.5rem',
      paddingBottom: '5.5rem',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="hero-grid">

          {/* Left Column: Headline & Value Prop */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span className="badge badge-red">
                <Zap size={14} />
                {slide.highlight}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.85rem)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-main)'
            }}>
              {slide.title.split(',')[0]}, <br />
              <span style={{ color: 'var(--primary-blue)' }}>
                {slide.title.split(',')[1] || slide.tagline}
              </span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-body)',
              marginBottom: '2.5rem',
              maxWidth: '620px',
              lineHeight: 1.7
            }}>
              {slide.description}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button
                onClick={onOpenQuote}
                className="btn-primary"
                style={{ padding: '0.95rem 2rem', fontSize: '1rem' }}
              >
                <span>Request Project Quote</span>
                <ArrowRight size={18} />
              </button>

              <Link
                to="/products"
                className="btn-secondary"
                style={{ padding: '0.95rem 1.85rem', textDecoration: 'none' }}
              >
                <span>Browse Products & Spares</span>
              </Link>

              <a
                href="tel:+94112314355"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-blue-light)',
                  border: '1.5px solid rgba(63, 64, 150, 0.25)',
                  color: 'var(--primary-blue)',
                  fontWeight: 700
                }}
              >
                <PhoneCall size={18} color="var(--primary-red)" />
                <span>Call Hotline</span>
              </a>
            </div>

            {/* Slide Navigation Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: currentSlide === idx ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: currentSlide === idx ? 'var(--primary-blue)' : '#cbd5e1',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem', fontWeight: 600 }}>
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Original Thilhara Trust Card */}
          <div>
            <div className="white-card" style={{
              background: '#ffffff',
              border: '2px solid rgba(63, 64, 150, 0.15)',
              boxShadow: 'var(--shadow-xl)',
              padding: '2.5rem 2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary-blue)', fontWeight: 800 }}>
                  Authorized Partner
                </span>
                <span className="badge badge-live">
                  <span className="pulse-dot"></span> Since 1998
                </span>
              </div>

              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.35rem', lineHeight: 1.25, color: 'var(--text-main)' }}>
                Thilhara Ref & Electricals
              </h3>
              <div style={{ color: 'var(--primary-red)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                (Pvt) Limited
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>25+ Years of Industry Leadership</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pioneering Sri Lanka's cooling & refrigeration sector since 1998.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>1,650+ Corporate Client Projects</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sri Lankan Airlines, Galadari Hotel, CBL Foods, Abans & SLBC.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="var(--primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>118+ International Direct Partnerships</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Copeland, LG, Honeywell, Refco Swiss, and Embraco.</p>
                  </div>
                </div>
              </div>

              {/* Metrics Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-light)',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-blue)' }}>25</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Years Active</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-red)' }}>1650+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Clients</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-blue)' }}>118+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
