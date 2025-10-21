import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext";

export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}
