import React, { useEffect } from "react";
import { InsertNewItem } from "../../../backend/DataFetching/ItemsHandler";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";

export default function AddItemPopup({ onClose, handleChangeItems }) {
  const [image, setImage] = React.useState("");
  const [imageValid, setImageValid] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameValid, setNameValid] = React.useState(false);
  const [descriptionValid, setDescriptionValid] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [minimumQuantity, setMinimumQuantity] = React.useState(0);

  useEffect(() => {
    const img = new Image();
    let invalid_img_url =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIYNXKzO7XHDK_mlo4aCPhsrLG61t-L_IezADgIeKu7Wb7ih9jblI73x92fANb6238jHU&usqp=CAU";
    img.src = image;
    img.onload = () => {
      setImageValid(true);
    };
    img.onerror = () => {
      setImageValid(false);
      setImage(invalid_img_url);
    };
  }, [image]);

  function requestSubmit(e) {
    e.preventDefault();
    console.log(nameValid && descriptionValid);
    if (!(nameValid && descriptionValid)) {
      setMsgBox("error", "Please fill all the fields");
      return;
    }
    InsertWrap();
  }

  function InsertProcess() {
    const item = InsertNewItem(
      {
        ItemImage: image,
        ItemName: name,
        Description: description,
        Price: price,
        CurrentQuantity: 0,
        MinimumQuantity: minimumQuantity,
      },
      thenFunc
    );
    return item;
  }

  async function InsertWrap() {

    const item = await InsertProcess();
    handleChangeItems(item);
  }

  function thenFunc() {
    console.log("thenFunc");
    let msg = "Item inserted to database successfully";
    setMsgBox("success", msg);
    setTimeout(() => {
      onClose();
    }, 2000);
  }

  function setMsgBox(msgType, msg) {
    const errorBox = document.getElementById("error-box");
    if (msgType === "error") {
      errorBox.style.color = "red";
      errorBox.innerHTML = msg;
      errorBox.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
      errorBox.style.color = "green";
      errorBox.innerHTML = msg;
      errorBox.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    }
    return;
  }

  useEffect(() => {
    // ADD VALIDATIONS
    name.length > 0 ? setNameValid(true) : setNameValid(false);
    description.length > 0
      ? setDescriptionValid(true)
      : setDescriptionValid(false);
  }, [name, description, price, minimumQuantity, image]);
  return (
    <div>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-60 z-20"></div>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-30">
        <div className="flex flex-col p-4 rounded-lg bg-white-lightest">
          <div className="relative">
            <div className="w-full text-center mb-3 font-bold">New Product</div>
            <form id="form_id" className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="ml-8 block uppercase tracking-wide text-gray-700 text-xs font-light mb-1">
                    Product Name
                  </label>
                  <div className="flex flex-row items-center justify-center">
                    {nameValid ? (
                      <BiCheckCircle className="h-8 w-8 text-green-500 mb-3" />
                    ) : (
                      <BiErrorCircle
                        title={"Product name shouldn't be empty"}
                        className="h-8 w-8 text-red-500 mb-3"
                      />
                    )}
                    <input
                      className="appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Please Enter Product Name"
                    />
                  </div>
                  <div className="w-full">
                    <label className="ml-8 block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                      Product Description
                    </label>
                    <div className="flex flex-row">
                      {descriptionValid ? (
                        <BiCheckCircle className="h-8 w-8 text-green-500 mb-3" />
                      ) : (
                        <BiErrorCircle
                          title={"Description shouldn't be empty"}
                          className="h-8 w-8 text-red-500 mb-3"
                        />
                      )}
                      <textarea
                        className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700 min-h-[8rem]"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Product Description"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="border border-gray-300 px-4 py-3 rounded-lg">
                    <label
                      htmlFor="image"
                      className="text-gray-700 flex items-center justify-center"
                    >
                      {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                      <img
                        src={image}
                        className="w-full h-40 object-contain rounded-lg image-preview overflow-hidden"
                      />

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

              <div className="flex flex-row -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1">
                    Minimum Quantity
                  </label>
                  <input
                    className="appearance-none block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline focus:bg-white-700"
                    type="number"
                    onChange={(e) => setMinimumQuantity(e.target.value)}
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
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Buttons Section */}
              <div className="mt-5 space-x-2 flex flex-row ">
                <button
                  onClick={requestSubmit}
                  className="max-h-14 bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className="max-h-14 bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
                <div className="flex text-center self-center w-full">
                  <span id="error-box" className="w-full"></span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
