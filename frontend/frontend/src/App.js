import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  // Запрос на сервер
  useEffect(() => {
    axios.get('http://localhost:8080/main')
      .then(response => {
        setMessage(response.data.message); // Устанавливаем ответ от сервера
      })
      .catch(error => {
        console.error('Ошибка при запросе:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;