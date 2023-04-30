package domain

import (
	"context"
	"database/sql"

	"github.com/brenosss/easytag/backend/internal/repository"
)

type TokenService struct {
	repository *repository.TokenRepository
}

func NewTokenService(repository *repository.TokenRepository) *TokenService {
	return &TokenService{repository: repository}
}

func (t *TokenService) GetUserID(ctx context.Context, token string) (string, error) {
	userID, err := t.repository.GetUserID(ctx, token)
	if err == sql.ErrNoRows {
		return "", ErrInvalidToken
	}
	return userID, err
}
