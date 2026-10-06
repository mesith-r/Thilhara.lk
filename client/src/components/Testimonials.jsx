import React, { useState } from 'react';
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
          <span className="badge">Client Testimonials</span>
          <h2 className="section-title">
            Testimonials of Excellence <br />
            <span style={{ color: 'var(--primary-blue)' }}>From Sri Lanka's Industry Leaders</span>
          </h2>
          <p className="section-subtitle">
            Leading conglomerates, state institutions, and hospitality brands trust Thilhara for mission-critical cooling hardware.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="white-card" style={{
            padding: '3rem',
            position: 'relative',
            background: '#ffffff',
            border: '2px solid rgba(63, 64, 150, 0.15)',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <Quote size={54} color="var(--primary-blue-light)" style={{ position: 'absolute', top: '24px', right: '28px', opacity: 0.8 }} />

            {/* Star Rating */}
            <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>

            {/* Comment */}
            <p style={{
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: 'var(--text-main)',
              marginBottom: '2rem',
              fontWeight: 500,
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
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--text-main)' }}>
                  {current.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-blue)', fontSize: '0.92rem', fontWeight: 700 }}>
                  <Building size={16} />
                  <span>{current.company}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {current.role}
                </div>
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={prev}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#f8fafc',
                    border: '1.5px solid var(--border-light)',
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--primary-blue)',
                    border: 'none',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 14px rgba(63, 64, 150, 0.3)'
                  }}
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: currentIndex === idx ? '26px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentIndex === idx ? 'var(--primary-blue)' : '#cbd5e1',
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
