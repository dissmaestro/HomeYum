import React from "react";

const DeleteDishButton = ({dishId, token, onDelete}) => {
    const deleteDish = async () => {
        if (!window.confirm("Вы уверены, что хотите удалить это блюдо?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/private/dishes/${dishId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
            });
            
            if (response.status === 204){
                alert("Блюдо успешно удалено!");
                if (onDelete) onDelete(dishId); 
            } else {
                alert("Не удалось удалить блюдо");
            }
        
        } catch (error){
            console.error("Ошибка удаления блюда, ", error);
            alert("Ошибка при удалении блюда");
        }
    };
    return <button onClick={deleteDish} >Удалить</button>;
}
export default DeleteDishButton;
