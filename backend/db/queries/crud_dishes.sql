CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL, -- Название блюда
    description TEXT,
    image_url VARCHAR(255), 
    price DECIMAL(10,2) NOT NULL, 
);



-- Return all dishes
SELECT id, name, description, image_url, price
FROM dishes;

-- Get dish by id
SELECT id, name, description, image_url, price
FROM dishes
WHERE
    id = @id;

-- Update dish by id
UPDATE agent
SET
    name = @name,
    description = @description,
    image_url = @image_url,
    price = @price
WHERE
    id = @id
RETURNING *;

-- Insert one dish
insert into dishes (name, description, image_url, price)
values (@name, @description, @image_url, @price)
RETURNING *;

-- Return all dishes by category
SELECT d.*
FROM dishes d
JOIN dish_categories dc ON d.id = dc.dish_id
JOIN categories c ON dc.category_id = c.id
WHERE c.name = @category_name;
