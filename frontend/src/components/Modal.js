import React, { Component } from "react";
import "../css/main.css"; // Подключаем стили

class Modal extends Component {
    render() {
        return (
            <div className="modal">
                {this.props.content}
                <button className="close" onClick={this.props.closeModal}>Закрыть</button>
            </div>
        );
    }
}

export default Modal;
