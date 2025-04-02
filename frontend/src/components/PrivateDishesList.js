import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; 
import { AuthContext } from "../context/AuthContext";
import DeleteDishButton from "../components/DeleteDish"
import "../css/dishList.css"
function PrivateDishesList() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const { token } = useContext(AuthContext);


  
  useEffect(() => {

    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/dishes", {
          headers: { Authorization: `Bearer ${token}` } // передаем токен
        }); 
        setDishes(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке блюд:", error);
        setError("❌ Не удалось загрузить блюда");
      } finally {
        setLoading(false);
      }
    };

    fetchDishes(); 
  }, [token]); 


  const handleDishDeleted = (deletedDishId) => { // for delete 
    setDishes(dishes.filter(dish => dish.id !== deletedDishId));
  };

  if (loading) return <p>⏳ Загрузка...</p>;

  console.log(dishes);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>🍽 Наши блюда</h2>
      {dishes.length === 0 ? (
        <p>⚠ Нет доступных блюд</p>
      ) : (
        <div className="grid">
          {dishes.map((dish) => (
            
            <div key={dish.id} className="dish-card">
              <img 
                src={dish.image_url ? `http://localhost:3001/${dish.image_url}` : null}  
                alt={dish.name} 
                onError={(e) => e.target.src = null} // fallback-картинка
              />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>💰 Цена: {dish.price}₽</p>
              <DeleteDishButton dishId={dish.id} token={token} onDelete={handleDishDeleted} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PrivateDishesList;
