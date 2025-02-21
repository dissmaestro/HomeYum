import React, { useState } from "react";
import Message from "./components/Message";
import Header from "./components/Header";
import ContactMenu from "./components/ContactMenu";
import Modal from "./components/Modal";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");


    const openModal = (type) => {
        let content = "";
        if (type === "telegram") {
            content = <p>Мой Telegram: <a href="https://t.me/@Rokcet" target="_blank" rel="noopener noreferrer">@your_username</a></p>;
        } else if (type === "whatsapp") {
            content = <p>Мой WhatsApp: <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Написать</a></p>;
        } else if (type === "phone") {
            content = <p>Мой номер: +7 (800) 555-35-35</p>;
        }
    
        setModalContent(content); // Устанавливаем содержимое
        setIsModalOpen(true); // Открываем модальное окно
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
    <div className="header">
    <Header title="Welcome to the KateKatering, professional chefs redy to cook for you"/>
    <h1 className="body">
        <Message />
    </h1>
    {/* Меню контактов */}
    <ContactMenu openModal={openModal} />
            {/* Модальное окно (появляется только при открытии) */}
            {isModalOpen && <Modal content={modalContent} closeModal={closeModal} />}
    </div>
    )
}

export default App;