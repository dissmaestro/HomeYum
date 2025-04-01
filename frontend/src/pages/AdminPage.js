import UploadDish from "../components/UploadDish"
import LogoutButton from "../components/Logout";
import { useState } from "react";
import PrivateDishesList from "../components/PrivateDishesList";

function AdminPage() {
    const [isDishModalOpen, setIsDishModalOpen] = useState(false); 
    const openDishModal = () => setIsDishModalOpen(true);
    const closeDishModal = () => setIsDishModalOpen(false);
    
    return (
      <div>
        <h1>Здравствуйте, Екатерина</h1>
        <button onClick={openDishModal}>Добавить блюдо</button> 
        <LogoutButton/>
        <UploadDish isOpen={isDishModalOpen} onClose={closeDishModal} />    
        <PrivateDishesList/>
      </div>
    );
  }
  
  export default AdminPage;