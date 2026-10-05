import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Building } from 'lucide-react';

const testimonials = [
  {
    name: "Jeewan Thiloshana",
    company: "CBL Foods International (Pvt) Ltd",
    role: "Senior Supplies Clerk",
    comment: "We have now partnered with Thilhara Ref & Electricals (Pvt) Limited for so many years. We have found them to be professional in every respect and would have no hesitation in recommending their service.",
    rating: 5
  },
  {
    name: "Pahan Gunasekera",
    company: "Sri Lankan Airlines",
    role: "Commercial Procurement Supervisor - General",
    comment: "We appreciate a business that can be counted on for service and integrity all the time. Their technical acumen and component availability are first-rate.",
    rating: 5
  },
  {
    name: "Lakmal Jayasinghe",
    company: "Galadari Hotel Colombo",
    role: "Purchasing Executive",
    comment: "We appreciate how quickly you responded. You were very prompt. We always were treated courteously in person and on the phone. We are very pleased with your service!",
    rating: 5
  },
  {
    name: "Amal Witanachchi",
    company: "Sri Lanka Broadcasting Corporation",
    role: "Purchasing Officer",
    comment: "Installation team was very thorough, professional and completed the job expeditiously. A great job by all engineers at Thilhara.",
    rating: 5
  },
  {
    name: "Lahiru Jayasinghe",
    company: "Abans Electrical (Pvt) Ltd",
    role: "Purchasing Executive",
    comment: "We have dealt with Thilhara Ref & Electricals (Pvt) Ltd for years. We have always been very satisfied with their service. I would highly recommend them.",
    rating: 5
  },
  {
    name: "Chandrasena Liyanage",
    company: "Richard Pieris Distributors",
    role: "Senior Purchasing Executive",
    comment: "I have been doing business with Thilhara Ref & Electricals for years! Great products, reliable OEM supply, and great people. Thank You!",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="reviews" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge">Verified Client Testimonials</span>
          <h2 className="section-title">
            Testimonials of Excellence from <br />
            <span className="gradient-text">Sri Lanka's Corporate Leaders</span>
          </h2>
          <p className="section-subtitle">
            Leading conglomerates, state institutions, and hospitality brands trust Thilhara for mission-critical cooling hardware.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="glass-card" style={{
            padding: '3rem',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(19, 34, 56, 0.9), rgba(11, 20, 36, 0.95))',
            border: '1px solid rgba(0, 210, 255, 0.3)'
          }}>
            <Quote size={48} color="rgba(0, 210, 255, 0.2)" style={{ position: 'absolute', top: '24px', right: '28px' }} />

            {/* Star Rating */}
            <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>

            {/* Comment */}
            <p style={{
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: '#ffffff',
              marginBottom: '2rem',
              fontWeight: 400,
              fontStyle: 'italic'
            }}>
              "{current.comment}"
            </p>

            {/* Reviewer Details */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border-light)'
            }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: '#fff' }}>
                  {current.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Building size={15} />
                  <span>{current.company}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {current.role}
                </div>
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={prev}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-light)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--accent-cyan)',
                    border: 'none',
                    color: '#070d19',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: currentIndex === idx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentIndex === idx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s'
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
