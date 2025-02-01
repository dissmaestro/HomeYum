package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	// Пример API-эндпоинта
	app.Get("/main", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "Привет из Fiber!"})
	})

	// Запуск сервера
	app.Listen(":8080")
}
