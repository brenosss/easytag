package domain

import (
	"context"

	"github.com/brenosss/easytag/backend/internal/model"
	"github.com/brenosss/easytag/backend/internal/repository"
)

type PageService struct {
	repository *repository.PageRepository
}

func NewPageService(repository *repository.PageRepository) *PageService {
	return &PageService{repository: repository}
}

func (p PageService) ListByProject(ctx context.Context, projectID, userID string) ([]model.Page, error) {
	return p.repository.ListByProject(ctx, projectID, userID)
}

func (p PageService) List(ctx context.Context, userID string) ([]model.Page, error) {
	return p.repository.List(ctx, userID)
}

func (p PageService) Get(ctx context.Context, path, userID string) (model.Page, error) {
	return p.repository.Get(ctx, path, userID)
}

func (p PageService) GetSnippet(ctx context.Context, path, projectID string) (string, error) {
	page, err := p.repository.Get(ctx, path, projectID)
	if err != nil {
		return "", err
	}
	return page.Snippet(), nil
}

func (p PageService) GetSnippetNextApp(ctx context.Context, path, projectID string) ([]byte, error) {
	page, err := p.repository.Get(ctx, path, projectID)
	if err != nil {
		return []byte{}, err
	}
	return page.SnippetNextApp(), nil
}
