import { LuFilter, LuFilterX, LuSearch } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useRef, useState } from "react";

export function ExpensesToolBar({ handleFilterModal, handleExpensesOrderBy }) {
  const { resetFilters, activeFilters, handleFilterChange } = useExpenses();
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);

  const isFiltered = () =>
    Object.values(activeFilters)
      .filter((filter) => Array.isArray(filter))
      .reduce((acc, filter) => acc || filter.length > 0, false);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    handleFilterChange(e);
  };

  return (
    <div className="flex gap-8">
      <div className="flex items-center gap-2 grow">
        <input
          type="text"
          placeholder="Search"
          name="search"
          value={searchValue}
          onChange={handleSearch}
          ref={searchInputRef}
          className="w-full rounded-md border border-slate-700 p-2 text-slate-300 bg-transparent focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
        />
        <LuSearch
          onClick={() => searchInputRef.current.focus()}
          className="text-slate-400 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
        />
      </div>
      <div className="flex items-center gap-4">
        {isFiltered() && (
          <div>
            <LuFilterX
              className="text-red-500 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
              onClick={resetFilters}
            />
          </div>
        )}
        <div>
          <LuFilter
            className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={handleFilterModal}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="orderBy">Order by:</label>
          <select
            name="orderBy"
            id="orderBy"
            className="rounded-md border border-slate-700 p-2 text-slate-300 bg-transparent focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            onChange={(e) => handleExpensesOrderBy(e.target.value)}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
            <option value="commerce">Commerce</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
    </div>
  );
}
