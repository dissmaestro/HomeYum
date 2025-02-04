#образ Go
FROM golang:1.23.5 AS builder

WORKDIR /app

# Копируем файлы и устанавливаем зависимости
COPY ./go.mod ./go.sum ./

RUN go mod download

# Копируем весь код и собираем бинарник
COPY . .

# WORKDIR /app/backend/

RUN CGO_ENABLED=0 GOOS=linux go build -o /root/app ./cmd/app/main.go

# Минилнуксик и забираем бинарник
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /root/app .

# Запуск приложения
ENTRYPOINT ["./app"]