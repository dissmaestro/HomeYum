package handlers

import (
	"HomeYum/internal/db"
	"HomeYum/internal/requests"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5"
)

func RegisterOpenOrderRoutes(app *fiber.App, queries *db.Queries) {

}

func RegisterPrivateOrderRoutes(group *fiber.Group, queries *db.Queries, conn *pgx.Conn) {
	group.Post("/order", createFullOrder(queries, conn))
}

func createFullOrder(queries *db.Queries, conn *pgx.Conn) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var params requests.FullOrderRequest
		if err := c.BodyParser(&params); err != nil {
			log.Println("Error parsing request body:", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
		}

		tx, err := conn.Begin(c.Context())
		if err != nil {
			return err
		}
		defer tx.Rollback(c.Context())

		qtx := queries.WithTx(tx)

		creatOrder, err := qtx.CreateOrder(c.Context(), params.Order)
		if err != nil {
			log.Println("Error with Create Order: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create order"})
		}

		createItemOrder, err := qtx.CreateOrderItems(c.Context(), params.Items)
		if err != nil {
			log.Println("Error with Create Order: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create order items"})
		}

		if err := tx.Commit(c.Context()); err != nil {
			log.Println("Error committing transaction: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to commit transaction"})
		}

		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"order": creatOrder,
			"items": createItemOrder,
		})
	}
}
