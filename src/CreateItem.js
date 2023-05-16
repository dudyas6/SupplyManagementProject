import React from "react";

export default function CreateItem() {

  return (
    <div className="flex-row">
        <div className="flex-1 mx-2 md:flex-row lg:flex-row">
            <div className="w-full mb-2 border border-gray-300 border-solid rounded shadow-sm">
                <div className="px-2 py-3 bg-gray-200 border-b border-gray-200 border-solid">
                    Add New Item
                </div>
                <div className="p-3">
                    <form className="w-full">
                        <div className="flex flex-wrap mb-6 -mx-3">
                            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                                <label className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
                                        for="grid-name">
                                    Name
                                </label>
                                <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
                                        id="grid-name" type="text" placeholder="Hammer"/>
                                <p className="text-xs italic text-red-500">Please fill out this field.</p>
                            </div>
                            <div className="w-full px-3 md:w-1/2">
                                <label className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
                                        for="grid-description">
                                    Description
                                </label>
                                <input className="block w-full px-4 py-3 leading-tight bg-gray-200 border border-gray-200 rounded appearance-none text-grey-darker focus:outline-none focus:bg-white-500 focus:border-gray-600"
                                        id="grid-description" type="text" placeholder="5 kg hammer"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6 -mx-3">
                            <div className="w-full px-3">
                                <label className="block mb-1 text-xs font-light tracking-wide uppercase text-grey-darker"
                                        for="grid-min-quant">
                                    Minimum Quantity (Add here an explanation)
                                </label>
                                <input className="block w-full px-4 py-3 mb-3 leading-tight border rounded appearance-none bg-grey-200 text-grey-darker border-grey-200 focus:outline-none focus:bg-white focus:border-grey"
                                        id="grid-min-quant" type="password" placeholder="******************"/>
                                <p className="text-xs italic text-grey-dark">Set the minimum amount before getting alert (?!)</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-2 -mx-3">
                            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                                <label className="block mb-1 text-xs font-light tracking-wide uppercase text-grey-darker"
                                        for="grid-city">
                                    City
                                </label>
                                <input className="block w-full px-4 py-3 leading-tight border rounded appearance-none bg-grey-200 text-grey-darker border-grey-200 focus:outline-none focus:bg-white focus:border-grey"
                                        id="grid-city" type="text" placeholder="Albuquerque"/>
                            </div>
                            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                                <label className="block mb-1 text-xs font-light tracking-wide uppercase text-grey-darker"
                                        for="grid-category">
                                    Category
                                </label>
                                <div className="relative">
                                    <select className="block w-full px-4 py-3 pr-8 leading-tight border rounded appearance-none bg-grey-200 border-grey-200 text-grey-darker focus:outline-none focus:bg-white focus:border-grey"
                                            id="grid-category">
                                        <option>Office Supplies (Pens, paper, notebooks)</option>
                                        <option>IT Equipment (Computers, laptops, monitors)</option>
                                        <option>Furniture (Desks, chairs, filing cabinets)</option>
                                        <option>Safety Equipment (Helmets, goggles, gloves)</option>
                                        <option>Packaging Materials (Boxes, cartons, tapes)</option>
                                        <option>Cleaning Supplies (Brooms, vacuum cleaners, trash cans)</option>
                                        <option>Maintenance Tools(Power tools, hand tools, toolkits)</option>
                                        <option>Catering Supplies (Plates, cups, napkins)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-grey-darker">
                                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                                <label className="block mb-1 text-xs font-light tracking-wide uppercase text-grey-darker"
                                        for="grid-other">
                                    what to do here?
                                </label>
                                <input className="block w-full px-4 py-3 leading-tight border rounded appearance-none bg-grey-200 text-grey-darker border-grey-200 focus:outline-none focus:bg-white focus:border-grey"
                                        id="grid-other" type="text" placeholder="90210"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
