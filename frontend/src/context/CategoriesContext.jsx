import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  const { request, endpoints } = useApi();
  const [categories, setCategories] = useState();
  const [defaultCategory, setDefaultCategory] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!categories) return;

    if (categories.length === 0) {
      setDefaultCategory({});
      return;
    }

    const firstCategory = categories[0];
    const foundDefault = categories.filter((category) => category.default);
    setDefaultCategory(foundDefault._id ? foundDefault : firstCategory);
  }, [categories]);

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

  async function checkUsedCategory(categoryId) {
    try {
      const isUsed = await request(
        `${endpoints.categories.update}/${categoryId}`
      );

      return isUsed;
    } catch (error) {
      throw error;
    }
  }

  async function deleteCategory(categoryId, used) {
    try {
      const deleted = await request(
        `${endpoints.categories.update}/${categoryId}?used=${used}`,
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

  function getCategoryName(categoryId) {
    if (!categories || !categoryId) return;

    const [category] = categories.filter(
      (category) => category._id === categoryId
    );

    return category.name;
  }

  function getSubcategoryName(subcategoryId) {
    if (!categories || !subcategoryId) return;

    const subcategories = categories
      .map((category) => category.subcategories)
      .flat();
    const [subcategory] = subcategories.filter(
      (subcategory) => subcategory._id === subcategoryId
    );

    return subcategory.name;
  }

  const value = {
    addCategory,
    checkUsedCategory,
    deleteCategory,
    updateCategory,
    categories,
    defaultCategory,
    getCategoryName,
    getSubcategoryName,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
