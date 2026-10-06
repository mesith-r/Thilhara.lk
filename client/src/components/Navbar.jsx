import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Snowflake, Phone, Menu, X, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenQuote, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if open in Colombo (UTC+5:30)
    const checkOpenStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const slDate = new Date(utc + (3600000 * 5.5));
      const day = slDate.getDay();
      const hour = slDate.getHours();

      if (day >= 1 && day <= 5) {
        setIsOpenNow(hour >= 9 && hour < 18);
      } else if (day === 6) {
        setIsOpenNow(hour >= 9 && hour < 15);
      } else {
        setIsOpenNow(false);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', id: 'home', path: '/' },
    { label: 'Products & Spares', id: 'products', path: '/products' },
    { label: 'Services & Support', id: 'services', hash: 'services' },
    { label: 'Why Choose Us', id: 'about', hash: 'about' },
    { label: 'Reviews', id: 'reviews', hash: 'reviews' },
    { label: 'Working Hours', id: 'hours', hash: 'hours' },
    { label: 'Contact', id: 'contact', hash: 'contact' },
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);

    if (item.path === '/products') {
      navigate('/products');
      window.scrollTo(0, 0);
      return;
    }

    if (item.path === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    if (item.hash) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(item.hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const element = document.getElementById(item.hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(item.id);
    }
  };

  const isItemActive = (item) => {
    if (item.id === 'products') {
      return location.pathname === '/products';
    }
    if (location.pathname === '/products') {
      return false;
    }
    return activeSection === item.id;
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid var(--border-light)',
        padding: '0.45rem 1rem',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)', fontWeight: 600 }}>
              <ShieldCheck size={15} color="var(--primary-blue)" />
              Pioneer Cooling Partner in Sri Lanka Since 1998
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} color={isOpenNow ? '#059669' : '#d97706'} />
              <span>Colombo Showroom: </span>
              <strong style={{ color: isOpenNow ? '#059669' : '#d97706', fontWeight: 700 }}>
                {isOpenNow ? 'Open Now (09:00 - 18:00)' : 'Closed Now (Opens 09:00 AM)'}
              </strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href="tel:+94112314355" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
              <Phone size={13} color="var(--primary-red)" />
              +94 11 2314355
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="navbar-header" style={{
        boxShadow: scrolled ? '0 10px 25px -5px rgba(0,0,0,0.06)' : 'none',
      }}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="brand-logo" style={{ textDecoration: 'none' }}>
            <div className="brand-logo-icon">
              <Snowflake size={24} color="#ffffff" />
            </div>
            <div>
              <div className="brand-title">THILHARA</div>
              <div className="brand-subtitle">Cooling Solution Partner</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`nav-link ${isItemActive(item) ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onOpenQuote}
              className="btn-primary btn-sm"
            >
              <span>Get a Quote</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem',
                color: 'var(--text-main)',
                border: '1.5px solid var(--border-light)',
                borderRadius: '8px'
              }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: '#ffffff',
            borderBottom: '2px solid var(--primary-blue)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-xl)'
          }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                style={{
                  textAlign: 'left',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: isItemActive(item) ? 'var(--primary-blue)' : 'var(--text-body)',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="btn-primary"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              Request Engineering Quote
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .mobile-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
