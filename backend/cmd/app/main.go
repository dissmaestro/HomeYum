package main

import (
	"HomeYum/internal/auth"
	"HomeYum/internal/db"
	"HomeYum/internal/handlers"
	"context"
	"log"
	"os"
	"reflect"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"

	jwtware "github.com/gofiber/jwt/v2"
	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {

	app := fiber.New()

	// CORS midleware
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// JWT Middlware
	private := app.Group("/private")
	log.Println("Type of private group is =-================", reflect.TypeOf(private))
	private.Use(jwtware.New(jwtware.Config{ //// neeed to change, it`s like example group auth routs
		SigningKey:    []byte(os.Getenv("JWT_SECRET")),
		SigningMethod: os.Getenv("ALGORITHM_JWT"),
		ContextKey:    os.Getenv("CONTEXT_KEY"),
		TokenLookup:   "header:Authorization",
		AuthScheme:    "Bearer",
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			log.Println("JWT ERROR:", err) // Логируем ошибку
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
		},
	}))

	log.Println("Type of private group is =-================", reflect.TypeOf(private))

	// Limit to nubers of request  toavoid DDOS
	app.Use(limiter.New(limiter.Config{
		Max:        100,
		Expiration: 60 * 1000,
	}))
	// Initialize DB connect
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer dbpool.Close()

	// Init queries
	queries := db.New(dbpool)

	app.Use(logger.New())

	app.Get("/api/main", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "HomeYum Katering Service"})
	})

	// For gettiting images for frontend
	app.Static("/images", "./images")

	//Ебучая проблема какойго то хуя *fiber.Group приводится к Fiber.Handler с нисхуя толлько через этот assert заработало
	priv, ok := private.(*fiber.Group)
	if !ok {
		log.Fatal("ERROR: Cannot to casting Fiber route!")
	}
	// Register routes
	auth.RegisterAuthRoutes(app, queries)
	handlers.RegisterOpenDishesRoutes(app, queries)
	handlers.RegisterPrivateDishesRoutes(priv, queries)
	port := os.Getenv("FIBER_ADDR")
	// Start Serevr
	app.Listen(port)
}
