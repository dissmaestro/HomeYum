package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost", // Разрешенные источники (React)
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	app.Use(logger.New())

	app.Get("/api/main", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "HomeYum Katering Service"})
	})

	port := os.Getenv("FIBER_ADDR")
	if port == "" {
		port = ":3001"
	}
	// Запуск сервера
	app.Listen(port)
}
