import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Snowflake, Phone, Menu, X, Clock, ArrowRight, ShieldCheck, Truck, Headphones, ChevronDown, Search } from 'lucide-react';

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
    { label: 'Products & Spares', id: 'products', path: '/products', hasDropdown: true },
    { label: 'Services & Support', id: 'services', hash: 'services' },
    { label: 'Why Choose Us', id: 'about', hash: 'about' },
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
      {/* Top Banner Notice - Dark Theme Matching Reference Screenshot */}
      <div style={{
        background: '#091124',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.55rem 1rem',
        fontSize: '0.82rem',
        color: '#cbd5e1'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={15} color="#00d2ff" />
            <span>Islandwide Delivery & Logistics Across Sri Lanka</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="top-banner-center">
            <ShieldCheck size={15} color="#00f5d4" />
            <span>100% Genuine OEM Certified Hardware | 25 Years Warranty Trust</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="tel:+94112314355" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#ffffff', fontWeight: 600 }}>
              <Headphones size={14} color="#00d2ff" />
              <span>Need Help? <strong style={{ color: '#00d2ff' }}>+94 11 2314355</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="navbar-header" style={{
        boxShadow: scrolled ? '0 10px 25px -5px rgba(0,0,0,0.06)' : 'none',
        background: '#ffffff',
        borderBottom: '1px solid var(--border-light)'
      }}>
        <div className="container navbar-container" style={{ height: '76px' }}>
          {/* Logo Matching Reference Header */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="brand-logo" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3F4096 0%, #EE3338 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Snowflake size={22} color="#ffffff" />
              </div>
              <div style={{
                fontSize: '1.65rem',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                fontFamily: 'var(--font-heading)',
                lineHeight: 1
              }}>
                THILHARA
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links" style={{ gap: '2rem' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`nav-link ${isItemActive(item) ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.94rem',
                    fontWeight: 600
                  }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && <ChevronDown size={14} style={{ opacity: 0.7 }} />}
                </button>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              to="/products"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                padding: '0.4rem',
                borderRadius: '50%',
                transition: 'color 0.2s'
              }}
              aria-label="Search Catalog"
            >
              <Search size={20} />
            </Link>

            <button
              onClick={onOpenQuote}
              className="btn-primary btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.65rem 1.45rem',
                fontSize: '0.88rem',
                fontWeight: 700
              }}
            >
              <span>Get a Quote</span>
              <ArrowRight size={14} />
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
          .top-banner-center {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
