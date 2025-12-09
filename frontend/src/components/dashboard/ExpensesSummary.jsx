import { useExpenses } from "../../hooks/useExpenses";
import { useFormatter } from "../../hooks/useFormatter";
import { useState } from "react";

export function ExpensesSummary() {
  const { totalsByCategory, handleTotalsFilterChange, totalsFilters } =
    useExpenses();
  const { formatCurrency } = useFormatter();
  const [showBy, setShowBy] = useState("category");

  return (
    <section>
      <div className="max-w-6xl mx-auto my-4 flex items-center justify-between">
        <h2>Expenses by category</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="date">Date:</label>
            <select
              id="date"
              defaultValue={totalsFilters.date}
              onChange={handleTotalsFilterChange}
              name="date"
              className="bg-slate-700 rounded-md border border-slate-600 p-2 focus:outline-slate-500 focus:outline-none focus:outline-offset-0 "
            >
              <option value="thisMonth">This month</option>
              <option value="lastMonth">Last month</option>
              <option value="thisYear">This year</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="groupBy">Show:</label>
            <select
              id="groupBy"
              defaultValue="category"
              onChange={(e) => setShowBy(e.target.value)}
              className="bg-slate-700 rounded-md border border-slate-600 p-2 focus:outline-slate-500 focus:outline-none focus:outline-offset-0 "
            >
              <option value="category">Categories</option>
              <option value="subcategory">Subcategories</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto max-w-6xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {totalsByCategory.map((category) => (
          <div
            key={category._id}
            className={`bg-slate-800 p-4 rounded-md flex flex-col ${
              showBy === "category"
                ? "gap-14 justify-between"
                : "gap-4 justify-start"
            }`}
            style={{ borderTop: `solid 0.2rem ${category.color}` }}
          >
            <div className="flex items-center gap-2">
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </div>
            {showBy === "category" && (
              <div className="flex flex-col gap-2">
                <span>{formatCurrency(category.expensesSum)}</span>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>
                    {`${category.expensesCount} ${
                      category.expensesCount === 1 ? "expense" : "expenses"
                    }`}
                  </span>
                  <span>
                    {`${category.subcategories.length} ${
                      category.subcategories.length === 1
                        ? "subcategory"
                        : "subcategories"
                    }`}
                  </span>
                </div>
              </div>
            )}
            {showBy === "subcategory" && (
              <div className="flex flex-col gap-2">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory._id}>
                    <div>
                      <span className="text-slate-200">
                        {formatCurrency(subcategory.expensesSum)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs text-slate-400">
                        {subcategory.name}
                      </span>
                      <span className="text-xs text-slate-400">{`${
                        subcategory.expensesCount
                      } ${
                        subcategory.expensesCount === 1 ? "expense" : "expenses"
                      }`}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
