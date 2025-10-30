import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import {
  LuPlus,
  LuSquarePen,
  LuTag,
  LuTrash2,
  LuTriangleAlert,
} from "react-icons/lu";
import { useCategories } from "../../hooks/useCategories";
import { toast } from "sonner";

export function CategoriesList() {
  const [activeDeleteModal, setActiveDeleteModal] = useState();
  const [usedCategory, setUsedCategory] = useState();
  const [activeFormModal, setActiveFormModal] = useState(false);
  const [formAction, setFormAction] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { checkUsedCategory, deleteCategory, categories } = useCategories();

  const cancelForm = () => {
    setActiveFormModal(false);
    setActiveDeleteModal(false);
  };

  const handleDelete = async (categoryId, used) => {
    await toast.promise(deleteCategory(categoryId, used), {
      loading: "Deleting category...",
      success: (success) => {
        activeDeleteModal && setActiveDeleteModal(false);
        return success.message;
      },
      error: (error) => error.message,
    });
  };

  const handleDeleteModal = async (category) => {
    const { used, count } = await checkUsedCategory(category._id);

    if (!used) {
      handleDelete(category._id, used);
      return;
    }
    setSelectedCategory(category);
    setUsedCategory({ used, count });
    setActiveDeleteModal(true);
  };

  const handleAddModal = () => {
    setSelectedCategory(null);
    setFormAction("new");
    setActiveFormModal(true);
  };

  const handleEditModal = (category) => {
    setSelectedCategory(category);
    setFormAction("edit");
    setActiveFormModal(true);
  };

  return (
    <section className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {categories?.map((category) => (
        <div
          key={category._id}
          className={
            "flex flex-col justify-between p-2 w-full h-full bg-slate-700 rounded min-h-40 relative"
          }
          style={{ borderTop: `solid 0.2rem ${category.color}` }}
        >
          <div className="flex gap-2 text-lg">
            <span>{category.emoji}</span>
            <span>{category.name}</span>
          </div>
          <div>
            <h3 className="text-slate-300 text-sm py-2 flex items-center gap-1">
              <LuTag /> Subcategories ({category.subcategories?.length})
            </h3>
            <div className="flex gap-1">
              {category.subcategories?.map((subcategory) => (
                <span
                  key={subcategory._id}
                  className="py-0.5 px-1 rounded-lg border border-slate-500 min-w-fit bg-slate-600 text-sm text-slate-400"
                >
                  {subcategory.name}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 m-3 flex gap-2">
            <LuSquarePen
              onClick={() => handleEditModal(category)}
              className="text-cyan-500 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            />
            <LuTrash2
              onClick={() => handleDeleteModal(category)}
              className="text-red-400 cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
            />
          </div>
        </div>
      ))}
      <div
        onClick={handleAddModal}
        className="flex flex-col items-center justify-center gap-1 cursor-pointer w-full h-full bg-slate-700 rounded min-h-40 border-2 border-slate-500 hover:border-cyan-600 transition-all duration-300 ease-in-out"
      >
        <button className="text-2xl text-cyan-500">
          <LuPlus />
        </button>
        <h2>Add New Category</h2>
        <span className="text-xs text-slate-400">Click to create</span>
      </div>
      <div
        id="modal-bg"
        className={`${
          activeFormModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed top-0 right-0 min-h-screen min-w-full flex items-center justify-center bg-slate-900 bg-opacity-75 transition-all duration-200 ease-in-out`}
      >
        {activeFormModal && (
          <CategoryForm
            cancelForm={cancelForm}
            formAction={formAction}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
      <div
        id="modal-bg"
        className={`${
          activeDeleteModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed top-0 right-0 min-h-screen min-w-full flex items-center justify-center bg-slate-900 bg-opacity-75 transition-all duration-200 ease-in-out`}
      >
        {activeDeleteModal && (
          <DeleteDialog
            usedCategory={usedCategory}
            selectedCategory={selectedCategory}
            handleDelete={handleDelete}
            cancelForm={cancelForm}
          />
        )}
      </div>
    </section>
  );
}

const DeleteDialog = ({
  usedCategory,
  selectedCategory,
  handleDelete,
  cancelForm,
}) => {
  return (
    <div className="max-w-md p-4 border rounded-md border-slate-600 bg-slate-800 flex flex-col gap-4 mx-2">
      <h3 className="flex items-center gap-2 text-red-500">
        <LuTriangleAlert /> Warning
      </h3>
      <span className="text-sm">
        This category is used in {usedCategory.count} expenses. It will be
        hidden from future entries but still visible in expenses. Continue?
      </span>
      <div className="flex justify-end gap-4">
        <button
          className="p-1 rounded-md hover:bg-slate-700 transition duration-200 ease-in-out"
          onClick={cancelForm}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 p-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
          onClick={() => handleDelete(selectedCategory._id, usedCategory.used)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
