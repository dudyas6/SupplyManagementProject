import editImg from "../../../assets/icons/edit.png";
import { BsFillImageFill } from "react-icons/bs";
import { UpdateItem } from "../../../backend/DataFetching/ItemsHandler";
import { useEffect, useState } from "react";

export default function TableRow({ index, item }) {
  const [imageExists, setImageExists] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState({
    ItemImage: item.ItemImage,
    ItemName: item.ItemName,
    Description: item.Description,
    Price: item.Price,
    CurrentQuantity: item.CurrentQuantity,
    MinimumQuantity: item.MinimumQuantity,
  });
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-white";
  const itemId = item.ItemId;

  useEffect(() => {
    const img = new Image();
    img.src = item.ItemImage;
    img.onload = () => {
      setImageExists(true);
    };
    img.onerror = () => {
      setImageExists(false);
    };
  }, [item.ItemImage]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    UpdateItem(itemId, editedText);
    setIsEditing(false);
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <tr className={rowColor}>
      <td className="flex items-center justify-center py-2 border">
        {imageExists ? (
          <img src={item.ItemImage} alt="product" className="w-10 h-10" />
        ) : (
          <BsFillImageFill size={20} className="w-10 h-10" />
        )}
      </td>

      <td className="py-2 border">
        {isEditing ? (
          <input
            type="text"
            name="ItemName"
            value={editedText.ItemName}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          item.ItemName
        )}
      </td>
      <td className="w-1/2 py-2 border">
        {isEditing ? (
          <input
            type="text"
            name="Description"
            value={editedText.Description}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          item.Description
        )}
      </td>
      <td className="py-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="Price"
            value={editedText.Price}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          item.Price
        )}
      </td>
      <td className="py-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="CurrentQuantity"
            value={editedText.CurrentQuantity}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          item.CurrentQuantity
        )}
      </td>
      <td className="py-2 text-center border">
        {isEditing ? (
          <input
            type="text"
            name="MinimumQuantity"
            value={editedText.MinimumQuantity}
            onChange={handleInputChange}
            className="w-full"
          />
        ) : (
          item.MinimumQuantity
        )}
      </td>
      <td className="flex items-center justify-center py-2 border">
        {isEditing ? (
          <>
            <button onClick={handleSaveButtonClick}>Save</button>
            <button onClick={handleCancelButtonClick}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditButtonClick}>
            <img className="w-10 h-10" src={editImg} alt="edit" />
          </button>
        )}
      </td>
    </tr>
  );
}
