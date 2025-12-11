import { ExpenseForm } from "./ExpenseForm";
import { ExpensesSummary } from "./ExpensesSummary";
import { RecentExpenses } from "./RecentExpenses";
import { ExpensesHeader } from "./ExpensesHeader";

export function Home() {
  return (
    <div>
      <ExpensesHeader />
      <ExpenseForm />
      <ExpensesSummary />
      <RecentExpenses />
    </div>
  );
}
