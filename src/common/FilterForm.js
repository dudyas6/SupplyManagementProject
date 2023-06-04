import { useEffect, useState } from "react";
import { Range } from "react-range";

function FilterForm({ data, onFilter, filterConfig }) {
  const [filters, setFilters] = useState({});
  const [purchaseDateStart, setPurchaseDateStart] = useState("");
  const [purchaseDateEnd, setPurchaseDateEnd] = useState("");

  useEffect(() => {
    // Apply filters when they change
    onFilter(filters);
  }, [filters]);

  useEffect(() => {
    // Reset filters when data changes
    setFilters({});
  }, [data]);

  const handleClear = () => {
    setFilters({});
    onFilter(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      if (typeof value === "object" && value !== null) {
        // value == object (range)
        return {
          ...prevFilters,
          [filterName]: {
            start: value[0],
            end: value[1],
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
        const rangeValue = (filters[filterName] && [
          filters[filterName]["start"],
          filters[filterName]["end"],
        ]) || [options.min, options.max];

        if (options.max === 0) options.max += 1;

        const min = options.min;
        const max = options.max;
        const step = 1;

        const sanitizedRangeValue = [
          Math.max(min, Math.min(rangeValue[0], max)),
          Math.max(min, Math.min(rangeValue[1], max)),
        ];

        return (
          <div
            className="flex flex-col md:flex-row md:items-center flex-grow"
            key={filterName}
          >
            <label className="mr-2 font-bold">{filterName}:</label>
            <div className="flex space-x-2 items-center">
              <div className="w-12 text-center">{sanitizedRangeValue[0]}</div>
              <Range
                values={sanitizedRangeValue}
                step={step}
                min={min}
                max={Math.ceil(max)}
                onChange={(currentRange) =>
                  handleFilterChange(filterName, currentRange)
                }
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
              <div className="w-12 text-center">
                {Math.ceil(sanitizedRangeValue[1])}
              </div>
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
          <div
            className="flex flex-col md:flex-row md:items-center flex-grow"
            key={filterName}
          >
            <label className="mr-2 font-bold">{filterName}:</label>
            <input
              type="month"
              value={purchaseDateStart}
              onChange={(e) => {
                handleFilterChange(filterName, [
                  e.target.value,
                  purchaseDateEnd,
                ]);
                setPurchaseDateStart(e.target.value);
              }}
              className="p-2 border border-gray-300 rounded"
            />
            <span className="mx-2">to</span>
            <input
              type="month"
              value={purchaseDateEnd}
              onChange={(e) => {
                handleFilterChange(filterName, [
                  purchaseDateStart,
                  e.target.value,
                ]);
                setPurchaseDateEnd(e.target.value);
              }}
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
      <div className="flex justify-center md:justify-start">

        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded ml-4"
        >
          Clear All
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
