import { useSelector, useDispatch } from "react-redux";
import { selectBasket, increment, decrement, remove } from "../store/basketSlice";
import { selectDishes } from "../store/dishesSlice";
import { useMemo } from "react";

const Basket = () => {
    const dispatch = useDispatch();
    const basket = useSelector(selectBasket);
    const dishes = useSelector(selectDishes).dishes;

    const ArrayBasket = Object.entries(basket); 

    const fullItems = ArrayBasket.map(([id, count]) => {
        const dish = dishes.find(d => d.id === parseInt(id));
        if (dish){
            return { ...dish, count };
        }
        return null
    }).filter(item => item !== null);;

    const totalPrice = useMemo(() => {
       return fullItems.reduce((sum, item) => 
        sum + (item.price * item.count), 0);
    }, [fullItems]);

    
    return (
        <div>
          {fullItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <div>
              {fullItems.map((item) => (
                
                <div key={item.id} className="basket-item">
                    {item.image_url && (
                        <img 
                            src={`http://localhost:3001/${item.image_url}`} 
                            alt={item.name} 
                            className="basket-item-image"
                        />
                    )}
                  <h3>{item.name}</h3>
                  <p>Цена: {item.price}₽</p>
                  <p>Количество: {item.count}</p>
                  <div className="item-actions">
                    <button onClick={() => dispatch(increment({ id: item.id }))} className="increment-button" >+</button>
                    <button onClick={() => dispatch(decrement({ id: item.id }))} className="decrement-button">-</button>
                    <button onClick={() => dispatch(remove({ id: item.id }))} className="remove-button">Удалить</button>
                  </div>
                </div>
              ))}
              <h3 className="total-price">Общая сумма: {totalPrice}₽</h3>
            </div>
          )}
        </div>
      );
};


export default Basket;