import { useNavigate } from "react-router-dom";
import { FaBasketShopping } from "react-icons/fa6";
import { useSelector} from 'react-redux';
import { selectBasket } from "../store/basketSlice";
import { useMemo } from "react";
import "../css/BasketIcon.css"

function BasketIcon() {
  const navigate = useNavigate();
  const basket = useSelector(selectBasket);
  const totalCount = useMemo(() => {
    return basket.reduce((sum, item) => sum + (item ?? 0), 0);
  }, [basket]);

  const handleClick = () => {
    navigate("/basket");
  };

  return (
  <div className="basket-wrapper">
    <FaBasketShopping 
      className="basket-icon" 
      onClick={handleClick}
    />
    {totalCount > 0 && (
        <span className="basket-count">{totalCount}</span>
      )}
  </div>
  );
}

export default BasketIcon;
