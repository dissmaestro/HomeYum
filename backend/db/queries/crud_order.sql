-- name: CreateOrder :one
INSERT INTO orders (customer_name, customer_lastname, adress, event_date, total_price)
VALUES (@customer_name, @customer_lastname, @adress, @event_date, @total_price)
RETURNING id;

-- name: CreateOrderItems :copyfrom
INSERT INTO order_items (order_id, dish_id, quantity, total)
VALUES (@order_id, @dish_id, @quantity, @total);

-- name: GetFullOrderInfo :many
SELECT 
    o.id AS order_id, 
    o.customer_name, 
    o.customer_lastname, 
    o.adress, 
    o.event_date, 
    o.created_at, 
    i.dish_id, 
    d.name AS dish_name, 
    i.quantity, 
    i.total AS item_total
FROM orders o
JOIN order_items i
ON o.id = i.order_id
JOIN dishes d 
ON i.dish_id = d.id
WHERE o.id = @id;