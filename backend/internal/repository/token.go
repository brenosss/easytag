package repository

import (
	"context"
	// Imported for side effects
	_ "embed"

	"github.com/brenosss/easytag/backend/internal/database"
)

//go:embed sql/read_project_token.sql
var readProjectTokenQuery string

type TokenRepository struct {
	db database.Database
}

func NewTokenRepository(db database.Database) *TokenRepository {
	return &TokenRepository{db: db}
}

func (p TokenRepository) GetProjectID(ctx context.Context, token string) (string, error) {
	var projectID string
	err := p.db.Read(ctx, &projectID, readProjectTokenQuery, token)
	return projectID, err
}
