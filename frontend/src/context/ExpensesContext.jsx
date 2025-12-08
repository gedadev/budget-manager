import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { useCategories } from "../hooks/useCategories";

export const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const defaultFilters = {
    date: "thisMonth",
    category: [],
    subcategory: [],
    commerce: [],
    description: [],
  };
  const { request, endpoints } = useApi();
  const { getCategoryName } = useCategories();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [commerceList, setCommerceList] = useState([]);
  const [descriptionList, setDescriptionList] = useState([]);
  const [activeFilters, setActiveFilters] = useState(defaultFilters);

  useEffect(() => {
    getExpenses();
  }, []);

  useEffect(() => {
    if (expenses.length === 0) return;
    filterExpenses(activeFilters);
  }, [expenses]);

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
      setLists(expensesData);
    } catch (error) {
      throw error;
    }
  }

  function setLists(expensesList) {
    setCommerceList(
      [...new Set(expensesList.map((expense) => expense.commerce))].sort()
    );
    setDescriptionList(
      [...new Set(expensesList.map((expense) => expense.description))].sort()
    );
  }

  function resetLists() {
    setLists(expenses);
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

  function handleFilterChange(e) {
    const { name, value, type } = e.target;

    const updateFilters = (prev) => {
      if (type === "radio" || name === "search") {
        return {
          ...prev,
          [name]: value,
        };
      }
      if (type === "checkbox") {
        const currentValues = [...prev[name]];

        if (currentValues.includes(value))
          return {
            ...prev,
            [name]: currentValues.filter((item) => item !== value),
          };

        return {
          ...prev,
          [name]: [...prev[name], value],
        };
      }

      return prev;
    };

    const updatedFilters = updateFilters(activeFilters);

    setActiveFilters(updatedFilters);
    filterExpenses(updatedFilters);
  }

  function filterExpenses(filters) {
    const filtered = expenses.filter((expense) => {
      const { date, category, subcategory, commerce, description, search } =
        filters;

      const dateMatch =
        date === "thisMonth"
          ? new Date(expense.date).getMonth() === new Date().getMonth()
          : date === "lastMonth"
          ? new Date(expense.date).getMonth() === new Date().getMonth() - 1
          : date === "thisYear"
          ? new Date(expense.date).getFullYear() === new Date().getFullYear()
          : true;
      const categoryMatch =
        category.length === 0
          ? true
          : category.includes(getCategoryName(expense.categoryId));
      const subcategoryMatch =
        subcategory.length === 0
          ? true
          : subcategory.includes(getCategoryName(expense.subcategoryId, true));
      const commerceMatch =
        commerce.length === 0 ? true : commerce.includes(expense.commerce);
      const descriptionMatch =
        description.length === 0
          ? true
          : description.includes(expense.description);
      const searchMatch = searchExpenses(search, expense);

      return (
        dateMatch &&
        categoryMatch &&
        subcategoryMatch &&
        commerceMatch &&
        descriptionMatch &&
        searchMatch
      );
    });

    setFilteredExpenses(filtered);
    setLists(filtered);
  }

  function searchExpenses(search, expense) {
    if (!search || !expense) return true;

    return (
      expense.description.toLowerCase().includes(search.toLowerCase()) ||
      expense.commerce.toLowerCase().includes(search.toLowerCase()) ||
      getCategoryName(expense.categoryId)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      getCategoryName(expense.subcategoryId, true)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  function resetFilters() {
    setActiveFilters(defaultFilters);
    filterExpenses(defaultFilters);
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
    commerceList,
    descriptionList,
    handleFilterChange,
    activeFilters,
    filteredExpenses,
    setLists,
    resetLists,
    resetFilters,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
