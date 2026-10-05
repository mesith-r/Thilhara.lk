-- PostgreSQL Database Schema for Thilhara Cooling Solutions

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50) DEFAULT 'snowflake'
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100),
    description TEXT NOT NULL,
    specs JSONB DEFAULT '{}',
    in_stock BOOLEAN DEFAULT TRUE,
    rating NUMERIC(2,1) DEFAULT 4.8,
    reviews_count INT DEFAULT 24,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    comment TEXT NOT NULL,
    rating NUMERIC(2,1) DEFAULT 5.0,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quote_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150),
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    project_type VARCHAR(100) NOT NULL,
    estimated_capacity VARCHAR(100),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Air Conditioning Systems', 'air-conditioning', 'Residential, commercial, and industrial air conditioning units', 'wind'),
('Compressors & Motors', 'compressors-motors', 'Hermetic, scroll, and semi-hermetic cooling compressors', 'cpu'),
('Cold Room Hardware', 'cold-room', 'Walk-in chillers, cold room panels, doors, and evaporator units', 'thermometer-snowflake'),
('Refrigeration Accessories', 'refrigeration-accessories', 'Valves, filter driers, copper fittings, and sight glasses', 'tool'),
('Tools & Diagnostics', 'tools-diagnostics', 'Vacuum pumps, manifold gauges, flaring tools, and leak detectors', 'wrench')
ON CONFLICT (slug) DO NOTHING;
