import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // 

// Функция для получения сообщения от сервера
export const fetchMainMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/main`);
        console.log("blyaaaaaaaaaaaaa")
        return response.data.message;
    } catch (error) {
        console.error("Ошибка при запросе:", error.response ? error.response.data : error.message);
        return "Ошибка!";
    }
};
