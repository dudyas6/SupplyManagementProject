import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { InsertNewItem } from "../../../backend/DataFetching/ItemsHandler";

export default function AddItemPopup({}) {
  var name, description, price, currentQuantity, minimumQuantity;
  const [image, setImage] = React.useState("");

  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  function InsertProcess() {
    name = document.getElementById("name").value;
    description = document.getElementById("description").value;
    price = document.getElementById("price").value;
    currentQuantity = document.getElementById("currentQuantity").value;
    minimumQuantity = document.getElementById("minimumQuantity").value;

    if (
      !validateAllInputs(
        image,
        name,
        description,
        price,
        currentQuantity,
        minimumQuantity
      )
    )
      return;

    const item = InsertNewItem(
      {
        ItemImage: image,
        ItemName: name,
        Description: description,
        Price: price,
        CurrentQuantity: currentQuantity,
        MinimumQuantity: minimumQuantity,
      },
      thenFunc
    );
    return item;
  }

  async function InsertWrap() {
    const item = await InsertProcess();
    // onChange(item);
  }

  function thenFunc() {
    let msg = "Item inserted to database successfully";
    setMsgBox("success", msg);
    setTimeout(() => {
      // onAccept(true);
      // onClose();
    }, 2000);
  }

  function validateAllInputs(
    image,
    name,
    description,
    price,
    currentQuantity,
    minimumQuantity
  ) {
    let isValid = true;
    let errorMsg = "";
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    const allFields = [
      image,
      name,
      description,
      price,
      currentQuantity,
      minimumQuantity,
    ];

    allFields.forEach((field) => {
      if (field.trim() === "" || field === null) {
        errorMsg = "Please fill all fields<br />";
        isValid = false;
      }
    });

    if (!urlRegex.test(image)) {
      errorMsg += "Please enter a valid image URL";
      isValid = false;
    }

    setMsgBox("error", errorMsg);
    return isValid;
  }

  function setMsgBox(msgType, msg) {
    const errorBox = document.getElementById("error-box");
    if (msgType === "error") {
      errorBox.style.color = "red";
      errorBox.innerHTML = msg;
    } else {
      errorBox.style.color = "green";
      errorBox.innerHTML = msg;
    }
    return;
  }
  return (
    <div>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-60 z-20"></div>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-30">
        <div className="flex flex-col p-4 rounded-lg bg-white-lightest">
          <div className="relative">
            <form id="form_id" className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-light mb-1">
                    Product Name
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700"
                    type="text"
                    placeholder="Please Enter Product Name"
                  />
                  <div className="w-full">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                      Product Description
                    </label>
                    <textarea
                      className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700 min-h-[8rem]"
                      type="text"
                      placeholder="Enter Product Description"
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="border border-gray-300 px-4 py-3 rounded-lg">
                    <label
                      htmlFor="image"
                      className="text-gray-700 flex items-center justify-center"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt="Invalid"
                          className="w-full h-40 object-contain rounded-lg image-preview overflow-hidden"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-20 w-20 border-2 border-gray-300 rounded-lg">
                          <BsQuestionCircle className="h-8 w-8 text-gray-500" />
                        </div>
                      )}
                      <span className="ml-2"></span>
                    </label>
                    <input
                      className="appearance-none block w-full text-gray-700 border rounded py-1 px-4 mb-3 leading-tight focus:outline focus:bg-white-700"
                      type="text"
                      placeholder="Enter Image URL"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                    Starting Quantity
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-200 text-grey-darker bg-gray-200 border rounded py-3 px-4 leading-tight"
                    type="number"
                    value={0}
                    disabled={true}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                    Minimum Quantity
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700"
                    type="number"
                    min={0}
                    placeholder="0"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                    Product Price
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700"
                    type="number"
                    min={0}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Buttons Section */}
              <div className="mt-5 space-x-2">
                <button className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
                <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                  close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
