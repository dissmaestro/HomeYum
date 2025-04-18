package handlers

import (
	"HomeYum/internal/db"
	"HomeYum/internal/requests"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

func RegisterOpenOrderRoutes(app *fiber.App, queries *db.Queries, pool *pgxpool.Pool) {
	app.Post("/order", createFullOrder(queries, pool))
}

func createFullOrder(queries *db.Queries, pool *pgxpool.Pool) fiber.Handler {
	return func(c *fiber.Ctx) error {

		conn, err := pool.Acquire(c.Context())
		if err != nil {
			log.Println("Error acquiring connection:", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "DB connection error"})
		}
		defer conn.Release()

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
