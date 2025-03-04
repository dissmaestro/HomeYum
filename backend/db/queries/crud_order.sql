-- name: CreateOrder :one
INSERT INTO orders (customer_name, customer_lastname, adress, event_date, total_price)
VALUES (@customer_name, @customer_lastname, @adress, @event_date, @total_price)
RETURNING id;

-- name: CreateOrderItems :copyfrom
INSERT INTO order_items (order_id, dish_id, quantity, total)
VALUES (@order_id, @dish_id, @quantity, @total);