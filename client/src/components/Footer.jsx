import React from 'react';
import { Snowflake, Phone, Mail, MapPin, Heart, Shield, Server, Database } from 'lucide-react';

export default function Footer({ onOpenQuote, setActiveSection }) {
  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      background: 'var(--navy-blue)',
      color: '#ffffff',
      padding: '5rem 0 2rem 0',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container">
        {/* Callout Card (From Original Site CTA: Have Any Project in Mind?) */}
        <div style={{
          background: 'linear-gradient(135deg, #3F4096 0%, #EE3338 100%)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          padding: '2.5rem 3rem',
          marginBottom: '5rem',
          boxShadow: 'var(--shadow-xl)',
          color: '#ffffff'
        }}>
          <div>
            <span style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.2)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem'
            }}>
              Project Consultation
            </span>
            <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem', fontWeight: 800 }}>
              Have Any Cooling Project in Mind?
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', maxWidth: '580px' }}>
              Ready to make your cooling project a reality? Our team is one call away.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenQuote}
              style={{
                padding: '0.95rem 2rem',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                color: 'var(--primary-blue)',
                fontWeight: 800,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
              }}
            >
              Get a Proposal
            </button>
            <a
              href="tel:+94112314355"
              style={{
                padding: '0.95rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 0, 0, 0.25)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                border: '1.5px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              Call +94 11 2314355
            </a>
          </div>
        </div>

        {/* Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-logo-icon" style={{ background: '#ffffff', color: 'var(--primary-blue)' }}>
                <Snowflake size={24} color="var(--primary-blue)" />
              </div>
              <div>
                <div className="brand-title" style={{ color: '#ffffff' }}>THILHARA</div>
                <div className="brand-subtitle" style={{ color: 'var(--primary-red)' }}>Cooling Solution Partner</div>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Thilhara Ref & Electricals (Pvt) Limited is a leading Air Conditioners and Refrigerator spare parts and Accessories Company in Sri Lanka since 1998.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#93c5fd',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Server size={12} /> Go Backend
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#93c5fd',
                padding: '0.3rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <Database size={12} /> PostgreSQL
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff', borderBottom: '2px solid var(--primary-red)', display: 'inline-block', paddingBottom: '0.25rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <li>
                <button onClick={() => scrollTo('home')} style={{ color: '#cbd5e1', fontSize: '0.92rem', cursor: 'pointer' }}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('products')} style={{ color: '#cbd5e1', fontSize: '0.92rem', cursor: 'pointer' }}>
                  Products & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} style={{ color: '#cbd5e1', fontSize: '0.92rem', cursor: 'pointer' }}>
                  Service & Support
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} style={{ color: '#cbd5e1', fontSize: '0.92rem', cursor: 'pointer' }}>
                  About Us (Why Choose Us)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reviews')} style={{ color: '#cbd5e1', fontSize: '0.92rem', cursor: 'pointer' }}>
                  Client Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('hours')} style={{ color: '#cbd5e1', fontSize: '0.92rem', cursor: 'pointer' }}>
                  Working Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Hardware Categories */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff', borderBottom: '2px solid var(--primary-red)', display: 'inline-block', paddingBottom: '0.25rem' }}>
              Products & Spares
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.92rem', marginTop: '0.5rem' }}>
              <li>Commercial Air Conditioning</li>
              <li>Cold Room Panels & Doors</li>
              <li>Compressors & Fan Motors</li>
              <li>Refco Swiss Manifolds & Telemetry</li>
              <li>Eliwell Microprocessor Controllers</li>
              <li>Filter Driers, Valves & Fittings</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff', borderBottom: '2px solid var(--primary-red)', display: 'inline-block', paddingBottom: '0.25rem' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--primary-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>84, Union Place, Colombo 02, Sri Lanka.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
                <span>+94 11 2314355 / +94 11 2304419</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="var(--primary-red)" style={{ flexShrink: 0 }} />
                <span>sales@thilhara.lk / thilhara@sltnet.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Preserved from Original Site) */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#94a3b8'
        }}>
          <div>
            Copyright &copy; {new Date().getFullYear()} Thilhara Ref & Electricals (Pvt) Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Original website by <strong style={{ color: '#fff' }}>Sysflicx IT Solutions</strong></span>
            <span>•</span>
            <span style={{ color: 'var(--primary-red)' }}>Modernized Full-Stack Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
