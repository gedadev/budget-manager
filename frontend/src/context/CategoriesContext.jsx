import { createContext } from "react";
import { useApi } from "../hooks/useApi";

export const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  const { request, endpoints } = useApi();

  async function addCategory(formData) {
    try {
      const newCategory = await request(endpoints.categories.new, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (newCategory instanceof Error) throw newCategory;

      return { success: true, message: "Category added" };
    } catch (error) {
      throw error;
    }
  }

  const value = { addCategory };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
