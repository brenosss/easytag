package main

import (
	"time"

	"github.com/brenosss/easytag/backend/config/log"
	"github.com/brenosss/easytag/backend/config/server"
	"github.com/brenosss/easytag/backend/internal/api"
	"github.com/brenosss/easytag/backend/internal/database"
	"github.com/brenosss/easytag/backend/internal/repository"
	"go.uber.org/zap"
	"os"

	// Imported for side effects
	_ "github.com/lib/pq"
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
}

func main() {
	log.Setup()
	zap.S().Info(os.Getenv("DATABASE_URL"))

	db, err := database.NewPostgres(os.Getenv("DATABASE_URL"))

	if err != nil {
		zap.S().Panic(err)
	}
	defer db.Close()

	handler := api.NewPageHandler(repository.NewPageRepository(db))

	srv := server.SetupHTTPServer(handler)
	if err := srv.ListenAndServe(); err != nil {
		zap.S().Errorw("something went wrong starting http server", "error", err)
	}
}
