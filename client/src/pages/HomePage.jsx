import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturePillars from '../components/FeaturePillars';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import WorkingHours from '../components/WorkingHours';
import Testimonials from '../components/Testimonials';
import PartnersMarquee from '../components/PartnersMarquee';
import ContactSection from '../components/ContactSection';
import { ArrowRight, Package, Star, CheckCircle, ShieldCheck } from 'lucide-react';

const featuredItems = [
  {
    name: "THD Series High Efficiency Evaporator",
    brand: "Thilhara Engineering",
    category: "Cold Room Hardware",
    rating: 4.9,
    description: "Designed specifically for industrial cold rooms, walk-in chillers, and blast freezing facilities.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Copeland Scroll Commercial Inverter Compressor",
    brand: "Copeland",
    category: "Compressors & Motors",
    rating: 5.0,
    description: "World-renowned Copeland Scroll reliability engineered for commercial refrigeration and climate cooling.",
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Refco Digital Smart Manifold Gauge Set",
    brand: "Refco Swiss",
    category: "Tools & Equipment",
    rating: 5.0,
    description: "Swiss-crafted 4-way wireless digital manifold system featuring high-precision pressure transducers.",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Eliwell Cold Room Electronic Controller",
    brand: "Eliwell",
    category: "Valves & Controls",
    rating: 4.7,
    description: "Microprocessor based controller with 3 relay outputs for compressor, defrost, and fan control.",
    imageUrl: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80"
  }
];

export default function HomePage({ onOpenQuote }) {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        onOpenQuote={() => onOpenQuote()}
        onExploreProducts={() => {
          // Handled via Link in Hero or direct navigation
        }}
      />

      {/* Core Engineering Value Pillars */}
      <FeaturePillars />

      {/* Featured Products & Spares Teaser */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div>
              <span className="badge">
                <Package size={14} /> Featured Hardware
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', color: 'var(--text-main)', marginTop: '0.75rem', fontWeight: 800 }}>
                Products & <span style={{ color: 'var(--primary-blue)' }}>Spare Parts</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', marginTop: '0.4rem' }}>
                Discover our extensive inventory of genuine compressors, evaporators, controllers, and diagnostic gear.
              </p>
            </div>

            <Link
              to="/products"
              className="btn-primary"
              style={{ padding: '0.85rem 1.85rem', textDecoration: 'none' }}
            >
              <span>View Full Products Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* 4 Featured Products Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {featuredItems.map((item, idx) => (
              <div
                key={idx}
                className="white-card"
                style={{
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1.5px solid var(--border-light)'
                }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{
                      background: '#ffffff',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--primary-blue)',
                      boxShadow: 'var(--shadow-xs)'
                    }}>
                      {item.brand}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.25rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#d97706'
                  }}>
                    <Star size={12} fill="#d97706" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--primary-red)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      {item.category}
                    </div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.65rem', color: 'var(--text-main)', lineHeight: 1.35 }}>
                      {item.name}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {item.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle size={14} /> In Stock
                    </span>
                    <Link
                      to="/products"
                      style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Catalog Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #ececf7 100%)',
            border: '2px solid rgba(63, 64, 150, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: 800 }}>
                Looking For Specific Replacement Parts Or Cold Room Sizing?
              </h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Browse our complete catalog with search, category filtering, and direct technical data sheets.
              </p>
            </div>
            <Link
              to="/products"
              className="btn-blue"
              style={{ padding: '0.85rem 1.85rem', textDecoration: 'none' }}
            >
              <span>Go to Products Page</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services & Support Section */}
      <ServicesSection onOpenQuote={() => onOpenQuote()} />

      {/* Why Choose Us Section */}
      <WhyChooseUs onOpenQuote={() => onOpenQuote()} />

      {/* Working Hours Section */}
      <WorkingHours />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Strategic Partners */}
      <PartnersMarquee />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
