import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const ExpensesContext = createContext(null);

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

      getExpenses();
      return newExpense;
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

  async function updateExpense(formData, expenseId) {
    try {
      const updatedExpense = await request(
        `${endpoints.expenses.update}/${expenseId}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
        }
      );

      if (updatedExpense instanceof Error) throw updatedExpense;

      getExpenses();
      return updatedExpense;
    } catch (error) {
      throw error;
    }
  }

  const value = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    expenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
