import UploadDish from "../components/UploadDish"
import DishesList from "../components/DishesList";
import { useState } from "react";

function AdminPage() {
    const [isDishModalOpen, setIsDishModalOpen] = useState(false); 
    const openDishModal = () => setIsDishModalOpen(true);
    const closeDishModal = () => setIsDishModalOpen(false);
    
    return (
      <div>
        <h1>Здравствуйте, Екатерина</h1>
        <button onClick={openDishModal}>Добавить блюдо</button> 
        <UploadDish isOpen={isDishModalOpen} onClose={closeDishModal} />    
        <DishesList />
      </div>
    );
  }
  
  export default AdminPage;