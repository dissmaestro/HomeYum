import React, { useState, useEffect } from "react";
import "../css/dishList.css"
import { increment, decrement } from "../store/basketSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDishes } from "../store/dishesSlice";


function DishesList() {
  const dispatch = useDispatch();

  const { dishes, error, loading } = useSelector(selectDishes);

  if (loading) return <p>Загрузка...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Наши блюда</h2>
      {dishes.length === 0 ? (
        <p>Нет доступных блюд</p>
      ) : (
        <div className="grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card" data-id={dish.id}>
              <img 
                src={dish.image_url ? `http://localhost:3001/${dish.image_url}` : null}  
                alt={dish.name} 
              />
              <h2>{dish.name}</h2>
              <p>{dish.description}</p>
              <p>Цена: {dish.price}₽</p>
              <button onClick={ () => {dispatch(increment({id: dish.id}))}}>Добавить</button>
              <button onClick={ () => {dispatch(decrement({id: dish.id}))}}>Убрать</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DishesList;
