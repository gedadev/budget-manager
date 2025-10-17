import { LuReceipt, LuTrash2 } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";

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
          <div
            key={expense._id}
            className="w-full flex justify-between border rounded-md border-slate-600 py-2 px-3"
          >
            <div>
              <h3>{expense.description}</h3>
              <div className="flex gap-2 text-sm text-slate-400">
                <span>{expense.category}</span>
                <span>{expense.subcategory}</span>
                <span>{expense.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span>{expense.amount}</span>
              <div>
                <LuTrash2 className="text-red-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
