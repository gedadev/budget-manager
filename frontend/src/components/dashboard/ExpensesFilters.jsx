import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useExpenses } from "../../hooks/useExpenses";

export function ExpensesFilters({ cancelForm }) {
  const { activeCategories, defaultCategory } = useCategories();
  const { commerceList, descriptionList } = useExpenses();

  useEffect(() => {
    if (!cancelForm) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") cancelForm();
    };

    const handleClick = (event) => {
      const { id } = event.target;
      if (id === "filters-bg") cancelForm();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="bg-slate-800 max-w-6xl max-h-svh mx-auto p-4 rounded-md flex flex-col gap-4 overflow-auto">
      <div>
        <h3 className="my-2">Date</h3>
        <div className="flex items-center gap-1 text-slate-300 text-sm">
          <input type="radio" id="thisMonth" />
          <label htmlFor="thisMonth">This Month</label>
        </div>
        <div className="flex items-center gap-1 text-slate-300 text-sm">
          <input type="radio" id="lastMonth" />
          <label htmlFor="lastMonth">Last Month</label>
        </div>
        <div className="flex items-center gap-1 text-slate-300 text-sm">
          <input type="radio" id="thisYear" />
          <label htmlFor="thisYear">This Year</label>
        </div>
      </div>
      <div>
        <h3 className="my-2">Category</h3>
        <div className="flex flex-col gap-2 text-slate-300 text-sm">
          {activeCategories.map((category) => (
            <div key={category._id} className="flex items-center gap-1">
              <input type="checkbox" id={category._id} />
              <label htmlFor={category._id}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="my-2">Subcategory</h3>
        <div className="flex flex-col gap-2 text-slate-300 text-sm">
          {defaultCategory.subcategories.map((subcategory) => (
            <div key={subcategory._id} className="flex items-center gap-1">
              <input type="checkbox" id={subcategory._id} />
              <label htmlFor={subcategory._id}>{subcategory.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="my-2">Commerce</h3>
        <div className="flex flex-wrap gap-2 text-slate-300 text-sm">
          {commerceList.map((commerce) => (
            <div key={commerce} className="flex items-center gap-1">
              <input type="checkbox" id={commerce} />
              <label htmlFor={commerce}>{commerce}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="my-2">Description</h3>
        <div className="flex flex-wrap gap-2 text-slate-300 text-sm">
          {descriptionList.map((description) => (
            <div key={description} className="flex items-center gap-1">
              <input type="checkbox" id={description} />
              <label htmlFor={description}>{description}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button className="bg-cyan-500 text-slate-800 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-cyan-400 disabled:bg-cyan-600">
          Apply
        </button>
        <button
          onClick={cancelForm}
          className="text-slate-300 rounded-md p-2 transition-all duration-200 ease-in-out hover:text-slate-100"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
