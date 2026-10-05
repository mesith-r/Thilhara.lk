package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"thilhara-server/handlers"
	"thilhara-server/storage"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	store := storage.NewStorage()
	h := handlers.NewHandler(store)

	mux := http.NewServeMux()

	mux.HandleFunc("/api/health", h.HealthCheck)
	mux.HandleFunc("/api/categories", h.GetCategories)
	mux.HandleFunc("/api/testimonials", h.GetTestimonials)
	mux.HandleFunc("/api/partners", h.GetPartners)
	mux.HandleFunc("/api/contact", h.SubmitContact)
	mux.HandleFunc("/api/quotes", h.SubmitQuote)

	// Handles /api/products and /api/products/{slug}
	mux.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		h.GetProducts(w, r)
	})
	mux.HandleFunc("/api/products/", func(w http.ResponseWriter, r *http.Request) {
		path := strings.Trim(r.URL.Path, "/")
		parts := strings.Split(path, "/")
		if len(parts) >= 3 && parts[2] != "" {
			h.GetProductBySlug(w, r)
			return
		}
		h.GetProducts(w, r)
	})

	addr := fmt.Sprintf(":%s", port)
	log.Printf("==================================================")
	log.Printf(" ❄️  Thilhara Cooling Solutions - GoLang Backend")
	log.Printf(" 🚀 Server running at http://localhost:%s", port)
	log.Printf(" 🔌 Database: PostgreSQL Ready / Memory Hybrid")
	log.Printf("==================================================")

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
