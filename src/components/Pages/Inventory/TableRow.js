import editImg from "../../../assets/icons/edit2.png";
import deleteImg from "../../../assets/icons/delete.png";
import cancelImg from "../../../assets/icons/cancel.png";
import saveImg from "../../../assets/icons/save.png";
import { BsFillImageFill } from "react-icons/bs";
import { DeleteItem, UpdateItem } from "../../../backend/DataFetching/ItemsHandler";
import { useEffect, useState } from "react";
import { TableCell } from "../../../common/Elements";

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
  const [initialText, setInitialText] = useState();
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
    setInitialText(editedText);
  };

  const handleSaveButtonClick = () => {
    UpdateItem(itemId, editedText);
    setIsEditing(false);
  };

  const handleCancelButtonClick = () => {
    setEditedText(initialText);
    setIsEditing(false);
  };

  const handleDeleteButtonClick = () => {
    DeleteItem(itemId);
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
        {TableCell(
          "ItemName",
          editedText.ItemName,
          handleInputChange,
          item.ItemName,
          "large",
          isEditing
        )}
      </td>
      <td className="w-1/2 py-2 border">
        {TableCell(
          "Description",
          editedText.Description,
          handleInputChange,
          item.Description,
          "large",
          isEditing
        )}
      </td>
      <td className="py-2 text-center border">
        {TableCell(
          "Price",
          editedText.Price,
          handleInputChange,
          item.Price,
          "small",
          isEditing
        )}
      </td>
      <td className="py-2 text-center border">
        {TableCell(
          "CurrentQuantity",
          editedText.CurrentQuantity,
          handleInputChange,
          item.CurrentQuantity,
          "small",
          isEditing
        )}
      </td>
      <td className="py-2 text-center border">
        {TableCell(
          "MinimumQuantity",
          editedText.MinimumQuantity,
          handleInputChange,
          item.MinimumQuantity,
          "small",
          isEditing
        )}
      </td>
      <td className="flex items-center justify-center py-2 border">
        {isEditing ? (
          <>
            <button onClick={handleSaveButtonClick}>
              <img className="w-10 h-10" src={saveImg} alt="save" />
            </button>
            <button onClick={handleCancelButtonClick}>
              <img className="w-10 h-10" src={cancelImg} alt="cancel" />
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEditButtonClick}>
              <img className="w-10 h-10" src={editImg} alt="edit" />
            </button>
            <button onClick={handleDeleteButtonClick}>
              <img className="w-10 h-10" src={deleteImg} alt="delete" />
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
