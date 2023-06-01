import editImg from "../../../assets/icons/edit2.png";
import deleteImg from "../../../assets/icons/delete.png";
import cancelImg from "../../../assets/icons/cancel.png";
import saveImg from "../../../assets/icons/save.png";
import plusImg from "../../../assets/icons/plus.png";
import { BsFillImageFill } from "react-icons/bs";
import {
  DeleteItem,
  UpdateItem,
} from "../../../backend/DataFetching/ItemsHandler";
import { useEffect, useState } from "react";
import { TableCell } from "../../../common/Elements";

export default function TableRow({ index, item, newOrderPopup, delegateItem }) {
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
  const isUnderMinimum = item.CurrentQuantity < item.MinimumQuantity;
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

  const handlePlusButtonClick = () => {
    newOrderPopup(true);
    delegateItem(item);
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
    <tr className={isUnderMinimum ? `bg-red-200 hover:${rowColor}` : rowColor}>
      <td className="py-2 border">
        <div className="flex items-center justify-center">
          {imageExists ? (
            <img src={item.ItemImage} alt="product" className="w-10 h-10" />
          ) : (
            <BsFillImageFill size={20} className="w-10 h-10" />
          )}
        </div>
      </td>
      <td className={`py-2 border w-1/6`}>
        <div className="w-auto">
          {TableCell(
            "ItemName",
            editedText.ItemName,
            handleInputChange,
            item.ItemName,
            "large",
            isEditing
          )}
        </div>
      </td>
      <td className="w-1/2 py-2 border">
        <div className="">
          {TableCell(
            "Description",
            editedText.Description,
            handleInputChange,
            item.Description,
            "large",
            isEditing
          )}
        </div>
      </td>
      <td className="py-2 text-center border">
        <div
          className="flex items-center justify-center"
          style={{ width: "120px" }}
        >
          {TableCell(
            "Price",
            editedText.Price,
            handleInputChange,
            item.Price,
            "small",
            isEditing
          )}
        </div>
      </td>
      <td className="py-2 text-center border">{item.CurrentQuantity}</td>
      <td className="py-2 text-center border">
        <div className="flex items-center justify-center">
          {TableCell(
            "MinimumQuantity",
            editedText.MinimumQuantity,
            handleInputChange,
            item.MinimumQuantity,
            "small",
            isEditing
          )}
        </div>
      </td>
      <td className="py-2 text-center border">
        <div className="flex items-center justify-center">
          {isEditing ? (
            <div className="flex">
              <button className="mr-2" onClick={handlePlusButtonClick}>
                <img className="w-6 h-6" src={plusImg} alt="plus" />
              </button>
              <button className="mr-2" onClick={handleSaveButtonClick}>
                <img className="w-6 h-6" src={saveImg} alt="save" />
              </button>
              <button onClick={handleCancelButtonClick}>
                <img className="w-6 h-6" src={cancelImg} alt="cancel" />
              </button>
            </div>
          ) : (
            <div className="flex">
              <button className="mr-2" onClick={handleEditButtonClick}>
                <img className="w-6 h-6" src={editImg} alt="edit" />
              </button>
              <button onClick={handleDeleteButtonClick}>
                <img className="w-6 h-6" src={deleteImg} alt="delete" />
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
