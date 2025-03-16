-- name: GetPassByName :one
SELECT password
FROM users
WHERE
    name = @name;

-- name: CreateUser :one
INSERT INTO users (name, password)
VALUES (@name, @password)
RETURNING *;

-- name: DeleteUser :one
DELETE FROM users
WHERE name=@name
RETURNING *;