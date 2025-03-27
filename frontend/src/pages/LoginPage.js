import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("user", login);
            formData.append("pass", password);
            
            const response = await fetch("http://localhost:3001/private/login", {
                "method": "POST",
                "body": formData,
            });
            
            if (!response.ok) {
                throw new Error("Error authentification")
            }

            const data = await response.json() 
            console.log("User login: ", data, " time: ", new Date().toLocaleString());
            if (data.token){
                localStorage.setItem("token", data.token)
                navigate("/dashboard")
            } else {
                setPassword("")
                alert("Bad auth data 😰")
            }
        } catch (error){
            console.error("Error during authentofication", error)
            alert("Retry later 😭")
        };
    };

    return (
        <div>
            <h2>Вход в личный кабинет</h2>
            <input
                type="text"
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
        </div>
    )

};

export default LoginPage;