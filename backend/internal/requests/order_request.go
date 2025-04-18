package requests

import "HomeYum/internal/db"

type FullOrderRequest struct {
	Order db.CreateOrderParams        `json:"order"`
	Items []db.CreateOrderItemsParams `json:"items"`
}
