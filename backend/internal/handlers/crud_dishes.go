package handlers

import (
	"HomeYum/internal/db"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func RegisterOpenDishesRoutes(app *fiber.App, queries *db.Queries) {
	app.Get("/dish/:id", SelectDishById(queries))
	app.Get("/dishes", SelectAllDishes(queries))
}
func RegisterPrivateDishesRoutes(group *fiber.Group, queries *db.Queries) {
	group.Post("/dishes", createDishes(queries))
	group.Delete("/dishes/:id", DropDishByID(queries))
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

		if _, err := os.Stat(os.Getenv("IMAGE_URL")); os.IsNotExist(err) {
			err := os.MkdirAll(os.Getenv("IMAGE_URL"), os.ModePerm)
			if err != nil {
				log.Println("Failed to create dir for images:", err)
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create images folder"})
			}
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

func SelectAllDishes(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		res, err := queries.GetAllDishes(c.Context())
		if err != nil {
			log.Println("Error get dishes")
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get all dishes"})
		}
		return c.JSON(res)
	}
}

func DropDishByID(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			log.Println("Invalid param id value", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid id"})
		}

		dish, err := queries.GetDishByID(c.Context(), int32(id))
		if err != nil {
			log.Println("empty :", dish)
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Dish not found"})
		}

		err = queries.DeleteDisheByID(c.Context(), int32(id))
		if err != nil {
			log.Println("Error during delete dish", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete dish"})
		}
		return c.SendStatus(fiber.StatusNoContent)
	}
}
