import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext";

export function useExpenses() {
  const context = useContext(ExpensesContext);

  return context;
}
