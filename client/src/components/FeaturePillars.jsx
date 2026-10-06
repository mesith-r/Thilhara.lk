import React from 'react';
import { Zap, Snowflake, Globe, Shield, Gauge, Cpu } from 'lucide-react';

const pillars = [
  {
    icon: Zap,
    tag: "Energy Optimization",
    title: "Ultra Power Saving",
    desc: "Next-generation inverter technology & optimized thermo-dynamics reduce electricity overheads by up to 45% compared to legacy cooling systems.",
    highlight: "Up to 45% Energy Reduction",
    color: "#3F4096",
    bgTint: "var(--primary-blue-light)"
  },
  {
    icon: Snowflake,
    tag: "High Thermodynamic Duty",
    title: "Hyper Cooling Output",
    desc: "Engineered for harsh tropical humidity and extreme thermal loads. Provides rapid pulldown times for blast freezers, cold rooms, and commercial halls.",
    highlight: "Sub-Zero Rapid Pulldown",
    color: "#EE3338",
    bgTint: "var(--primary-red-light)"
  },
  {
    icon: Globe,
    tag: "Global Certified Ecosystem",
    title: "Universal Brands",
    desc: "Direct supply agreements with world industry giants: Copeland, Embraco, LG, Honeywell, and Refco Swiss. 100% factory warrantied authentic parts.",
    highlight: "118+ Global Partnerships",
    color: "#1b1c4b",
    bgTint: "#f1f5f9"
  }
];

export default function FeaturePillars() {
  return (
    <section style={{
      padding: '1.5rem 0 5rem 0',
      position: 'relative',
      zIndex: 2,
      background: '#ffffff'
    }}>
      <div className="container">
        {/* Signature Brand Highlight Bar (Adapted from Original Site's Mid-Hero) */}
        <div style={{
          background: 'linear-gradient(125deg, #3F4096 0%, #EE3338 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2.5rem',
          color: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)'
            }}>
              Thilhara Standard
            </span>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '0.4rem', fontWeight: 700 }}>
              Engineered For Industrial Performance & Reliability
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>100%</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>OEM Certified</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>24/7</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Support Hotline</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>Islandwide</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Rapid Dispatch</div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="white-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `4px solid ${p.color}`,
                  background: '#ffffff'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: p.bgTint,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: p.color
                    }}>
                      <Icon size={26} />
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)'
                    }}>
                      {p.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: p.color
                }}>
                  <Shield size={16} />
                  <span>{p.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
