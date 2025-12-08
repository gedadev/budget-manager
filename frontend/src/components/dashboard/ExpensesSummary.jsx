import { useExpenses } from "../../hooks/useExpenses";
import { useFormatter } from "../../hooks/useFormatter";

export function ExpensesSummary() {
  const { totalsByCategory } = useExpenses();
  const { formatCurrency } = useFormatter();

  return (
    <section>
      <div className="w-full mx-auto max-w-6xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {console.log(totalsByCategory)}
        {totalsByCategory.map((category) => (
          <div
            key={category._id}
            className="bg-slate-800 p-4 rounded-md flex flex-col justify-between gap-14"
            style={{ borderTop: `solid 0.2rem ${category.color}` }}
          >
            <div className="flex items-center gap-2">
              <span>{category.emoji}</span>
              <span>{category.name}</span>
            </div>
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
          </div>
        ))}
      </div>
    </section>
  );
}
