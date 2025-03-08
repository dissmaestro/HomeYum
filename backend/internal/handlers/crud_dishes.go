package handlers

import (
	"HomeYum/internal/db"
	"log"

	"github.com/gofiber/fiber/v2"
)

func RegisterDishesRoutes(app *fiber.App, queries *db.Queries) {
	app.Get("/agent/:id", SelectDishById(queries))
}

func SelectDishById(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			log.Println("Invalid param id value", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid id"})
		}

		res, err := queries.GetDishByID(c.Context(), int32(id))
		if err != nil {
			log.Println("Error with SelectAgent: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get agent"})
		}

		return c.JSON(res)
	}
}
