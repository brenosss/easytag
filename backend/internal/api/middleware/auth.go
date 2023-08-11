package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/brenosss/easytag/backend/internal/domain"

	"github.com/gin-gonic/gin"
)

type authHeader struct {
	IDToken string `header:"Authorization"`
}

// used to help extract validation errors
type invalidArgument struct {
	Field string `json:"field"`
	Value string `json:"value"`
	Tag   string `json:"tag"`
	Param string `json:"param"`
}

// AuthUser extracts a user from the Authorization header
// which is of the form "Bearer token"
// It sets the user to the context if the user exists
func AuthUser(s *domain.TokenService) gin.HandlerFunc {
	return func(c *gin.Context) {
		h := authHeader{}

		// bind Authorization Header to h and check for validation errors
		if err := c.ShouldBindHeader(&h); err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		idTokenHeader := strings.Split(h.IDToken, "Bearer ")

		if len(idTokenHeader) < 2 {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "must provide Authorization header with format `Bearer {token}`"})
			return
		}

		// validate ID token here
		projectID, err := s.GetProjectID(c.Request.Context(), idTokenHeader[1])

		if projectID == "" || errors.Is(err, domain.ErrInvalidToken) {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "provided token is invalid"})
			return
		}

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "something bad happened"})
			return
		}

		c.Set("projectID", projectID)

		c.Next()
	}
}
