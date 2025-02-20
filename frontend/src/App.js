import { useEffect, useState } from "react";
import { fetchMainMessage } from "./api";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchMainMessage().then(setMessage);
    }, []);

    return <h1>{message}</h1>;
}

export default App;