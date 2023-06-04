import { useEffect, useState } from "react";
import { Range } from "react-range";

function FilterForm({ data, onFilter, onClear, filterConfig }) {
  const [filters, setFilters] = useState({});
  const [purchaseDateStart, setPurchaseDateStart] = useState("");
  const [purchaseDateEnd, setPurchaseDateEnd] = useState("");

  useEffect(() => {
    // Apply filters when they change
    onFilter(filters);
  }, [filters]);

  useEffect(() => {
    // Reset filters when data changes
    // setFilters({});
  }, [data]);

  const handleClear = () => {
    // setFilters({});
    onFilter(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // value == object (range)
        return {
          ...prevFilters,
          [filterName]: {
            start: value.start,
            end: value.end,
          },
        };
      } else {
        // other like dropbox...
        return {
          ...prevFilters,
          [filterName]: value,
        };
      }
    });
  };

  const renderFilter = (filterName, filterType, options = {}) => {
    const normalizedType =
      typeof filterType === "object" ? filterType.type : filterType;
    switch (normalizedType) {
      case "Range": {
        const rangeValue = filters[filterName] || [options.min, options.max];
        if (rangeValue[0] === rangeValue[1]) rangeValue[1] += 1;  // avoid problems on first render (the data is not coming yet so both are 0)
        return (
          <div
            className="flex flex-col md:flex-row md:items-center flex-grow"
            key={filterName}
          >
            <label className="mr-2 font-bold">{filterName}:</label>
            <div className="flex space-x-2 items-center">
              <div className="w-12 text-center">{rangeValue[0]}</div>
              <Range
                values={rangeValue}
                step={1}
                min={rangeValue[0]}
                max={rangeValue[1]}
                onChange={(values) => handleFilterChange(filterName, values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 bg-gray-300 rounded"
                    style={{
                      width: "200px",
                      marginLeft: "calc(var(--thumb-size) / 2)",
                      marginRight: "calc(var(--thumb-size) / 2)",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
                  />
                )}
                renderValue={({ value }) => (
                  <div className="w-12 text-center">{value}</div>
                )}
              />
              <div className="w-12 text-center">{rangeValue[1]}</div>
            </div>
          </div>
        );
      }
      case "Dropdown": {
        const dropdownValue = filters[filterName] || "";
        const dropdownOptions = options.options || [];
        return (
          <div
            className="flex flex-col md:flex-row md:items-center flex-grow"
            key={filterName}
          >
            <label className="mr-2 font-bold">{filterName}:</label>
            <select
              value={dropdownValue}
              onChange={(e) => handleFilterChange(filterName, e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              {dropdownOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      }
      case "Date": {
        return (
          <div className="flex flex-col md:flex-row md:items-center flex-grow" key={filterName}>
            <label className="mr-2 font-bold">{filterName}:</label>
            <input
              type="month"
              value={purchaseDateStart}
              onChange={(e) => handleFilterChange(filterName, { start: e.target.value, end: purchaseDateEnd })}
              className="p-2 border border-gray-300 rounded"
            />
            <span className="mx-2">to</span>
            <input
              type="month"
              value={purchaseDateEnd}
              onChange={(e) => handleFilterChange(filterName, { start: purchaseDateStart, end: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        );
      }
      default:
        return <label>error</label>;
    }
  };

  return (
    <form className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 flex-wrap">
      {Object.entries(filterConfig).map(([filterName, filterType]) =>
        renderFilter(filterName, filterType, filterConfig[filterName])
      )}
      <div className="flex justify-end mt-4 md:mt-0">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Clear Filters
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
