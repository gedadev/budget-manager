import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  const { request, endpoints } = useApi();
  const [categories, setCategories] = useState();
  const [subcategories, setSubcategories] = useState();
  const [activeCategories, setActiveCategories] = useState();
  const [defaultCategory, setDefaultCategory] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!activeCategories) return;

    if (activeCategories.length === 0) {
      setDefaultCategory({});
      return;
    }

    const firstCategory = activeCategories[0];
    const foundDefault = activeCategories.filter(
      (category) => category.default
    );
    setDefaultCategory(foundDefault._id ? foundDefault : firstCategory);
  }, [activeCategories]);

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
      const { categoriesData } = await request(endpoints.categories.all);

      if (categoriesData instanceof Error) throw categoriesData;

      const subcategoriesData = categoriesData
        .map((category) => category.subcategories)
        .flat();

      setCategories(categoriesData);
      setSubcategories(subcategoriesData);

      const activeCategories = categoriesData
        .filter((category) => !category.deleted)
        .map((category) => ({ ...category }));

      const activeCategoriesWithActiveSubs = activeCategories.filter(
        (category) => {
          const activeSubcategories = category.subcategories?.filter(
            (subcategory) => !subcategory.deleted
          );
          category.subcategories = activeSubcategories
            ? [...activeSubcategories]
            : [];

          return true;
        }
      );

      setActiveCategories(activeCategoriesWithActiveSubs);
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
    if (!subcategories || !subcategoryId) return;

    const [subcategory] = subcategories.filter(
      (subcategory) => subcategory._id === subcategoryId
    );

    return subcategory.name;
  }

  function checkActiveCategory(id, isSubcategory) {
    if (!categories || !subcategories || !id) return;

    if (isSubcategory) {
      const [subcategory] = subcategories.filter(
        (subcategory) => subcategory._id === id
      );
      return !subcategory.deleted;
    }

    const [category] = categories.filter((category) => category._id === id);
    return !category.deleted;
  }

  const value = {
    addCategory,
    checkUsedCategory,
    deleteCategory,
    updateCategory,
    activeCategories,
    defaultCategory,
    getCategoryName,
    getSubcategoryName,
    checkActiveCategory,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
