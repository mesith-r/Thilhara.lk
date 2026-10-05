import React, { useState, useEffect } from 'react';
import { ArrowRight, PhoneCall, Award, Building2, Zap, Wind, CheckCircle2 } from 'lucide-react';

const slides = [
  {
    title: "Cool Comfort, Pure Reliability",
    tagline: "Industrial Cold Rooms & Commercial VRF Systems",
    description: "Discover our extensive range of air conditioning units, cold store panels, and refrigeration components designed to sustain peak efficiency in any climate.",
    highlight: "25+ Years Of Trusted Sri Lankan Engineering"
  },
  {
    title: "World-Class Refrigeration Parts",
    tagline: "Copeland, Embraco, LG & Refco Swiss Under One Roof",
    description: "Equipping Sri Lankan hospitality, food processing, logistics, and marine enterprises with genuine OEM compressors, valves, and precision HVAC instruments.",
    highlight: "100% Genuine Certified Hardware"
  },
  {
    title: "Round-the-Clock Engineering Support",
    tagline: "Preventative Maintenance & Rapid Turnaround Repairs",
    description: "From turnkey cold room installation to emergency chiller servicing, our factory-trained technical staff guarantee zero costly downtime for your operations.",
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
      paddingTop: '4rem',
      paddingBottom: '6rem',
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span className="badge">
                <Zap size={14} />
                {slide.highlight}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              fontWeight: 800
            }}>
              {slide.title.split(',')[0]}, <br />
              <span className="gradient-text">{slide.title.split(',')[1] || slide.tagline}</span>
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-muted)',
              marginBottom: '2.5rem',
              maxWidth: '620px',
              lineHeight: 1.6
            }}>
              {slide.description}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <button
                onClick={onOpenQuote}
                className="btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
              >
                <span>Request Project Quote</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onExploreProducts}
                className="btn-secondary"
                style={{ padding: '1rem 1.85rem' }}
              >
                <span>View Products Catalog</span>
              </button>

              <a
                href="tel:+94112314355"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 210, 255, 0.08)',
                  border: '1px solid rgba(0, 210, 255, 0.25)',
                  color: 'var(--accent-cyan)',
                  fontWeight: 600
                }}
              >
                <PhoneCall size={18} />
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
                    background: currentSlide === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', marginLeft: '0.5rem' }}>
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Trust Card / Quick Spec Overview */}
          <div>
            <div className="glass-card" style={{
              background: 'linear-gradient(145deg, rgba(19, 34, 56, 0.85), rgba(11, 20, 36, 0.95))',
              border: '1px solid rgba(0, 210, 255, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 210, 255, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  Engineering Benchmark
                </span>
                <span className="badge badge-live">
                  <span className="pulse-dot"></span> Verified Pioneer
                </span>
              </div>

              <h3 style={{ fontSize: '1.65rem', marginBottom: '1rem', lineHeight: 1.25 }}>
                Thilhara Ref & Electricals <br />
                <span style={{ color: 'var(--accent-cyan)', fontSize: '1.25rem', fontWeight: 600 }}>
                  (Pvt) Limited
                </span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#00f5d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>25+ Years Industry Leadership</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Established in 1998, powering the island's premier commercial cold chains.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#00f5d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>1,650+ Corporate Client Projects</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hotels, aviation catering, supermarkets, healthcare & factories.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={20} color="#00f5d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#fff' }}>118+ International Direct Partnerships</strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Direct distributor for Copeland, Embraco, Refco, LG, and Honeywell.</p>
                  </div>
                </div>
              </div>

              {/* Metrics Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-light)',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>25</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Years Active</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>1650+</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Key Clients</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00f5d4' }}>100%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OEM Parts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-templateColumns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
