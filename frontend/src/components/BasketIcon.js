import { useNavigate } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";

function BasketIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/basket");
  };

  return (
    <FaBasketShopping 
      className="basket-icon" 
      onClick={handleClick}
    />
  );
}

export default BasketIcon;
