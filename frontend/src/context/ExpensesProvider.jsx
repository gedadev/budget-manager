import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { ExpensesContext } from "./ExpensesContext";

export function ExpensesProvider({ children }) {
  const { request, endpoints } = useApi();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();
  }, []);

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

  const value = { addExpense, getExpenses, expenses };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
