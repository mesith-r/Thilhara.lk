import React from 'react';
import { Zap, Snowflake, Globe, Shield, Gauge, Cpu } from 'lucide-react';

const pillars = [
  {
    icon: Zap,
    tag: "Energy Optimization",
    title: "Ultra Power Saving",
    desc: "Next-generation inverter technology & optimized thermo-dynamics reduce electricity overheads by up to 45% compared to legacy cooling systems.",
    highlight: "Up to 45% Energy Reduction",
    color: "#00d2ff"
  },
  {
    icon: Snowflake,
    tag: "High Thermodynamic Duty",
    title: "Hyper Cooling Output",
    desc: "Engineered for harsh tropical humidity and extreme thermal loads. Provides rapid pulldown times for blast freezers, cold rooms, and commercial halls.",
    highlight: "Sub-Zero Rapid Pulldown",
    color: "#00f5d4"
  },
  {
    icon: Globe,
    tag: "Global Certified Ecosystem",
    title: "Universal Brands",
    desc: "Direct supply agreements with world industry giants: Copeland, Embraco, LG, Honeywell, and Refco Swiss. 100% factory warrantied authentic parts.",
    highlight: "118+ Global Partnerships",
    color: "#3a86ff"
  }
];

export default function FeaturePillars() {
  return (
    <section style={{
      padding: '2rem 0 5rem 0',
      position: 'relative',
      zIndex: 2
    }}>
      <div className="container">
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
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: `2px solid ${p.color}`
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
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: `rgba(${idx === 0 ? '0, 210, 255' : idx === 1 ? '0, 245, 212' : '58, 134, 255'}, 0.15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: p.color
                    }}>
                      <Icon size={24} />
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--text-muted)'
                    }}>
                      {p.tag}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: '#fff' }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
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
