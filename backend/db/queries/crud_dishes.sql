-- name: GetAllDishes :many
SELECT id, name, description, image_url, price
FROM dishes;

-- name: GetDishByID :one
SELECT id, name, description, image_url, price
FROM dishes
WHERE
    id = @id;

-- name: UpdateDishByID :one
UPDATE dishes
SET
    name = @name,
    description = @description,
    image_url = @image_url,
    price = @price
WHERE
    id = @id
RETURNING *;

-- name: InsertDish :one
insert into dishes (name, description, image_url, price)
values (@name, @description, @image_url, @price)
RETURNING *;

-- name: GetDishesByCategory :many
SELECT d.*
FROM dishes d
JOIN dish_categories dc ON d.id = dc.dish_id
JOIN categories c ON dc.category_id = c.id
WHERE c.name = @category_name;
