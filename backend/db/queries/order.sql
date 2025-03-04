-- Create one order
WITH new_order AS (
    -- Returning new order id
    INSERT INTO orders (customer_name, customer_lastname, adress, event_date, total_price)
    VALUES (@customer_name, @customer_lastname, @adress, @event_date, @total_price)  
    RETURNING id
)
-- Inxert postion od menu in order
INSERT INTO order_items (order_id, dish_id, quantity, total)
SELECT id, unnest(@dish_ids), unnest(@quantities), unnest(@totals)
FROM new_order;