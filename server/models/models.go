package models

import "time"

type Category struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type Product struct {
	ID           int               `json:"id"`
	Name         string            `json:"name"`
	Slug         string            `json:"slug"`
	CategoryID    int               `json:"categoryId"`
	CategoryName  string            `json:"categoryName"`
	CategorySlug  string            `json:"categorySlug,omitempty"`
	CategoryGroup string            `json:"categoryGroup,omitempty"`
	Brand         string            `json:"brand"`
	Model        string            `json:"model"`
	Description  string            `json:"description"`
	Specs        map[string]string `json:"specs"`
	InStock      bool              `json:"inStock"`
	Rating       float64           `json:"rating"`
	ReviewsCount int               `json:"reviewsCount"`
	ImageUrl     string            `json:"imageUrl"`
	CreatedAt    time.Time         `json:"createdAt"`
}

type Testimonial struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Company   string    `json:"company"`
	Position  string    `json:"position"`
	Comment   string    `json:"comment"`
	Rating    float64   `json:"rating"`
	AvatarUrl string    `json:"avatarUrl"`
	CreatedAt time.Time `json:"createdAt"`
}

type Partner struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	LogoUrl string `json:"logoUrl"`
	Origin  string `json:"origin"`
	Type    string `json:"type"`
}

type ContactInquiry struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	ServiceType string    `json:"serviceType"`
	Message     string    `json:"message"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
}

type QuoteRequest struct {
	ID                int       `json:"id"`
	Name              string    `json:"name"`
	Company           string    `json:"company"`
	Email             string    `json:"email"`
	Phone             string    `json:"phone"`
	ProjectType       string    `json:"projectType"`
	EstimatedCapacity string    `json:"estimatedCapacity"`
	Notes             string    `json:"notes"`
	Status            string    `json:"status"`
	CreatedAt         time.Time `json:"createdAt"`
}
