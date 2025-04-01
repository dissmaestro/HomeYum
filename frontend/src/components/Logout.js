import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
    return(
    <button onClick={handleLogout}>
        Выйти из панели администратора
    </button>
    )

};

export default LogoutButton;