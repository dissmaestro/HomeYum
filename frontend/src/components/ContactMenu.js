import React, { Component } from "react";
import "../css/main.css";
import BasketIcon from "./BasketIcon";

class ContactMenu extends Component {
    render() {
        return (
            
            <div className="menu">
                <BasketIcon/>
                <button onClick={() => this.props.openModal("telegram")}>Telegram</button>
                <button onClick={() => this.props.openModal("whatsapp")}>WhatsApp</button>
                <button onClick={() => this.props.openModal("phone")}>Телефон</button>
            </div>
        );
    }
}

export default ContactMenu;