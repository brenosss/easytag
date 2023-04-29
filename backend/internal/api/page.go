package api

import (
	"net/http"

	"github.com/brenosss/easytag/backend/internal/repository"
	"go.uber.org/zap"

	"github.com/gin-gonic/gin"
)

const id = "id"

type PageHandler struct {
	repository repository.PageRepository
}

func NewPageHandler(r *repository.PageRepository) PageHandler {
	// TODO create a domain an use case for this handler
	return PageHandler{repository: *r}
}

func (h PageHandler) Routes(router *gin.Engine) {
	router.GET("/projects/:id/pages", h.list)
}

func (h PageHandler) list(c *gin.Context) {
	idStr := c.Params.ByName(id)
	pages, err := h.repository.List(c.Request.Context(), idStr)
	if err != nil {
		zap.S().Errorw("error listing pages", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "something bad happened"})
		return
	}
	c.JSON(http.StatusOK, pages)
}
