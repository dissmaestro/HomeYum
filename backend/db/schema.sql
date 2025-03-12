CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL, -- Name of dish
    description TEXT,
    image_url VARCHAR(255), 
    price NUMERIC(10,2) NOT NULL
);


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE dish_categories (
    dish_id INT REFERENCES dishes(id) ON DELETE CASCADE,  -- Dish
    category_id INT REFERENCES categories(id) ON DELETE CASCADE, -- Category
    PRIMARY KEY (dish_id, category_id) -- Uniq pair
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_lastname VARCHAR(100) NOT NULL,
    adress TEXT NOT NULL,
    event_date TIMESTAMP NOT NULL, -- Datetime of event
    status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'canceled')) DEFAULT 'pending',
    total_price DECIMAL(10,2) NOT NULL, -- Total order amount
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE, -- Link with order
    dish_id INT REFERENCES dishes(id) ON DELETE CASCADE, -- Dish from menu
    quantity INT NOT NULL CHECK (quantity > 0), -- Amount
    total DECIMAL(10,2) NOT NULL -- Toral price
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE, -- Отзыв привязан к заказу
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL, -- Оценка 1-5
    comment TEXT,
    created_at TIMESTAMP DEFAULT now()
);
