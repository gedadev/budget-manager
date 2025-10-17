import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ExpensesContext } from "./ExpensesContext";
import { useAuth } from "../hooks/useAuth";

export function ExpensesProvider({ children }) {
  const { request, endpoints } = useApi();
  const { isLogged } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();
  }, [isLogged]);

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

  async function getExpenses() {
    try {
      const expensesData = await request(endpoints.expenses.all);

      if (expensesData instanceof Error) throw expensesData;

      setExpenses([...expensesData]);
    } catch (error) {
      throw error;
    }
  }

  async function deleteExpense(expenseId) {
    try {
      const deletedExpense = await request(
        `${endpoints.expenses.update}/${expenseId}`,
        {
          method: "DELETE",
        }
      );

      if (deletedExpense instanceof Error) throw deletedExpense;

      getExpenses();
      return deletedExpense;
    } catch (error) {
      throw error;
    }
  }

  const value = { addExpense, getExpenses, deleteExpense, expenses };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
