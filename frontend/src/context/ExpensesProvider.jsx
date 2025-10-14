import { ExpensesContext } from "./ExpensesContext";

export function ExpensesProvider({ children }) {
  const value = {};

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
