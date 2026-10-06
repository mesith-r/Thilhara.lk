import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, CheckCircle, ArrowRight, Eye, Sparkles, Layers } from 'lucide-react';

const fallbackProducts = [
  {
    id: 1,
    name: "THD Series High Efficiency Evaporator",
    slug: "thd-series-high-efficiency-evaporator",
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

const categories = [
  { label: "All Hardware", slug: "all" },
  { label: "Cold Room & Evaporators", slug: "cold-room" },
  { label: "Compressors & Motors", slug: "compressors" },
  { label: "Valves & Fittings", slug: "valves-fittings" },
  { label: "Tools & Equipment", slug: "tools-equipment" }
];

export default function ProductsCatalog({ onSelectProductForQuote }) {
  const [products, setProducts] = useState(fallbackProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
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
    <section id="products" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge">
            <Layers size={14} />
            Hardware & Spares Catalog
          </span>
          <h2 className="section-title">
            Industrial Grade Cooling & <br />
            <span style={{ color: 'var(--primary-blue)' }}>Genuine Refrigeration Equipment</span>
          </h2>
          <p className="section-subtitle">
            From heavy-duty multi-stage evaporators and scroll compressors to digital vacuum telemetry,
            explore certified solutions ready for immediate dispatch across Sri Lanka.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          padding: '1.25rem 1.5rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(c => (
              <button
                key={c.slug}
                onClick={() => setSelectedCategory(c.slug)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'all var(--transition-fast)',
                  background: selectedCategory === c.slug ? 'var(--primary-blue)' : '#f8fafc',
                  color: selectedCategory === c.slug ? '#ffffff' : 'var(--text-body)',
                  border: selectedCategory === c.slug ? 'none' : '1px solid var(--border-light)',
                  boxShadow: selectedCategory === c.slug ? '0 4px 12px rgba(63, 64, 150, 0.25)' : 'none'
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search product, model, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem', margin: 0, background: '#f8fafc' }}
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
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
              {/* Product Image Box */}
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
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '0.4rem'
                }}>
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
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-red)', marginBottom: '0.35rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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

                {/* Specs Snippet */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-light)'
                  }}>
                    <span style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#059669', fontWeight: 600 }}>
                      <CheckCircle size={14} /> In Stock (Colombo)
                    </span>

                    <button
                      onClick={(e) => {
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

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No products found matching "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
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
                  if (onSelectProductForQuote) onSelectProductForQuote(prod);
                }}
                className="btn-primary btn-sm"
              >
                Request Quote For This Item
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
