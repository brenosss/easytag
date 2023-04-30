package repository

import (
	"context"
	// Imported for side effects
	_ "embed"

	"github.com/brenosss/easytag/backend/internal/database"
)

//go:embed sql/read_user_token.sql
var readUserTokenQuery string

type TokenRepository struct {
	db database.Database
}

func NewTokenRepository(db database.Database) *TokenRepository {
	return &TokenRepository{db: db}
}

func (p TokenRepository) GetUserID(ctx context.Context, token string) (string, error) {
	var userID string
	err := p.db.Read(ctx, &userID, readUserTokenQuery, token)
	return userID, err
}
