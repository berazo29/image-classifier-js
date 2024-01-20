package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type HealthResponse struct {
	Status string `json:"status"`
	Time   string `json:"time"`
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		healthResponse := HealthResponse{Status: "up", Time: time.Now().Format(time.Stamp)}
		fmt.Println(healthResponse)
		c.JSON(http.StatusOK, healthResponse)
	})

  r.Static("/public", "./public")
	return r
}

func main() {
	r := setupRouter()
	r.Run(":8080")
}
