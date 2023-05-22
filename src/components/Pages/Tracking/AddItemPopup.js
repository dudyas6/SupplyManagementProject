import React from "react";
import { useState } from "react";

export function AddItemPopup({ isOpen, onClose }) {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);
    // Add more state variables as needed for the form fields
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform the necessary logic to add the item with the form data
      // You can access the form data using the state variables
  
      // Clear the form fields after submitting
      setItemName('');
      setItemQuantity(0);
  
      // Close the popup after submitting
      onClose();
    };
  
    return (
      <div className={`popup ${isOpen ? 'open' : 'closed'}`}>
        <div className="popup-content">
          <h2>Add Item</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Item Name:
              <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
            </label>
            <label>
              Quantity:
              <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.valueAsNumber)} />
            </label>
            {/* Add more form fields as needed */}
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    );
  }