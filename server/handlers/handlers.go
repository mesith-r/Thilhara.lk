package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"thilhara-server/models"
	"thilhara-server/storage"
)

type Handler struct {
	store *storage.Storage
}

func NewHandler(store *storage.Storage) *Handler {
	return &Handler{store: store}
}

func enableCORS(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func (h *Handler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"status":  "healthy",
		"service": "Thilhara Cooling Solutions API",
		"version": "2.0.0",
		"backend": "GoLang",
		"db":      "PostgreSQL",
	})
}

func (h *Handler) GetCategories(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}
	categories := h.store.GetCategories()
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"data": categories,
	})
}

func (h *Handler) GetProducts(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}

	category := r.URL.Query().Get("category")
	search := r.URL.Query().Get("search")
	products := h.store.GetProducts(category, search)

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"count": len(products),
		"data":  products,
	})
}

func (h *Handler) GetProductBySlug(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}

	parts := strings.Split(strings.Trim(r.URL.Path, "/"), "/")
	if len(parts) < 3 {
		http.Error(w, "Invalid product path", http.StatusBadRequest)
		return
	}
	slug := parts[2]

	product, found := h.store.GetProductBySlug(slug)
	if !found {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "Product not found"})
		return
	}

	writeJSON(w, http.StatusOK, map[string]interface{}{
		"data": product,
	})
}

func (h *Handler) GetTestimonials(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}
	testimonials := h.store.GetTestimonials()
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"data": testimonials,
	})
}

func (h *Handler) GetPartners(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}
	partners := h.store.GetPartners()
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"data": partners,
	})
}

func (h *Handler) SubmitContact(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var inq models.ContactInquiry
	if err := json.NewDecoder(r.Body).Decode(&inq); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
		return
	}

	if inq.Name == "" || inq.Email == "" || inq.Message == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Name, email and message are required"})
		return
	}

	created, err := h.store.CreateContactInquiry(inq)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to save inquiry"})
		return
	}

	writeJSON(w, http.StatusCreated, map[string]interface{}{
		"message": "Thank you! Your message has been received. Our engineering specialist will contact you shortly.",
		"data":    created,
	})
}

func (h *Handler) SubmitQuote(w http.ResponseWriter, r *http.Request) {
	enableCORS(&w)
	if r.Method == http.MethodOptions {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var q models.QuoteRequest
	if err := json.NewDecoder(r.Body).Decode(&q); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
		return
	}

	if q.Name == "" || q.Email == "" || q.ProjectType == "" {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Name, email and project type are required"})
		return
	}

	created, err := h.store.CreateQuoteRequest(q)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "Failed to record quote request"})
		return
	}

	writeJSON(w, http.StatusCreated, map[string]interface{}{
		"message": "Quote request received! We are calculating the engineering specs and will send your proposal promptly.",
		"data":    created,
	})
}
