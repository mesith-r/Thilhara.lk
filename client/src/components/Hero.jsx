import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, Award } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
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

  return (
    <section style={{
      position: 'relative',
      background: '#ffffff',
      paddingTop: '2.5rem',
      paddingBottom: '2.5rem',
      overflow: 'hidden',
      borderBottom: '1px solid #f1f5f9'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: '2.5rem',
          alignItems: 'center'
        }} className="hero-layout-grid">

          {/* Left Column: Heading, Subtext, CTA Button & 4 Trust Features */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Bold Headline */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)',
              lineHeight: 1.12,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0f172a',
              marginBottom: '1rem',
              fontFamily: 'var(--font-heading)'
            }}>
              Powerful Cooling.<br />
              <span style={{ color: 'var(--primary-blue)' }}>
                Better Every Day.
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1.08rem',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '520px',
              marginBottom: '1.75rem'
            }}>
              Discover the latest commercial cooling systems and genuine refrigeration equipment designed to simplify your operations and power your world.
            </p>

            {/* CTA Button Group */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
              <Link
                to="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: 'var(--primary-blue)',
                  color: '#ffffff',
                  padding: '0.85rem 2.15rem',
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
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
                  padding: '0.8rem 1.6rem',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="hero-quote-pill-btn"
              >
                <span>Request a Quote</span>
              </button>
            </div>

            {/* 4 Trust Features Row - Matching Reference Screenshot */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid #f1f5f9'
            }} className="hero-trust-grid">
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

          {/* Right Column: Clean Studio Product Arrangement Showcase */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#f8fafc',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.08)'
            }}>
              <img
                src="/hero-cooling-showcase.jpg"
                alt="Thilhara Cooling Equipment & Precision Instrumentation Showcase"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  transform: 'scale(1.01)',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Floating Quality Tag */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(8px)',
                padding: '0.45rem 0.95rem',
                borderRadius: '50px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--primary-red)'
                }}></span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>
                  Direct OEM Certified
                </span>
              </div>
            </div>
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
          .hero-layout-grid {
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
