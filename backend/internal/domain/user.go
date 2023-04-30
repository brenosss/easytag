package domain

import (
	"context"

	"github.com/brenosss/easytag/backend/internal/repository"
)

type UserService struct {
	repository *repository.UserRepository
}

func NewUsreService(repository *repository.UserRepository) *UserService {
	return &UserService{repository: repository}
}

func (u *UserService) CanSee(ctx context.Context, userID, path string) (bool, error) {
	return u.repository.CanSee(ctx, userID, path)
}
