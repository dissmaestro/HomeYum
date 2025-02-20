import axios from 'axios';

// Указываем базовый URL (можно вынести в .env)
const API_URL = '/api'; // 

// Функция для получения сообщения от сервера
export const fetchMainMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/main`);
        return response.data.message;
    } catch (error) {
        console.error("Ошибка при запросе:", error);
        console.error("Ошибка при запросе:", );
        console.error("Ошибка при запросе:", error.response ? error.response.data : error.message);
        return "Ошибка!";
    }
};
