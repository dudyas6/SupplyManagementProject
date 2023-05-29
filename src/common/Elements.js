import React from "react";

export function Card({ title, children }) {
  return (
    <div className="max-w-fitxl rounded overflow-hidden shadow-lg mt-8">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base">{children}</div>
      </div>
    </div>
  );
}

const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];
const bgColors = ["bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-red-600"];

export function Cube({ inx, big, small }) {
  const colorIndex = inx % colors.length;
  const bgColorIndex = inx % bgColors.length;

  return (
    <div
      className={`w-40 h-40 m-4 ${colors[colorIndex]} rounded-md shadow-md hover:${bgColors[bgColorIndex]}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-3xl font-bold text-white">{big}</span>
        <span className="text-base text-gray-200">{small}</span>
      </div>
    </div>
  );
}

export function WideCubeWithClick({ inx, big, small, additionText, onClick }) {
  const colorIndex = inx % colors.length;
  const bgColorIndex = inx % bgColors.length;
  const splittedColor = bgColors[bgColorIndex].split("-");
  const borderColorName = splittedColor[1] + "-" + splittedColor[2];
  return (
    <div
      onClick={onClick} 
      className={`border-l-8 border-${borderColorName} md:w-1/4 m-4 ${colors[colorIndex]} rounded-md shadow-md hover:${bgColors[bgColorIndex]} cursor-pointer`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className="text-3xl font-bold text-white">{big}</span>
        <span className="text-base text-gray-200">{small}</span>
        <span className="text-base text-gray-200">{additionText}</span>
      </div>
    </div>
  );
}

export function YesNoDialog({ messageToShow, onClose, onSubmit }) {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="flex flex-col p-6 rounded-lg bg-white-lightest">
        <div className="relative">
          <button
            onClick={onClose}
            className="top-0 right-0 float-right w-10 h-10 p-0 m-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
          >
            X
          </button>
        </div>
        <div className="text-center mb-6">{messageToShow}</div>
        <div className="flex justify-center">
          <button
            onClick={onSubmit}
            className="w-28 h-12 mr-4 font-bold text-white bg-green-500 hover:bg-green-700"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="w-28 h-12 font-bold text-white bg-red-500 hover:bg-red-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export class PopupWithInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = () => {
    const { inputValue } = this.state;
    this.props.onSubmit(inputValue);
    this.props.onClose();
  };

  render() {
    const { inputValue } = this.state;
    const { onClose } = this.props;

    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="flex flex-col p-6 rounded-lg bg-white-lightest">
          <div className="relative">
            <button
              onClick={onClose}
              className="top-0 right-0 float-right w-10 h-10 p-0 m-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700"
            >
              X
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="inputField" className="mr-2">
              {this.props.messageToShow}
            </label>
            <input
              type="text"
              id="inputField"
              value={inputValue}
              onChange={this.handleInputChange}
              className="px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter input"
            />
          </div>
          <button
            onClick={this.handleSubmit}
            className="w-full py-2 mt-4 font-bold text-white bg-green-500 hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export function TableCell(
  nameText,
  valueText,
  onChangeFunction,
  itemProperty,
  sizeProperty,
  isEditing
) {
  const size =
    sizeProperty === "small"
      ? "w-full text-center bg-gray-600 text-white"
      : "w-full bg-gray-600 text-white";
  return (
    <>
      {isEditing ? (
        <input
          type="text"
          name={nameText}
          value={valueText}
          onChange={onChangeFunction}
          className={size}
        />
      ) : (
        itemProperty
      )}
    </>
  );
}
