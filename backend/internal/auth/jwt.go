package auth

import (
	"errors"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func generateJWT(name string) (string, error) {

	claims := jwt.MapClaims{
		"name":  name,
		"admin": true,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		log.Println("JWT_SECRET is empty!")
		return "", errors.New("missing JWT secret")
	}
	t, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		log.Println("Error creating token", err)
		return "", err
	}
	return t, nil
}
