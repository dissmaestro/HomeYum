import React, { useState } from "react";
import Message from "./components/Message";
import Header from "./components/Header";
import ContactMenu from "./components/ContactMenu";
import Modal from "./components/Modal";
import UploadDish from "./components/UploadDish"
import DishesList from "./components/DishesList";


const App = () => {
    const [isDishModalOpen, setIsDishModalOpen] = useState(false); 
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const openDishModal = () => setIsDishModalOpen(true);
    const closeDishModal = () => setIsDishModalOpen(false);

    const openInfoModal = (type) => {
        let content = "";
        if (type === "telegram") {
            content = <p>Мой Telegram: <a href="https://t.me/@Rokcet" target="_blank" rel="noopener noreferrer">@Rokcet</a></p>;
        } else if (type === "whatsapp") {
            content = <p>Мой WhatsApp: <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Написать</a></p>;
        } else if (type === "phone") {
            content = <p>Мой номер: <a href="tel:+78005553535">+7 (800) 555-35-35</a></p>;
        }
    
        setModalContent(content); 
        setIsInfoModalOpen(true); 
    };
    
    const closeInfoModal = () => {
        setIsInfoModalOpen(false);
    };

    return (
        <div className="header">
            <Header title="Welcome to the KateKatering, professional chefs ready to cook for you" />
            <Message />
            <ContactMenu openModal={openInfoModal} /> 
            {isInfoModalOpen && <Modal content={modalContent} closeModal={closeInfoModal} />}

            <button onClick={openDishModal}>Добавить блюдо</button>
            <UploadDish isOpen={isDishModalOpen} onClose={closeDishModal} />
            
            <DishesList /> 
        </div>
    );
};

export default App;