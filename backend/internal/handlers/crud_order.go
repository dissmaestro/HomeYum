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

func RegisterPrivateOrderRoutes(group *fiber.Group, queries *db.Queries) {
	group.Get("/order/:id", DropDishByID(queries))
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

		idOrder, err := qtx.CreateOrder(c.Context(), params.Order)
		if err != nil {
			log.Println("Error with Create Order: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create order"})
		}

		for i := range params.Items {
			params.Items[i].OrderID = &idOrder
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
			"order": idOrder,
			"items": createItemOrder,
		})
	}
}

func getOrderByID(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			log.Println("Cannot get id of order from url")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get order id"})
		}

		order, err := queries.GetFullOrderInfo(c.Context(), int32(id))
		if err != nil {
			log.Println("Cannot get order by id")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get order by id"})
		}
		return c.JSON(order)
	}
}
