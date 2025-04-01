import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; 
import { AuthContext } from "../context/AuthContext";
import DeleteDishButton from "../components/DeleteDish"
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

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>🍽 Наши блюда</h2>
      {dishes.length === 0 ? (
        <p>⚠ Нет доступных блюд</p>
      ) : (
        <div style={styles.grid}>
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card" style={styles.dishCard}>
              <img 
                src={dish.imageUrl ? `http://localhost:3001/${dish.imageUrl}` : null}  
                alt={dish.name} 
                style={styles.image} 
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

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
  },
  dishCard: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "15px",
    margin: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    width: "260px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    objectFit: "cover",
  },
};

export default PrivateDishesList;
