import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Star, CheckCircle, ArrowRight, Layers, SlidersHorizontal, Package, PhoneCall, ShieldCheck } from 'lucide-react';

const allProductsData = [
  {
    id: 1,
    name: "THD Series High Efficiency Evaporator",
    slug: "thd-series-high-efficiency-evaporator",
    categoryGroup: "Cold Room Hardware",
    categoryName: "Cold Room & Evaporators",
    categorySlug: "cold-room",
    brand: "Thilhara Engineering",
    model: "THD-450X",
    description: "Designed specifically for industrial cold rooms, walk-in chillers, and blast freezing facilities. Features aerodynamically engineered fan louvers for maximum airflow reach.",
    specs: {
      "Cooling Capacity": "14.5 kW",
      "Refrigerant": "R404A / R507 / R448A",
      "Fin Spacing": "7.0 mm",
      "Defrost Type": "Electric Heating Elements",
      "Voltage": "380V / 3Ph / 50Hz"
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "TFE Series Compact Ceiling Evaporator",
    slug: "tfe-series-compact-ceiling-evaporator",
    categoryGroup: "Cold Room Hardware",
    categoryName: "Cold Room & Evaporators",
    categorySlug: "cold-room",
    brand: "Thilhara Engineering",
    model: "TFE-220C",
    description: "Ultra low-profile dual-discharge ceiling mounted evaporator unit suitable for catering refrigerators, cold rooms with low clearance, and wine cellars.",
    specs: {
      "Cooling Capacity": "5.2 kW",
      "Air Flow": "2,100 m3/h",
      "Noise Level": "42 dB(A)",
      "Casing": "Powder-coated Aluminum"
    },
    inStock: true,
    rating: 4.8,
    reviewsCount: 22,
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Copeland Scroll Commercial Inverter Compressor",
    slug: "copeland-scroll-commercial-inverter-compressor",
    categoryGroup: "Compressors & Motors",
    categoryName: "Compressors & Motors",
    categorySlug: "compressors",
    brand: "Copeland",
    model: "ZB45KQE-TFD",
    description: "World-renowned Copeland Scroll reliability engineered for medium-to-high temperature commercial refrigeration and climate cooling applications.",
    specs: {
      "Horsepower": "6.0 HP",
      "Displacement": "17.1 m3/h",
      "Refrigerant": "R404A, R134a, R407C",
      "Efficiency": "Ultra High COP"
    },
    inStock: true,
    rating: 5.0,
    reviewsCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Embraco Aspera Hermetic Refrigeration Compressor",
    slug: "embraco-aspera-hermetic-compressor",
    categoryGroup: "Compressors & Motors",
    categoryName: "Compressors & Motors",
    categorySlug: "compressors",
    brand: "Embraco",
    model: "NEK6214GK",
    description: "High performance hermetic reciprocating compressor for light commercial display coolers, beverage dispensers, and supermarket freezers.",
    specs: {
      "Application": "Medium / High Back Pressure",
      "Power": "1/2 HP",
      "Motor Type": "CSIR",
      "Voltage": "220-240V 50Hz"
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Refco Digital Smart Manifold Gauge Set",
    slug: "refco-digital-smart-manifold-gauge-set",
    categoryGroup: "Tools & Equipment",
    categoryName: "HVAC Tools & Equipment",
    categorySlug: "tools-equipment",
    brand: "Refco Swiss",
    model: "REFMATE-4",
    description: "Swiss-crafted 4-way wireless digital manifold system featuring high-precision pressure transducers, micron vacuum gauge, and Bluetooth telemetry.",
    specs: {
      "Origin": "Switzerland",
      "Sensors": "Pressure & Temperature Dual",
      "Gas Library": "Over 80 Pre-loaded Refrigerants",
      "Protection": "IP54 Ruggedized"
    },
    inStock: true,
    rating: 5.0,
    reviewsCount: 31,
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Eliwell Cold Room Electronic Controller",
    slug: "eliwell-cold-room-electronic-controller",
    categoryGroup: "Refrigerant Valves & Controls",
    categoryName: "Refrigerant Valves & Fittings",
    categorySlug: "valves-fittings",
    brand: "Eliwell",
    model: "IDPlus 974",
    description: "Microprocessor based controller with 3 relay outputs for compressor, defrost, and fan control. Direct NTC and PTC sensor compatibility.",
    specs: {
      "Display": "3 Digits LED with Signs",
      "Power": "230V AC",
      "Outputs": "Compressor (2HP), Defrost (8A), Fan (5A)",
      "Connectivity": "Modbus Compatible"
    },
    inStock: true,
    rating: 4.7,
    reviewsCount: 19,
    imageUrl: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Honeywell Thermostatic Expansion Valve",
    slug: "honeywell-thermostatic-expansion-valve",
    categoryGroup: "Refrigerant Valves & Controls",
    categoryName: "Refrigerant Valves & Fittings",
    categorySlug: "valves-fittings",
    brand: "Honeywell",
    model: "TMVBL Series",
    description: "Precision modulating valve for regulating liquid refrigerant injection into evaporators with interchangeable orifices.",
    specs: {
      "Material": "Forged Brass Body",
      "Connection": "Oiled Solder / Flare",
      "Max Pressure": "35 bar",
      "Capillary Tube": "1.5m stainless steel"
    },
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Heavy Duty Dual-Stage HVAC Vacuum Pump",
    slug: "heavy-duty-dual-stage-hvac-vacuum-pump",
    categoryGroup: "Tools & Equipment",
    categoryName: "HVAC Tools & Equipment",
    categorySlug: "tools-equipment",
    brand: "Thilhara Pro",
    model: "VP-280DS",
    description: "Deep vacuum recovery pump capable of pulling down to 15 microns. Integrated solenoid check valve prevents oil backflow.",
    specs: {
      "Flow Rate": "12 CFM (340 L/min)",
      "Vacuum Level": "15 Microns Ultimate",
      "Motor": "3/4 HP Induction Motor",
      "Oil Capacity": "650 ml"
    },
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80"
  }
];

import syncedProductsData from '../data/products.json';

const allCategoriesList = [
  { name: "All Categories", slug: "all" },
  { name: "Air Condition Accessories", slug: "air-condition-accessories" },
  { name: "Cold Room Accessories", slug: "cold-room-accessories" },
  { name: "Coldroom panel & door", slug: "coldroom-panel-and-door" },
  { name: "Reciever", slug: "reciever" },
  { name: "Copper Fitting", slug: "copper-fitting" },
  { name: "Filter Driers", slug: "filter-driers" },
  { name: "Oil Separators", slug: "oil-separators" },
  { name: "Axial Fan Motor", slug: "axial-fan-motor" },
  { name: "Compressor", slug: "compressor" },
  { name: "Vacum Pump", slug: "vacum-pump" },
  { name: "Valves", slug: "valves" },
  { name: "Pressure Controls", slug: "pressure-controls" },
  { name: "Sight Glasses", slug: "sight-glasses" },
  { name: "Capacitors", slug: "capacitors" },
  { name: "Tools and Equipment", slug: "tools-and-equipment" },
  { name: "Other Accessories", slug: "other-accessories" }
];

export default function ProductsPage({ onOpenQuote }) {
  const [products, setProducts] = useState(syncedProductsData && syncedProductsData.length > 0 ? syncedProductsData : allProductsData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch live items from Go API if running
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setProducts(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === "all" ||
      (p.categorySlug && p.categorySlug.includes(selectedCategory)) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(selectedCategory.replace('-', ' ')));

    const matchesSearch = searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.model && p.model.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '1.5rem', paddingBottom: '6rem' }}>
      {/* Sub-Hero Breadcrumb Header */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ececf7 100%)',
        borderBottom: '1px solid var(--border-light)',
        padding: '3rem 0',
        marginBottom: '3.5rem'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
            <Link to="/" style={{ color: 'var(--primary-blue)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-main)' }}>Products & Accessories</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>
                <Package size={14} /> Official Hardware Catalog
              </span>
              <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', color: 'var(--text-main)', lineHeight: 1.15, fontWeight: 800 }}>
                Products & <span style={{ color: 'var(--primary-blue)' }}>Accessories</span>
              </h1>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', maxWidth: '650px', marginTop: '0.75rem', lineHeight: 1.6 }}>
                Step into the world of comfort and engineering reliability. With an extensive inventory of genuine spare parts and direct global supply lines, we are here to exceed your cooling expectations.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenQuote()} className="btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Request Bulk Quotation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Body: Sidebar + Product Grid */}
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 280px) minmax(0, 1fr)',
          gap: '3rem',
          alignItems: 'start'
        }} className="catalog-layout">

          {/* Left Sidebar: Original Category Hierarchy */}
          <aside>
            <div className="white-card" style={{ padding: '1.75rem', border: '1.5px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1.5px solid var(--border-light)' }}>
                <SlidersHorizontal size={18} color="var(--primary-blue)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 800 }}>Categories</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {allCategoriesList.map(cat => {
                  const isActive = selectedCategory === cat.slug;
                  const catCount = cat.slug === 'all'
                    ? products.length
                    : products.filter(p => p.categorySlug === cat.slug || (p.categoryName && p.categoryName.toLowerCase().includes(cat.name.toLowerCase()))).length;

                  return (
                    <div key={cat.slug}>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setSearchTerm('');
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.88rem',
                          fontWeight: isActive ? 800 : 600,
                          color: isActive ? 'var(--primary-blue)' : 'var(--text-body)',
                          background: isActive ? 'var(--primary-blue-light)' : 'transparent',
                          border: isActive ? '1px solid rgba(63, 64, 150, 0.25)' : '1px solid transparent',
                          textAlign: 'left',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '0.5rem' }}>
                          {cat.name}
                        </span>
                        <span style={{
                          fontSize: '0.72rem',
                          padding: '0.12rem 0.45rem',
                          borderRadius: '10px',
                          background: isActive ? 'var(--primary-blue)' : '#f1f5f9',
                          color: isActive ? '#ffffff' : 'var(--text-muted)',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {catCount}
                        </span>
                      </button>
                    </div>
                );
              })}
            </div>

            {/* Direct Assistance Box */}
              <div style={{
                marginTop: '2rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #3F4096 0%, #1b1c4b 100%)',
                color: '#ffffff',
                textAlign: 'center'
              }}>
                <ShieldCheck size={28} color="#ffffff" style={{ margin: '0 auto 0.5rem auto' }} />
                <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.25rem' }}>Need Technical Advice?</h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '1rem' }}>
                  Our Colombo engineering team can identify exact OEM replacement parts.
                </p>
                <a
                  href="tel:+94112314355"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    width: '100%',
                    padding: '0.65rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary-red)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  <PhoneCall size={14} /> Call Hotline
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Search + Product Grid */}
          <div>
            {/* Search and Results Count Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
              padding: '1rem 1.25rem',
              background: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Showing <strong style={{ color: 'var(--text-main)' }}>{filteredProducts.length}</strong> items
                {selectedCategory !== 'all' && <span> in <strong style={{ color: 'var(--primary-blue)' }}>{selectedCategory.replace('-', ' ')}</strong></span>}
              </div>

              <div style={{ position: 'relative', minWidth: '300px' }}>
                <Search size={17} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search model, manufacturer, brand..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.4rem', margin: 0, background: '#ffffff', fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.75rem'
            }}>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="white-card"
                  style={{
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    border: '1.5px solid var(--border-light)'
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Product Image */}
                  <div style={{
                    position: 'relative',
                    height: '210px',
                    overflow: 'hidden',
                    background: '#f1f5f9'
                  }}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />

                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span style={{
                        background: '#ffffff',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: 'var(--primary-blue)',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid var(--border-light)'
                      }}>
                        {product.brand}
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
                      color: '#d97706',
                      boxShadow: 'var(--shadow-xs)'
                    }}>
                      <Star size={12} fill="#d97706" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--primary-red)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {product.categoryName}
                      </div>
                      <h4 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', lineHeight: 1.35, color: 'var(--text-main)' }}>
                        {product.name}
                      </h4>
                      <p style={{
                        fontSize: '0.88rem',
                        color: 'var(--text-body)',
                        lineHeight: 1.5,
                        marginBottom: '1.25rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {product.description}
                      </p>
                    </div>

                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--border-light)'
                      }}>
                        <span style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontWeight: 600 }}>
                          <CheckCircle size={14} /> In Stock
                        </span>

                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.85rem',
                            color: 'var(--primary-blue)',
                            fontWeight: 700
                          }}
                        >
                          <span>Specs</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem 1rem', background: '#f8fafc', borderRadius: 'var(--radius-lg)', border: '1.5px dashed var(--border-light)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  No products found matching "{searchTerm}"
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Try searching for another keyword or select a different category from the sidebar.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  className="btn-secondary btn-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge" style={{ marginBottom: '0.5rem' }}>{selectedProduct.brand}</span>
                <h3 style={{ fontSize: '1.5rem', lineHeight: 1.25, color: 'var(--text-main)' }}>{selectedProduct.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Model: {selectedProduct.model || 'Standard'}</span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ color: 'var(--text-muted)', fontSize: '1.5rem', padding: '0.25rem 0.5rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedProduct.description}
            </p>

            {/* Technical Specifications Table */}
            {selectedProduct.specs && (
              <div style={{ marginBottom: '2rem' }}>
                <h5 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
                  Technical Specifications
                </h5>
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden'
                }}>
                  {Object.entries(selectedProduct.specs).map(([key, value], idx) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.7rem 1rem',
                        fontSize: '0.88rem',
                        background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                        borderBottom: idx === Object.keys(selectedProduct.specs).length - 1 ? 'none' : '1px solid var(--border-light)'
                      }}
                    >
                      <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{key}</span>
                      <strong style={{ color: 'var(--text-main)' }}>{value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedProduct(null)} className="btn-secondary btn-sm">
                Close
              </button>
              <button
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  if (onOpenQuote) onOpenQuote(prod);
                }}
                className="btn-primary btn-sm"
              >
                Request Quote For This Item
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .catalog-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
