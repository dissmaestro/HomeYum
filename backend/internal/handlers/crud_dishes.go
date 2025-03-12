package handlers

import (
	"HomeYum/internal/db"
	"fmt"
	"log"
	"math/big"
	"os"

	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func RegisterDishesRoutes(app *fiber.App, queries *db.Queries) {
	app.Get("/dish/:id", SelectDishById(queries))
	app.Post("/dishes", createDishes(queries))
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
			log.Println("Error with SelectDish: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get dish"})
		}

		return c.JSON(res)
	}
}

func createDishes(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var params db.InsertDishParams
		if err := c.BodyParser(&params); err != nil {
			log.Println("Error parsing request body:", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
		}

		file, err := c.FormFile("image")
		if err != nil {
			log.Println("Error getting image:", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Image is required"})
		}

		ext := filepath.Ext(file.Filename)
		imagePath := fmt.Sprintf("%s%s%s", os.Getenv("IMAGE_URL"), uuid.New(), ext)

		if err := c.SaveFile(file, imagePath); err != nil {
			log.Println("Error saving image")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save image"})
		}

		params.ImageUrl = &imagePath

		created, err := queries.InsertDish(c.Context(), params)
		if err != nil {
			log.Println("Error with Create Dish: ", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create dishes"})
		}

		return c.Status(fiber.StatusCreated).JSON(created)
	}
}

// Convert string to pgtype.Numeric
func stringToNumeric(value string) (pgtype.Numeric, error) {
	var num pgtype.Numeric

	// Convert string to big.Float (avoid losing presicion)
	bigFloat, _, err := big.ParseFloat(value, 10, 128, big.ToZero)
	if err != nil {
		return num, err
	}

	// Convert big.Float in string and convert to Numeric
	strValue := bigFloat.Text('f', -1)
	err = num.Scan(strValue)
	if err != nil {
		return num, err
	}

	return num, nil
}
