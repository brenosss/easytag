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

//go:embed sql/read_page.sql
var readPageQuery string

//go:embed sql/read_all_pages.sql
var readAllPagesQuery string

type PageRepository struct {
	db database.Database
}

func NewPageRepository(db database.Database) *PageRepository {
	return &PageRepository{db: db}
}

func (p PageRepository) ListByProject(ctx context.Context, projectID, userID string) ([]model.Page, error) {
	var pages []model.Page
	err := p.db.Read(ctx, &pages, readPagesQuery, projectID, userID)
	return pages, err
}

func (p PageRepository) List(ctx context.Context, userID string) ([]model.Page, error) {
	var pages []model.Page
	err := p.db.Read(ctx, &pages, readAllPagesQuery, userID)
	return pages, err
}

func (p PageRepository) Get(ctx context.Context, path, userID string) (model.Page, error) {
	var page model.Page
	err := p.db.Read(ctx, &page, readPageQuery, path, userID)
	return page, err
}
