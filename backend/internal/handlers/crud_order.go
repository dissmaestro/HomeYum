package handlers

import (
	"HomeYum/internal/db"
	"log"

	"github.com/gofiber/fiber/v2"
)

func RegisterOpenOrderRoutes(app *fiber.App, queries *db.Queries) {

}

func RegisterPrivateOrderRoutes(group *fiber.Group, queries *db.Queries) {
	group.Post("/order", createOrder(queries))
}

func createOrder(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var params db.CreateOrderParams
		if err := c.BodyParser(&params); err != nil {
			log.Println("Error parsing request body:", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
		}

		created, err := queries.CreateOrder(c.Context(), params)
		if err != nil {
			log.Println("Error with Create Order: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create dishes"})
		}

		return c.Status(fiber.StatusCreated).JSON(created)
	}
}
