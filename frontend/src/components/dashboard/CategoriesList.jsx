import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { LuPlus, LuTag } from "react-icons/lu";
import { useCategories } from "../../hooks/useCategories";

export function CategoriesList() {
  const [activeModal, setActiveModal] = useState(false);
  const { categories } = useCategories();

  const cancelForm = () => {
    setActiveModal(false);
  };

  return (
    <section className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {categories?.map((category) => (
        <div
          key={category._id}
          className={
            "flex flex-col justify-between p-2 w-full h-full bg-slate-700 rounded min-h-40"
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
        </div>
      ))}
      <div
        onClick={() => setActiveModal(true)}
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
          activeModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed top-0 right-0 min-h-screen min-w-full flex items-center justify-center bg-slate-900 bg-opacity-75 transition-all duration-200 ease-in-out`}
      >
        {activeModal && <CategoryForm cancelForm={cancelForm} />}
      </div>
    </section>
  );
}
