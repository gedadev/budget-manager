import {
  LuChevronRight,
  LuDot,
  LuReceipt,
  LuSquarePen,
  LuTrash2,
} from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useFormatter } from "../../hooks/useFormatter";
import { toast } from "sonner";

export function ExpensesList() {
  const { expenses } = useExpenses();

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md mt-4">
      <h2 className="flex items-center gap-2 my-4 text-xl">
        <LuReceipt />
        Recent Expenses
      </h2>
      <div className="flex flex-col gap-2">
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} />
        ))}
      </div>
    </section>
  );
}

const ExpenseItem = ({ expense }) => {
  const { deleteExpense } = useExpenses();
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
        <h3>{expense.description}</h3>
        <div className="flex items-center gap-1 text-sm text-slate-400">
          <span>{expense.category}</span>
          <LuChevronRight />
          <span>{expense.subcategory}</span>
          <LuDot />
          <span>{getDate(expense.date)}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span>{formatCurrency(expense.amount)}</span>
        <div className="flex gap-4">
          <LuSquarePen className="text-cyan-500 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" />
          <LuTrash2
            className="text-red-400 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            onClick={() => handleExpenseDelete(expense._id)}
          />
        </div>
      </div>
    </div>
  );
};
