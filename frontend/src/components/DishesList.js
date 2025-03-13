import React, { useState, useEffect } from "react";
import axios from "axios"; 

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
        <div>
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card" style={styles.dishCard}>
              <img 
                // src={dish.imageUrl ? `http://localhost:3001/${dish.imageUrl}` : "/default-image.jpg"} 
                src={`http://localhost:3001/${dish.imageUrl}`} 
                alt={dish.name} 
                style={styles.image} 
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


const styles = {
  dishCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // оказывается можно и так стили совать
    width: "250px",
    display: "inline-block",
    textAlign: "center",
  },
  image: {
    width: "auto",
    height: "auto",
    borderRadius: "10px",
  }
};


export default DishesList;
