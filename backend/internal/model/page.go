package model

import "time"

type Page struct {
	ID          string    `db:"id" json:"id"`
	Path        string    `db:"path" json:"path"`
	Title       string    `db:"title" json:"title"`
	Image       string    `db:"image" json:"image"`
	Description string    `db:"description" json:"description"`
	CreatedAt   time.Time `db:"createdAt" json:"created_at"`
	UpdatedAt   time.Time `db:"updatedAt" json:"updated_at"`
	ProjectID   string    `db:"projectId" json:"project_id"`
}
