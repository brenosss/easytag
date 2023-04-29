package repository

import (
	"context"
	// Imported for side effects
	_ "embed"

	"github.com/brenosss/easytag/backend/internal/database"
	"github.com/brenosss/easytag/backend/internal/model"
)

//go:embed sql/read_pages.sql
var readPagesQuery string

type PageRepository struct {
	db database.Database
}

func NewPageRepository(db database.Database) *PageRepository {
	return &PageRepository{db: db}
}

func (p PageRepository) List(ctx context.Context, projectID string) ([]model.Page, error) {
	var pages []model.Page
	err := p.db.Read(ctx, &pages, readPagesQuery, projectID)
	return pages, err
}
