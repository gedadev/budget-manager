import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { useCategories } from "../hooks/useCategories";

export const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const { request, endpoints } = useApi();
  const { getCategoryName } = useCategories();
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

  function orderBy(expenses, order) {
    switch (order) {
      case "date-desc":
        return [...expenses].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case "date-asc":
        return [...expenses].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "amount-desc":
        return [...expenses].sort((a, b) => b.amount - a.amount);
      case "amount-asc":
        return [...expenses].sort((a, b) => a.amount - b.amount);
      case "category":
        return [...expenses].sort((a, b) => {
          const aCategory = getCategoryName(a.categoryId);
          const bCategory = getCategoryName(b.categoryId);

          return aCategory.localeCompare(bCategory);
        });
      case "commerce":
        return [...expenses].sort((a, b) =>
          a.commerce.localeCompare(b.commerce)
        );
      default:
        return expenses;
    }
  }

  const value = {
    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense,
    expenses,
    orderBy,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
