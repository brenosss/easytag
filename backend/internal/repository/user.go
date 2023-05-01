package repository

import (
	"context"
	// Imported for side effects
	_ "embed"

	"github.com/brenosss/easytag/backend/internal/database"
)

//go:embed sql/user_can_see_page_by_path.sql
var userCanSeePageByPathQuery string

type UserRepository struct {
	db database.Database
}

func NewUserRepository(db database.Database) *UserRepository {
	return &UserRepository{db: db}
}

func (u UserRepository) CanSee(ctx context.Context, userID, path string) (bool, error) {
	var canSee bool
	err := u.db.Read(ctx, &canSee, userCanSeePageByPathQuery, userID, path)
	return canSee, err
}
