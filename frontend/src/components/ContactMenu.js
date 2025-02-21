import React, { Component } from "react";
import "../css/main.css"; // Подключаем стили

class ContactMenu extends Component {
    render() {
        return (
            <div className="menu">
                <button onClick={() => this.props.openModal("telegram")}>Telegram</button>
                <button onClick={() => this.props.openModal("whatsapp")}>WhatsApp</button>
                <button onClick={() => this.props.openModal("phone")}>Телефон</button>
            </div>
        );
    }
}

export default ContactMenu;