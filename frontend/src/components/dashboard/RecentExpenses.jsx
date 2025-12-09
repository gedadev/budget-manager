import { LuChevronRight, LuDot, LuReceipt } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useFormatter } from "../../hooks/useFormatter";
import { useNavigate } from "react-router-dom";

export function RecentExpenses() {
  const { filteredExpenses, orderBy } = useExpenses();
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [showLast, setShowLast] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    setRecentExpenses(
      orderBy(filteredExpenses, "date-desc").slice(0, showLast)
    );
  }, [filteredExpenses]);

  const handleRecentExpensesChange = (e) => {
    const value = Number(e.target.value);
    const regex = /^\d+$/;
    if (!regex.test(value)) return;
    setShowLast(value);
    if (value < 1) return;
    setRecentExpenses(orderBy(filteredExpenses, "date-desc").slice(0, value));
  };

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md mt-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 my-4 text-xl">
          <LuReceipt />
          Recent Expenses
        </h2>
        <div className="flex items-center gap-4">
          <div>
            <button
              onClick={() => navigate("expenses")}
              className="rounded-md p-2 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all duration-200 ease-in-out"
            >
              Manage expenses
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="">Show last:</label>
            <input
              type="text"
              value={showLast}
              onChange={handleRecentExpensesChange}
              className="rounded-md p-2 w-12 text-center bg-transparent border border-slate-700 text-slate-300 focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {recentExpenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} />
        ))}
      </div>
    </section>
  );
}

const ExpenseItem = ({ expense }) => {
  const { getCategoryName, checkActiveCategory } = useCategories();
  const { formatDate, formatCurrency } = useFormatter();

  const getDate = (dateInput) => {
    const { date, day, month } = formatDate(dateInput);

    return `${day}, ${month} ${date}`;
  };

  return (
    <div className="w-full flex justify-between rounded-md border border-slate-600 p-3">
      <div>
        <div className="flex items-center gap-2">
          <span>{expense.commerce}</span>
          <LuChevronRight />
          <span>{expense.description}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-slate-400">
          <span
            className={`${
              !checkActiveCategory(expense.categoryId) && "line-through"
            }`}
          >
            {getCategoryName(expense.categoryId)}
          </span>
          {expense.subcategoryId && (
            <>
              <LuChevronRight />
              <span
                className={`${
                  !checkActiveCategory(expense.subcategoryId, true) &&
                  "line-through"
                }`}
              >
                {getCategoryName(expense.subcategoryId, true)}
              </span>
            </>
          )}
          <LuDot />
          <span>{getDate(expense.date)}</span>
        </div>
      </div>
      <div className="flex items-center">{formatCurrency(expense.amount)}</div>
    </div>
  );
};
