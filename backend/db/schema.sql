CREATE TABLE chefs (
    id SERIAL PRIMARY KEY,
    bio TEXT,
    experience INT CHECK (experience >= 0), -- Опыт в годах
    price_per_hour DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE dishes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, -- Название блюда
    description TEXT,
    price DECIMAL(10,2) NOT NULL, 
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);


CREATE TABLE dish_categories (
    dish_id INT REFERENCES dishes(id) ON DELETE CASCADE,  -- Блюдо
    category_id INT REFERENCES categories(id) ON DELETE CASCADE, -- Категория
    PRIMARY KEY (dish_id, category_id) -- Уникальная пара "блюдо-категория"
);


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    chef_id INT REFERENCES chefs(id) ON DELETE CASCADE, -- Какого повара заказали
    event_date TIMESTAMP NOT NULL, -- Дата и время события
    status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'canceled')) DEFAULT 'pending',
    total_price DECIMAL(10,2) NOT NULL, -- Итоговая сумма заказа
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE, -- Связь с заказом
    dish_id INT REFERENCES dishes(id) ON DELETE CASCADE, -- Блюдо из меню
    quantity INT NOT NULL CHECK (quantity > 0), -- Количество заказанных блюд
    price DECIMAL(10,2) NOT NULL, -- Цена за единицу блюда
    total DECIMAL(10,2) NOT NULL, -- Общая стоимость для этого блюда
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE, -- Отзыв привязан к заказу
    chef_id INT REFERENCES chefs(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL, -- Оценка 1-5
    comment TEXT,
    created_at TIMESTAMP DEFAULT now()
);
