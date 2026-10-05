package storage

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"time"

	"thilhara-server/models"

	_ "github.com/lib/pq"
)

type Storage struct {
	db             *sql.DB
	usePostgres    bool
	mu             sync.RWMutex
	categories     []models.Category
	products       []models.Product
	testimonials   []models.Testimonial
	partners       []models.Partner
	contactSubmits []models.ContactInquiry
	quoteRequests  []models.QuoteRequest
}

func NewStorage() *Storage {
	s := &Storage{
		categories:     getSeedCategories(),
		products:       getSeedProducts(),
		testimonials:   getSeedTestimonials(),
		partners:       getSeedPartners(),
		contactSubmits: make([]models.ContactInquiry, 0),
		quoteRequests:  make([]models.QuoteRequest, 0),
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		host := getEnvOrDefault("DB_HOST", "localhost")
		port := getEnvOrDefault("DB_PORT", "5432")
		user := getEnvOrDefault("DB_USER", "postgres")
		pass := getEnvOrDefault("DB_PASSWORD", "postgres")
		name := getEnvOrDefault("DB_NAME", "thilhara_db")
		dbURL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, pass, host, port, name)
	}

	db, err := sql.Open("postgres", dbURL)
	if err == nil && db.Ping() == nil {
		log.Println("[Database] Connected successfully to PostgreSQL!")
		s.db = db
		s.usePostgres = true
		s.initPostgresSchema()
	} else {
		log.Println("[Database] PostgreSQL not currently reachable; operating in High-Performance Local Seed Mode.")
		log.Println("[Database] Tip: Set DATABASE_URL or start PostgreSQL container to persist data.")
		s.usePostgres = false
	}

	return s
}

func getEnvOrDefault(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func (s *Storage) initPostgresSchema() {
	query := `
	CREATE TABLE IF NOT EXISTS categories (
		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL UNIQUE,
		slug VARCHAR(100) NOT NULL UNIQUE,
		description TEXT,
		icon VARCHAR(50) DEFAULT 'snowflake'
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
	`
	_, err := s.db.Exec(query)
	if err != nil {
		log.Printf("[Database Schema Warning] Failed to exec auto-schema: %v", err)
	}
}

func (s *Storage) GetCategories() []models.Category {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.categories
}

func (s *Storage) GetProducts(categorySlug, search string) []models.Product {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result []models.Product
	searchLower := strings.ToLower(strings.TrimSpace(search))

	for _, p := range s.products {
		if categorySlug != "" && categorySlug != "all" {
			matched := false
			for _, cat := range s.categories {
				if cat.Slug == categorySlug && cat.Name == p.CategoryName {
					matched = true
					break
				}
			}
			if !matched {
				continue
			}
		}

		if searchLower != "" {
			nameMatch := strings.Contains(strings.ToLower(p.Name), searchLower)
			brandMatch := strings.Contains(strings.ToLower(p.Brand), searchLower)
			descMatch := strings.Contains(strings.ToLower(p.Description), searchLower)
			if !nameMatch && !brandMatch && !descMatch {
				continue
			}
		}

		result = append(result, p)
	}

	return result
}

func (s *Storage) GetProductBySlug(slug string) (*models.Product, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, p := range s.products {
		if p.Slug == slug {
			return &p, true
		}
	}
	return nil, false
}

func (s *Storage) GetTestimonials() []models.Testimonial {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.testimonials
}

func (s *Storage) GetPartners() []models.Partner {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.partners
}

func (s *Storage) CreateContactInquiry(inq models.ContactInquiry) (models.ContactInquiry, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	inq.CreatedAt = time.Now()
	inq.Status = "PENDING"

	if s.usePostgres && s.db != nil {
		query := `INSERT INTO contact_inquiries (name, email, phone, service_type, message, status, created_at)
		          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
		err := s.db.QueryRow(query, inq.Name, inq.Email, inq.Phone, inq.ServiceType, inq.Message, inq.Status, inq.CreatedAt).Scan(&inq.ID)
		if err == nil {
			s.contactSubmits = append(s.contactSubmits, inq)
			return inq, nil
		}
		log.Printf("[Postgres Error] Falling back to memory: %v", err)
	}

	inq.ID = len(s.contactSubmits) + 1
	s.contactSubmits = append(s.contactSubmits, inq)
	return inq, nil
}

func (s *Storage) CreateQuoteRequest(q models.QuoteRequest) (models.QuoteRequest, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	q.CreatedAt = time.Now()
	q.Status = "NEW"

	if s.usePostgres && s.db != nil {
		query := `INSERT INTO quote_requests (name, company, email, phone, project_type, estimated_capacity, notes, status, created_at)
		          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`
		err := s.db.QueryRow(query, q.Name, q.Company, q.Email, q.Phone, q.ProjectType, q.EstimatedCapacity, q.Notes, q.Status, q.CreatedAt).Scan(&q.ID)
		if err == nil {
			s.quoteRequests = append(s.quoteRequests, q)
			return q, nil
		}
		log.Printf("[Postgres Error] Falling back to memory: %v", err)
	}

	q.ID = len(s.quoteRequests) + 1
	s.quoteRequests = append(s.quoteRequests, q)
	return q, nil
}

// Seed Data
func getSeedCategories() []models.Category {
	return []models.Category{
		{ID: 1, Name: "Air Conditioning Systems", Slug: "air-conditioning", Description: "Commercial and residential energy-saving HVAC units", Icon: "wind"},
		{ID: 2, Name: "Cold Room & Evaporators", Slug: "cold-room", Description: "Industrial cold store panels, evaporators, and condensing units", Icon: "snowflake"},
		{ID: 3, Name: "Compressors & Motors", Slug: "compressors", Description: "High-efficiency hermetic, rotary, and scroll refrigeration compressors", Icon: "cpu"},
		{ID: 4, Name: "Refrigerant Valves & Fittings", Slug: "valves-fittings", Description: "Expansion valves, solenoids, filter driers, and copper fittings", Icon: "tool"},
		{ID: 5, Name: "HVAC Tools & Equipment", Slug: "tools-equipment", Description: "Vacuum pumps, manifold gauges, leak detectors, and tube benders", Icon: "wrench"},
	}
}

func getSeedProducts() []models.Product {
	return []models.Product{
		{
			ID:           1,
			Name:         "THD Series High Efficiency Evaporator",
			Slug:         "thd-series-high-efficiency-evaporator",
			CategoryID:   2,
			CategoryName: "Cold Room & Evaporators",
			Brand:        "Thilhara Engineering",
			Model:        "THD-450X",
			Description:  "Designed specifically for industrial cold rooms, walk-in chillers, and blast freezing facilities. Features aerodynamically engineered fan louvers for maximum airflow reach.",
			Specs: map[string]string{
				"Cooling Capacity": "14.5 kW",
				"Refrigerant":      "R404A / R507 / R448A",
				"Fin Spacing":      "7.0 mm",
				"Defrost":          "Electric Heating Element",
				"Voltage":          "380V / 3Ph / 50Hz",
			},
			InStock:      true,
			Rating:       4.9,
			ReviewsCount: 38,
			ImageUrl:     "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           2,
			Name:         "TFE Series Compact Ceiling Evaporator",
			Slug:         "tfe-series-compact-ceiling-evaporator",
			CategoryID:   2,
			CategoryName: "Cold Room & Evaporators",
			Brand:        "Thilhara Engineering",
			Model:        "TFE-220C",
			Description:  "Ultra low-profile dual-discharge ceiling mounted evaporator unit suitable for catering refrigerators, cold rooms with low clearance, and wine cellars.",
			Specs: map[string]string{
				"Cooling Capacity": "5.2 kW",
				"Air Flow":         "2,100 m3/h",
				"Noise Level":      "42 dB(A)",
				"Casing":           "Powder-coated Aluminum",
			},
			InStock:      true,
			Rating:       4.8,
			ReviewsCount: 22,
			ImageUrl:     "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           3,
			Name:         "Copeland Scroll Commercial Inverter Compressor",
			Slug:         "copeland-scroll-commercial-inverter-compressor",
			CategoryID:   3,
			CategoryName: "Compressors & Motors",
			Brand:        "Copeland",
			Model:        "ZB45KQE-TFD",
			Description:  "World-renowned Copeland Scroll reliability engineered for medium-to-high temperature commercial refrigeration and climate cooling applications.",
			Specs: map[string]string{
				"Horsepower":  "6.0 HP",
				"Displacement": "17.1 m3/h",
				"Refrigerant": "R404A, R134a, R407C",
				"Efficiency":  "Ultra High COP",
			},
			InStock:      true,
			Rating:       5.0,
			ReviewsCount: 64,
			ImageUrl:     "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           4,
			Name:         "Embraco Aspera Hermetic Refrigeration Compressor",
			Slug:         "embraco-aspera-hermetic-compressor",
			CategoryID:   3,
			CategoryName: "Compressors & Motors",
			Brand:        "Embraco",
			Model:        "NEK6214GK",
			Description:  "High performance hermetic reciprocating compressor for light commercial display coolers, beverage dispensers, and supermarket freezers.",
			Specs: map[string]string{
				"Application": "Medium / High Back Pressure",
				"Power":       "1/2 HP",
				"Motor Type":  "CSIR",
				"Voltage":     "220-240V 50Hz",
			},
			InStock:      true,
			Rating:       4.9,
			ReviewsCount: 45,
			ImageUrl:     "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           5,
			Name:         "Refco Digital Smart Manifold Gauge Set",
			Slug:         "refco-digital-smart-manifold-gauge-set",
			CategoryID:   5,
			CategoryName: "HVAC Tools & Equipment",
			Brand:        "Refco Swiss",
			Model:        "REFMATE-4",
			Description:  "Swiss-crafted 4-way wireless digital manifold system featuring high-precision pressure transducers, micron vacuum gauge, and Bluetooth telemetry.",
			Specs: map[string]string{
				"Origin":      "Switzerland",
				"Sensors":     "Pressure & Temperature Dual",
				"Gas Library": "Over 80 Pre-loaded Refrigerants",
				"Protection":  "IP54 Ruggedized",
			},
			InStock:      true,
			Rating:       5.0,
			ReviewsCount: 31,
			ImageUrl:     "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           6,
			Name:         "Eliwell Cold Room Electronic Controller",
			Slug:         "eliwell-cold-room-electronic-controller",
			CategoryID:   4,
			CategoryName: "Refrigerant Valves & Fittings",
			Brand:        "Eliwell",
			Model:        "IDPlus 974",
			Description:  "Microprocessor based controller with 3 relay outputs for compressor, defrost, and fan control. Direct NTC and PTC sensor compatibility.",
			Specs: map[string]string{
				"Display":     "3 Digits LED with Signs",
				"Power":       "230V AC",
				"Outputs":     "Compressor (2HP), Defrost (8A), Fan (5A)",
				"Connectivity":"Modbus Compatible",
			},
			InStock:      true,
			Rating:       4.7,
			ReviewsCount: 19,
			ImageUrl:     "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           7,
			Name:         "Honeywell Thermostatic Expansion Valve",
			Slug:         "honeywell-thermostatic-expansion-valve",
			CategoryID:   4,
			CategoryName: "Refrigerant Valves & Fittings",
			Brand:        "Honeywell",
			Model:        "TMVBL Series",
			Description:  "Precision modulating valve for regulating liquid refrigerant injection into evaporators with interchangeable orifices.",
			Specs: map[string]string{
				"Material":    "Forged Brass Body",
				"Connection":  "Oiled Solder / Flare",
				"Max Pressure":"35 bar",
				"Capillary":   "1.5m stainless steel",
			},
			InStock:      true,
			Rating:       4.8,
			ReviewsCount: 29,
			ImageUrl:     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
		{
			ID:           8,
			Name:         "Heavy Duty Dual-Stage HVAC Vacuum Pump",
			Slug:         "heavy-duty-dual-stage-hvac-vacuum-pump",
			CategoryID:   5,
			CategoryName: "HVAC Tools & Equipment",
			Brand:        "Thilhara Pro",
			Model:        "VP-280DS",
			Description:  "Deep vacuum recovery pump capable of pulling down to 15 microns. Integrated solenoid check valve prevents oil backflow.",
			Specs: map[string]string{
				"Flow Rate":    "12 CFM (340 L/min)",
				"Vacuum Level": "15 Microns Ultimate",
				"Motor":        "3/4 HP Induction Motor",
				"Oil Capacity":"650 ml",
			},
			InStock:      true,
			Rating:       4.9,
			ReviewsCount: 52,
			ImageUrl:     "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
			CreatedAt:    time.Now(),
		},
	}
}

func getSeedTestimonials() []models.Testimonial {
	return []models.Testimonial{
		{
			ID:        1,
			Name:      "Jeewan Thiloshana",
			Company:   "CBL Foods International (Pvt) Ltd",
			Position:  "Senior Supplies Clerk",
			Comment:   "We have now partnered with Thilhara Ref & Electricals for so many years. We have found them to be professional in every respect and would have no hesitation in recommending their service.",
			Rating:    5.0,
			AvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
			CreatedAt: time.Now(),
		},
		{
			ID:        2,
			Name:      "Pahan Gunasekera",
			Company:   "Sri Lankan Airlines",
			Position:  "Commercial Procurement Supervisor - General",
			Comment:   "We appreciate a business that can be counted on for service and integrity all the time. Thilhara consistently provides top-tier cooling components with punctual logistics.",
			Rating:    5.0,
			AvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
			CreatedAt: time.Now(),
		},
		{
			ID:        3,
			Name:      "Lakmal Jayasinghe",
			Company:   "Galadari Hotel Colombo",
			Position:  "Purchasing Executive",
			Comment:   "We appreciate how quickly you responded. You were very prompt. We always were treated courteously in person and on the phone. We are very pleased with your service!",
			Rating:    5.0,
			AvatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
			CreatedAt: time.Now(),
		},
		{
			ID:        4,
			Name:      "Amal Witanachchi",
			Company:   "Sri Lanka Broadcasting Corporation",
			Position:  "Purchasing Officer",
			Comment:   "Installation team was very thorough, professional and completed the job expeditiously. A great job by all members of the Thilhara engineering wing.",
			Rating:    5.0,
			AvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
			CreatedAt: time.Now(),
		},
		{
			ID:        5,
			Name:      "Lahiru Jayasinghe",
			Company:   "Abans Electrical (Pvt) Ltd",
			Position:  "Purchasing Executive",
			Comment:   "We have dealt with Thilhara Ref & Electricals for years. We have always been very satisfied with their service. I would highly recommend them to any commercial HVAC enterprise.",
			Rating:    5.0,
			AvatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
			CreatedAt: time.Now(),
		},
		{
			ID:        6,
			Name:      "Chandrasena Liyanage",
			Company:   "Richard Pieris Distributors",
			Position:  "Senior Purchasing Executive",
			Comment:   "I have been doing business with Thilhara for years! Great products, reliable OEM spare parts, competitive pricing, and great people. Thank You!",
			Rating:    5.0,
			AvatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
			CreatedAt: time.Now(),
		},
	}
}

func getSeedPartners() []models.Partner {
	return []models.Partner{
		{ID: 1, Name: "LG Electronics", LogoUrl: "LG", Origin: "South Korea", Type: "HVAC Systems & Inverter Chillers"},
		{ID: 2, Name: "Copeland", LogoUrl: "Copeland", Origin: "USA", Type: "Scroll & Hermetic Compressors"},
		{ID: 3, Name: "Honeywell", LogoUrl: "Honeywell", Origin: "USA", Type: "Valves & Climate Controls"},
		{ID: 4, Name: "Refco", LogoUrl: "Refco", Origin: "Switzerland", Type: "Precision Refrigeration Tools"},
		{ID: 5, Name: "Embraco", LogoUrl: "Embraco", Origin: "Brazil / Global", Type: "Cooling Compressors"},
		{ID: 6, Name: "Eliwell", LogoUrl: "Eliwell", Origin: "Italy", Type: "Microprocessor Controllers"},
		{ID: 7, Name: "Royal Cool", LogoUrl: "Royal Cool", Origin: "Global", Type: "Refrigerant & Cold Store Hardware"},
		{ID: 8, Name: "Ashida", LogoUrl: "Ashida", Origin: "Japan", Type: "Industrial HVAC Components"},
	}
}
