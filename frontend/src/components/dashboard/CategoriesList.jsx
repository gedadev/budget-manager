import { useState } from "react";
import { CategoryForm } from "./CategoryForm";
import { LuPlus } from "react-icons/lu";

export function CategoriesList() {
  const [activeModal, setActiveModal] = useState(false);

  const cancelForm = () => {
    setActiveModal(false);
  };

  return (
    <section className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
