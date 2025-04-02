import axios from "axios";
import { useState } from "react";
import "../css/dish.css";

function UploadDish({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Состояние загрузки
  const [message, setMessage] = useState(""); // Сообщение об ошибке/успехе
  const token = localStorage.getItem("token")

  if (!isOpen) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || name === "" || description === "" || price === "") {
      setMessage("⚠️ Заполните все поля!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("image", image);

    try {
      setLoading(true); // Начинаем загрузку
      setMessage(""); // Очищаем старые сообщения
      
      const response = await axios.post("http://localhost:3001/private/dishes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("Блюдо создано:", response.data);
      setMessage("✅ Блюдо успешно добавлено!");
      
      // Очищаем форму после успешной отправки
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      e.target.reset(); // Сбрасываем <input type="file">
    } catch (error) {
      console.error("Ошибка при создании блюда:", error);
      setMessage("❌ Ошибка при создании блюда.");
    } finally {
      setLoading(false); // Останавливаем загрузку
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h2>Добавить новое блюдо</h2>
      {message && <p style={{ color: message.includes("Ошибка") ? "red" : "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Название" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Описание" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Цена" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Создать блюдо"}
        </button >
        <button onClick={onClose} className="close-btn">Закрыть</button>
      </form>
      </div>
    </div>
  );
}

export default UploadDish;
