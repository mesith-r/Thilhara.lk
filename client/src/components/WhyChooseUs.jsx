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
              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--accent-cyan)',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  25
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Years of Excellence</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pioneering Sri Lanka's cooling industry since 1998</p>
              </div>

              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(19, 34, 56, 0.8))' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#00f5d4',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  1,650+
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Corporate Clients</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From multinational food giants to premier airlines</p>
              </div>

              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#3a86ff',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  118+
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Global Partners</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct brand distribution and component supply</p>
              </div>

              <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-heading)',
                  color: '#f59e0b',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}>
                  100%
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Quality Assurance</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Authentic manufacturer serials & factory testing</p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div>
            <span className="badge" style={{ marginBottom: '1rem' }}>
              <Award size={14} />
              Heritage of Trust
            </span>

            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Your Trusted Cooling <br />
              <span className="gradient-text">Experts For 25+ Years</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              As a pioneer in the Sri Lankan market since 1998, <strong>Thilhara Ref & Electricals (Pvt) Limited</strong> has consistently delivered top-notch cooling hardware and engineering services. With an unwavering commitment to operational excellence, we have earned a lasting reputation for reliability, speed, and precision.
            </p>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Our extensive inventory encompasses residential and commercial air conditioning, refrigerant gases, cold room hardware, walk-in chiller panels, evaporators, and genuine spare parts. Whether building cold storage from scratch or sourcing hard-to-find compressor valves, our engineering wing delivers every time.
            </p>

            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              <button onClick={onOpenQuote} className="btn-primary">
                Consult With An Engineer
              </button>
              <a href="#contact" className="btn-secondary">
                Visit Our Colombo Center
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
