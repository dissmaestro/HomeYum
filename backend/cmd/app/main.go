package main

import (
	"HomeYum/internal/db"
	"HomeYum/internal/handlers"
	"context"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {

	app := fiber.New()

	// CORS midleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Limit to nubers of request  toavoid DDOS
	app.Use(limiter.New(limiter.Config{
		Max:        100,
		Expiration: 60 * 1000,
	}))
	// Initialize DB connect
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer dbpool.Close()

	// Init queries
	queries := db.New(dbpool)

	app.Use(logger.New())

	app.Get("/api/main", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "HomeYum Katering Service"})
	})

	// For gettiting images for frontend
	app.Static("/images", "./images")

	// Register routes
	handlers.RegisterDishesRoutes(app, queries)

	port := os.Getenv("FIBER_ADDR")
	// Start Serevr
	app.Listen(port)
}
