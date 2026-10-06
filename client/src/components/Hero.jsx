import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, Award, Zap } from 'lucide-react';

const slides = [
  {
    line1: "Powerful Cooling.",
    line2: "Better Every Day.",
    description: "Discover the latest residential and commercial cooling systems engineered to elevate comfort, optimize energy, and power your world.",
    highlight: "Trusted Sri Lankan Cooling Partner Since 1998"
  },
  {
    line1: "The Future of Cool,",
    line2: "Under One Roof.",
    description: "Smart inverter climate technology and genuine OEM refrigeration hardware from world-renowned engineering partners.",
    highlight: "100% Genuine Certified Hardware & Spare Parts"
  },
  {
    line1: "Cooling Experts,",
    line2: "Dedicated World.",
    description: "Over 25 years of thermodynamic engineering leadership. Powering industrial cold storage, commercial towers, and homes across Sri Lanka.",
    highlight: "Over 1,650+ Corporate Facilities Powered"
  }
];

const trustFeatures = [
  {
    icon: Truck,
    title: "Islandwide Delivery",
    subtitle: "Fast dispatch across Sri Lanka"
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine OEM",
    subtitle: "Authorized brand equipment"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Emergency breakdown service"
  },
  {
    icon: Award,
    title: "Factory Warranty",
    subtitle: "1 Year guaranteed warranty"
  }
];

export default function Hero({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth slide change function
  const goToSlide = (nextIdx) => {
    if (nextIdx === currentSlide) return;
    setIsVisible(false);
    setTimeout(() => {
      setCurrentSlide(nextIdx);
      setIsVisible(true);
    }, 320);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 320);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        background: '#ffffff',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        overflow: 'hidden',
        borderBottom: '1px solid #f1f5f9'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1.25fr)',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="hero-main-layout"
        >

          {/* Left Column: Rotating Smooth Headline, Subtitle, CTAs & 4 Trust Features */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
            
            {/* Smooth Animated Text Content */}
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0px)' : 'translateY(-10px)',
                transition: 'opacity 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 340ms cubic-bezier(0.4, 0, 0.2, 1)',
                minHeight: '230px'
              }}
            >
              {/* Highlight Pill */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'var(--primary-red-light)',
                    color: 'var(--primary-red)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.35rem 0.85rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(238, 51, 56, 0.2)'
                  }}
                >
                  <Zap size={13} />
                  {slide.highlight}
                </span>
              </div>

              {/* Bold 2-Line Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4.6vw, 3.65rem)',
                  lineHeight: 1.12,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#0f172a',
                  marginBottom: '1.15rem',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {slide.line1}<br />
                <span style={{ color: 'var(--primary-blue)' }}>
                  {slide.line2}
                </span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.62,
                  color: '#475569',
                  maxWidth: '520px',
                  marginBottom: '1rem'
                }}
              >
                {slide.description}
              </p>
            </div>

            {/* Slide Navigation Dots (Smooth Pill Indicators) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.85rem', marginTop: '0.5rem' }}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  style={{
                    width: currentSlide === idx ? '34px' : '10px',
                    height: '9px',
                    borderRadius: '5px',
                    background: currentSlide === idx ? 'var(--primary-blue)' : '#cbd5e1',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer'
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', marginLeft: '0.4rem', fontWeight: 600 }}>
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>

            {/* CTA Buttons - Matching Reference Image */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link
                to="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: 'var(--primary-blue)',
                  color: '#ffffff',
                  padding: '0.88rem 2.2rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 20px -4px rgba(63, 64, 150, 0.4)',
                  transition: 'all 0.25s ease',
                  textDecoration: 'none'
                }}
                className="hero-shop-pill-btn"
              >
                <span>SHOP NOW</span>
                <ArrowRight size={17} />
              </Link>

              <button
                onClick={onOpenQuote}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#f8fafc',
                  color: '#0f172a',
                  border: '1.5px solid #e2e8f0',
                  padding: '0.82rem 1.65rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.94rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="hero-quote-pill-btn"
              >
                <span>Request a Quote</span>
              </button>
            </div>

            {/* 4 Trust Features Row - Direct Minimal Strip Aligned Below CTAs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid #f1f5f9'
              }}
              className="hero-trust-grid"
            >
              {trustFeatures.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem'
                    }}
                  >
                    <div style={{
                      color: '#1e293b',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <IconComponent size={20} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.25,
                        marginBottom: '0.2rem'
                      }}>
                        {item.title}
                      </div>
                      <div style={{
                        fontSize: '0.73rem',
                        color: '#64748b',
                        lineHeight: 1.3
                      }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 100% Truly Seamless Ecosystem Showcase */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              userSelect: 'none'
            }}
          >
            <img
              src="/hero-cooling-showcase.png"
              alt="Thilhara Air Conditioning & Climate Ecosystem"
              style={{
                width: '100%',
                maxWidth: '680px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.04))',
                pointerEvents: 'none'
              }}
            />
          </div>

        </div>
      </div>

      <style>{`
        .hero-shop-pill-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -4px rgba(63, 64, 150, 0.5) !important;
          background: #343580 !important;
        }
        .hero-quote-pill-btn:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          transform: translateY(-1px);
        }
        @media (max-width: 1024px) {
          .hero-main-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-trust-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
        @media (max-width: 600px) {
          .hero-trust-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
