import React, { useState, useEffect } from "react";
import axios from "axios"; 
import "../css/dishList.css"

function DishesList() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 


  useEffect(() => {
    // Upload dishes
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/dishes"); 
        setDishes(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке блюд:", error);
        setError("Не удалось загрузить блюда");
        setLoading(false);
      }
    };

    fetchDishes(); 
  }, []); 

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
            <div key={dish.id} className="dish-card">
              <img 
                src={dish.image_url ? `http://localhost:3001/${dish.image_url}` : null}  
                alt={dish.name} 
              />
              <h2>{dish.name}</h2>
              <p>{dish.description}</p>
              <p>Цена: {dish.price}₽</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DishesList;
