package server

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type Router interface {
	Routes(r *gin.Engine)
}

func SetupHTTPServer(routers ...Router) *http.Server {
	r := gin.Default()

	for _, handler := range routers {
		handler.Routes(r)
	}

	a := os.Getenv("SERVER_ADDRESS")
	if a == "" {
		a = ":8080"
	}

	zap.S().Debugf("Starting server on %s", a)

	return &http.Server{
		Addr:         a,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}
}
