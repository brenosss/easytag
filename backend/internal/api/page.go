package api

import (
	"strings"
	"net/http"

	"github.com/brenosss/easytag/backend/internal/api/middleware"
	"github.com/brenosss/easytag/backend/internal/domain"
	"go.uber.org/zap"

	"github.com/gin-gonic/gin"
)

const project_id = "project_id"
const path = "path"

type PageHandler struct {
	service      *domain.PageService
	tokenService *domain.TokenService
}

func NewPageHandler(ps *domain.PageService, ts *domain.TokenService) PageHandler {
	// TODO create a domain an use case for this handler
	return PageHandler{service: ps, tokenService: ts}
}

func (h PageHandler) Routes(router *gin.Engine) {
	router.Use(middleware.AuthUser(h.tokenService))
	pages := router.Group("/")
	pages.GET("/projects/:project_id/pages", h.listByProject)
	pages.POST("/pages/snippet", h.getSnippet)
	pages.GET("/pages", h.list)
}

func (h PageHandler) listByProject(c *gin.Context) {
	idStr := c.Params.ByName(project_id)
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not get user id"})
		return
	}
	pages, err := h.service.ListByProject(c.Request.Context(), idStr, userID.(string))
	if err != nil {
		zap.S().Errorw("error listing pages", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "something bad happened"})
		return
	}
	c.JSON(http.StatusOK, pages)
}

func (h PageHandler) list(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not get user id"})
		return
	}
	pages, err := h.service.List(c.Request.Context(), userID.(string))
	if err != nil {
		zap.S().Errorw("error listing all pages", "error", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "something bad happened"})
		return
	}
	c.JSON(http.StatusOK, pages)
}

func (h PageHandler) getSnippet(c *gin.Context) {
	type body struct {
		Path string `json:"path"`
		Type string `json:"type" default:html`
	}
	var b body
	if err := c.BindJSON(&b); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}
	projectID, ok := c.Get("projectID")
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not get the project ID"})
		return
	}
	if strings.HasPrefix(b.Path, "/") {
		b.Path = strings.Replace(b.Path, "/", "", 1)
	}
	if b.Type == "nextApp" {
		pages, err := h.service.GetSnippetNextApp(c.Request.Context(), b.Path, projectID.(string))
		if err != nil {
			zap.S().Errorw("error getting page", "error", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Path not founded"})
			return
		}
		c.Data(http.StatusOK, "application/json; charset=utf-8", pages)
	} else {
		pages, err := h.service.GetSnippet(c.Request.Context(), b.Path, projectID.(string))
		if err != nil {
			zap.S().Errorw("error getting page", "error", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Path not founded"})
			return
		}
		c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(pages))
	}

}
