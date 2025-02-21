import React, { useEffect, useState } from "react";
import { fetchMainMessage } from "../api/api";

const Message = () => {
    const [message, setMessage] = useState("Загрузка...");

    useEffect(() => {
        fetchMainMessage().then(setMessage);
    }, []);

    return <h3>{message}</h3>;
};

export default Message;