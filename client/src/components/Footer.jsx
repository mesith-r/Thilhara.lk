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
      background: '#040810',
      borderTop: '1px solid var(--border-light)',
      padding: '5rem 0 2rem 0',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container">
        {/* Callout Card */}
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(13, 23, 42, 0.95), rgba(7, 13, 25, 0.98))',
          border: '1px solid rgba(0, 210, 255, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          padding: '2.5rem 3rem',
          marginBottom: '5rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <div>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>Project Consultation</span>
            <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>
              Have A Commercial Cooling Project In Mind?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '580px' }}>
              From initial thermal planning to hardware sourcing, our Colombo engineering team is ready to assist.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={onOpenQuote} className="btn-primary" style={{ padding: '0.9rem 2rem' }}>
              Request Proposal
            </button>
            <a href="tel:+94112314355" className="btn-secondary" style={{ padding: '0.9rem 1.75rem' }}>
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
              <div className="brand-logo-icon">
                <Snowflake size={24} color="#ffffff" />
              </div>
              <div>
                <div className="brand-title">THILHARA</div>
                <div className="brand-subtitle">Cooling Solutions Partner</div>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Thilhara Ref & Electricals (Pvt) Limited is a leading Sri Lankan importer and distributor of air conditioners, refrigerator hardware, cold room hardware, and precision diagnostics.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="badge" style={{ fontSize: '0.7rem' }}>
                <Server size={12} /> Go Backend
              </span>
              <span className="badge" style={{ fontSize: '0.7rem' }}>
                <Database size={12} /> PostgreSQL
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>
                <button onClick={() => scrollTo('home')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Home & Overview
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('products')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Products & Spares Catalog
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Services & Cold Room Engineering
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Why Choose Us (25+ Years)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reviews')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Client Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('hours')} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  Business Working Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Hardware Categories */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Product Lines</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li>Commercial Inverter Chillers</li>
              <li>Cold Room Polyurethane Panels</li>
              <li>Copeland & Embraco Compressors</li>
              <li>Refco Swiss Diagnostics & Manifolds</li>
              <li>Eliwell Microprocessor Controllers</li>
              <li>Honeywell Thermostatic Valves</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>84, Union Place, Colombo 02, Sri Lanka.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                <span>+94 11 2314355 / +94 11 2304419</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={18} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                <span>sales@thilhara.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-subtle)'
        }}>
          <div>
            © {new Date().getFullYear()} Thilhara Ref & Electricals (Pvt) Limited. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Original design by Sysflicx IT Solutions</span>
            <span>•</span>
            <span style={{ color: 'var(--accent-cyan)' }}>Modernized Full-Stack React + Go + PostgreSQL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
