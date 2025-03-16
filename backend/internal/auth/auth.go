package auth

import (
	"HomeYum/internal/db"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func RegisterAuthRoutes(app *fiber.App, queries *db.Queries) {
	app.Post("/login", AuthUser(queries))
}

func AuthUser(queries *db.Queries) fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.FormValue("user")
		pass := c.FormValue("pass")

		dbPass, err := queries.GetPassByName(c.Context(), user)
		if err != nil {
			log.Println("Error to het user password", err)
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to authorized"})
		}

		if dbPass != pass {
			log.Println("User tried to auth wirh bad paaword")
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		token, err := generateJWT(user)
		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		return c.JSON(fiber.Map{"token": token})
	}
}

func Restricted(c *fiber.Ctx) error {
	user := c.Locals("user")
	if user == nil {
		return c.Status(fiber.StatusUnauthorized).SendString("Unauthorized")
	}

	token, ok := user.(*jwt.Token)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).SendString("Invalid token type")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).SendString("Invalid claims type")
	}

	name, ok := claims["name"].(string)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).SendString("Invalid name in claims")
	}
	return c.SendString("Welcome " + name)
}
