import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  const { request, endpoints } = useApi();
  const [categories, setCategories] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  async function addCategory(formData) {
    try {
      const newCategory = await request(endpoints.categories.new, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (newCategory instanceof Error) throw newCategory;

      getCategories();
      return { success: true, message: "Category added" };
    } catch (error) {
      throw error;
    }
  }

  async function getCategories() {
    try {
      const categories = await request(endpoints.categories.all);

      if (categories instanceof Error) throw categories;

      setCategories(categories);
    } catch (error) {
      throw error;
    }
  }

  async function deleteCategory(categoryId) {
    try {
      const deleted = await request(
        `${endpoints.categories.update}/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (deleted instanceof Error) throw deleted;

      getCategories();
      return { message: deleted.message };
    } catch (error) {
      throw error;
    }
  }

  async function updateCategory(data, categoryId) {
    try {
      const updated = await request(
        `${endpoints.categories.update}/${categoryId}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );

      if (updated instanceof Error) throw updated;

      getCategories();
      return { message: updated.message };
    } catch (error) {
      throw error;
    }
  }

  const value = { addCategory, deleteCategory, updateCategory, categories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
