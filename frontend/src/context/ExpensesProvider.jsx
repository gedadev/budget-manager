import { useApi } from "../hooks/useApi";
import { ExpensesContext } from "./ExpensesContext";

export function ExpensesProvider({ children }) {
  const { request, endpoints } = useApi();

  async function addExpense(formData) {
    try {
      const newExpense = await request(endpoints.expenses.new, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (newExpense instanceof Error) throw newExpense;

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  const value = { addExpense };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
