import {
  LuArrowLeft,
  LuChevronRight,
  LuDot,
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
import { ExpensesToolBar } from "./ExpensesToolBar";
import { useNavigate } from "react-router-dom";
import { useScreen } from "../../hooks/useScreen";

export function Expenses() {
  const { filteredExpenses, orderBy } = useExpenses();
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [formAction, setFormAction] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [orderedExpenses, setOrderedExpenses] = useState([]);
  const [activeFilterModal, setActiveFilterModal] = useState(false);
  const navigate = useNavigate();

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

  const handleFilterModal = () => setActiveFilterModal(!activeFilterModal);

  const handleExpensesOrderBy = (option) => {
    setOrderedExpenses(orderBy(filteredExpenses, option));
  };

  return (
    <section className="max-w-6xl mx-auto min-h-screen pt-5">
      <header className="w-full">
        <div className="flex items-center gap-2 text-3xl">
          <LuArrowLeft
            className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={() => navigate(-1)}
          />
          <h1>Expenses</h1>
        </div>
        <div className="text-sm text-slate-400 px-2">
          <p>Manage your expenses</p>
        </div>
      </header>
      <div className="bg-slate-800 p-4 mt-4 rounded-md flex flex-col gap-4">
        <ExpensesToolBar
          handleFilterModal={handleFilterModal}
          handleExpensesOrderBy={handleExpensesOrderBy}
        />
        {filteredExpenses.length === 0 ? (
          <p className="text-slate-400 text-center">No expenses found</p>
        ) : (
          <div className="flex flex-col gap-2">
            {orderedExpenses.map((expense) => (
              <ExpenseItem
                key={expense._id}
                expense={expense}
                handleEditModal={handleEditModal}
              />
            ))}
          </div>
        )}

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
      </div>
    </section>
  );
}

const ExpenseItem = ({ expense, handleEditModal }) => {
  const { deleteExpense } = useExpenses();
  const { getCategoryName, checkActiveCategory } = useCategories();
  const { formatDate, formatCurrency } = useFormatter();
  const { isMobile } = useScreen();

  const getDate = (dateInput) => {
    const { date, day, month } = formatDate(dateInput);

    return isMobile
      ? `${month.slice(0, 3)} ${date}`
      : `${day}, ${month} ${date}`;
  };

  const handleExpenseDelete = async (expenseId) => {
    await toast.promise(deleteExpense(expenseId), {
      loading: "Deleting...",
      success: (deletedExpense) => deletedExpense.message,
      error: (error) => error.message,
    });
  };

  return (
    <div className="w-full flex justify-between items-center rounded-md border border-slate-600 p-3">
      <div>
        <div className="flex items-center gap-2">
          <span>{expense.commerce}</span>
          <LuChevronRight />
          <span>{expense.description}</span>
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-400">
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
      <div className="flex items-center gap-2 sm:gap-6 flex-col sm:flex-row">
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
