import React from 'react';
import { Award, Users, ShieldCheck, Factory, ThumbsUp, Wrench } from 'lucide-react';

export default function WhyChooseUs({ onOpenQuote }) {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'center'
        }} className="about-grid">

          {/* Left Column: Visual stats & experience showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem'
            }}>
              <div className="white-card" style={{ textAlign: 'center', padding: '2rem 1.5rem', border: '1.5px solid var(--border-light)' }}>
                <div style={{
                  fontSize: '3.25rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary-blue)',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  25
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Years of Experience</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pioneering Sri Lanka's cooling industry since 1998</p>
              </div>

              <div className="white-card" style={{
                textAlign: 'center',
                padding: '2rem 1.5rem',
                border: '1.5px solid rgba(238, 51, 56, 0.2)',
                background: '#ffffff'
              }}>
                <div style={{
                  fontSize: '3.25rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary-red)',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  1650+
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Number of Clients</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>From multinational food giants to state corporations</p>
              </div>

              <div className="white-card" style={{ textAlign: 'center', padding: '2rem 1.5rem', border: '1.5px solid var(--border-light)' }}>
                <div style={{
                  fontSize: '3.25rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--primary-blue)',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  118+
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Number of Partnerships</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Direct distributor relationships across the globe</p>
              </div>

              <div className="white-card" style={{ textAlign: 'center', padding: '2rem 1.5rem', border: '1.5px solid var(--border-light)' }}>
                <div style={{
                  fontSize: '3.25rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#059669',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  100%
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Reliability & Quality</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Genuine OEM parts with factory warranty</p>
              </div>
            </div>
          </div>

          {/* Right Column: Original Thilhara Narrative */}
          <div>
            <span className="badge badge-red" style={{ marginBottom: '1rem' }}>
              <Award size={14} />
              Why Choose Us?
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
              Your Trusted Cooling <br />
              <span style={{ color: 'var(--primary-blue)' }}>Experts For 25+ Years</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              As a pioneer in the Sri Lankan market since 1998, <strong>Thilhara Ref and Electricals (Pvt) Limited</strong> has consistently delivered top-notch products and services. With a strong commitment to excellence, we have earned a reputation for reliability and innovation.
            </p>

            <p style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.75, marginBottom: '2rem' }}>
              Our extensive range of premium products, including air conditioning, refrigerant accessories, electrical goods, cold room hardware, and general merchandise, is tailored to meet diverse customer needs. Our air conditioning solutions provide efficient cooling and heating options for both residential and commercial spaces, ensuring year-round comfort.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button onClick={onOpenQuote} className="btn-primary">
                Learn More & Get a Quote
              </button>
              <a href="#contact" className="btn-secondary">
                Contact Our Engineers
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
