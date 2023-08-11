package model

import (
	"time"
	"encoding/json"
	"go.uber.org/zap"
)

type Page struct {
	ID          string    `db:"id" json:"id"`
	Path        string    `db:"path" json:"path"`
	Title       string    `db:"title" json:"title"`
	Image       string    `db:"image" json:"image"`
	Description string    `db:"description" json:"description"`
	CreatedAt   time.Time `db:"createdAt" json:"created_at"`
	UpdatedAt   time.Time `db:"updatedAt" json:"updated_at"`
	ProjectID   string    `db:"projectId" json:"project_id"`
	TwitterCard   string    `db:"twitterCard" json:"twitter_card"`
}

func (p Page) Snippet() string {
	s := ``
	if p.Title != "" {
		s += meta("og:title", p.Title)
		s += metaTwitter("twitter:title", p.Title)
	}
	if p.Description != "" {
		s += meta("og:description", p.Description)
		s += metaTwitter("twitter:description", p.Description)
	}
	if p.Image != "" {
		s += meta("og:image", p.Image)
		s += metaTwitter("twitter:image", p.Image)
	}
	if p.Path != "" {
		s += meta("og:url", p.Path)
	}
	if p.TwitterCard != "" {
		s += metaTwitter("twitter:card", p.TwitterCard)
	} else {
		s += metaTwitter("twitter:card", "summary")
	}
	return s
}

func (p Page) SnippetNextApp() []byte {
	data := map[string]interface{}{
		"twitter": map[string]interface{}{
			"card": p.TwitterCard,
			"title": p.Title,
			"description": p.Description,
			"images": []string{p.Image},
		},
		"openGraph": map[string]interface{}{
			"title": p.Title,
			"description": p.Description,
			"images": []string{p.Image},
			"url": p.Path,
		},
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		zap.S().Errorw("Could not marshal json: %s\n", err)
	}
	return jsonData
}

func meta(property, content string) string {
	return "<meta property=\"" + property + "\" content=\"" + content + "\"></meta>\n"
}

func metaTwitter(property, content string) string {
	return "<meta name=\"" + property + "\" content=\"" + content + "\"></meta>\n"
}
