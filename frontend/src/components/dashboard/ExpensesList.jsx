import {
  LuChevronRight,
  LuDot,
  LuFilter,
  LuFilterX,
  LuReceipt,
  LuSquarePen,
  LuTrash2,
} from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useFormatter } from "../../hooks/useFormatter";
import { useCategories } from "../../hooks/useCategories";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { ExpensesFilters } from "./ExpensesFilters";

export function ExpensesList() {
  const { expenses, filteredExpenses, handleFilterChange, orderBy } =
    useExpenses();
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [formAction, setFormAction] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [orderedExpenses, setOrderedExpenses] = useState([]);
  const [activeFilterModal, setActiveFilterModal] = useState(false);

  useEffect(() => {
    handleFilterChange({
      target: { name: "date", value: "thisMonth", type: "radio" },
    });
  }, [expenses]);

  useEffect(() => {
    setOrderedExpenses(orderBy(filteredExpenses, "date-desc"));
  }, [filteredExpenses]);

  const cancelForm = () => setActiveEditModal(false);
  const cancelFilters = () => setActiveFilterModal(false);

  const handleEditModal = (expense) => {
    setActiveEditModal(true);
    setFormAction("edit");
    setSelectedExpense(expense);
  };

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md mt-4">
      <div className="flex items-center gap-4">
        <div>
          <LuFilter
            className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={() => setActiveFilterModal(!activeFilterModal)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="orderBy">Order by:</label>
          <select
            name="orderBy"
            id="orderBy"
            className="rounded-md border border-slate-600 p-2 text-slate-300 bg-transparent focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            onChange={(e) =>
              setOrderedExpenses(orderBy(filteredExpenses, e.target.value))
            }
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
      <h2 className="flex items-center gap-2 my-4 text-xl">
        <LuReceipt />
        Recent Expenses
      </h2>
      <div className="flex flex-col gap-2">
        {orderedExpenses.map((expense) => (
          <ExpenseItem
            key={expense._id}
            expense={expense}
            handleEditModal={handleEditModal}
          />
        ))}
      </div>

      <div
        id="modal-bg"
        className={`${
          activeEditModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed top-0 right-0 min-h-screen min-w-full flex items-center justify-center bg-slate-900 bg-opacity-75 transition-all duration-200 ease-in-out`}
      >
        {activeEditModal && (
          <ExpenseForm
            cancelForm={cancelForm}
            formAction={formAction}
            selectedExpense={selectedExpense}
          />
        )}
      </div>
      <div
        id="filters-bg"
        className={`${
          activeFilterModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed top-0 right-0 min-h-screen min-w-full flex items-center justify-center bg-slate-900 bg-opacity-75 transition-all duration-200 ease-in-out`}
      >
        {activeFilterModal && <ExpensesFilters cancelForm={cancelFilters} />}
      </div>
    </section>
  );
}

const ExpenseItem = ({ expense, handleEditModal }) => {
  const { deleteExpense } = useExpenses();
  const { getCategoryName, checkActiveCategory } = useCategories();
  const { formatDate, formatCurrency } = useFormatter();

  const getDate = (dateInput) => {
    const { date, day, month } = formatDate(dateInput);

    return `${day}, ${month} ${date}`;
  };

  const handleExpenseDelete = async (expenseId) => {
    await toast.promise(deleteExpense(expenseId), {
      loading: "Deleting...",
      success: (deletedExpense) => deletedExpense.message,
      error: (error) => error.message,
    });
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
      <div className="flex items-center gap-6">
        <span>{formatCurrency(expense.amount)}</span>
        <div className="flex gap-4">
          <LuSquarePen
            className="text-cyan-500 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={() => handleEditModal(expense)}
          />
          <LuTrash2
            className="text-red-400 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={() => handleExpenseDelete(expense._id)}
          />
        </div>
      </div>
    </div>
  );
};
