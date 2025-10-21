import { useEffect, useState } from "react";
import { colorOptions, emojisOptions } from "../../utils/main";
import { LuPlus } from "react-icons/lu";
import { useFormValidations } from "../../hooks/useFormValidations";

export function CategoryForm({ cancelForm }) {
  const { validateForm, handleBlur, formErrors } = useFormValidations();
  const [formIsValid, setFormIsValid] = useState();
  const [newSubcategory, setNewSubcategory] = useState("");
  const [categoryData, setCategoryData] = useState({
    name: "",
    emoji: "🏷️",
    color: "#E67E22",
    subcategories: [],
  });

  useEffect(() => {
    const isValid = validateForm({ categoryName: categoryData.name });

    setFormIsValid(isValid);
  }, [categoryData]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") cancelForm();
    };

    const handleClick = (event) => {
      const { id } = event.target;
      if (id === "modal-bg") cancelForm();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleCategoryData = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const e = { target: { name: "categoryName", value } };
      handleBlur(e);
    }
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubcategories = () => {
    const subcategoriesArray = [...categoryData.subcategories, newSubcategory];

    setCategoryData({ ...categoryData, subcategories: subcategoriesArray });
    setNewSubcategory("");
  };

  return (
    <div className="max-w-md p-4 border rounded-md border-slate-600 bg-slate-800 flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-2">New Category</h1>
      <div className="flex flex-col gap-1 text-sm relative">
        <label>Category name</label>
        <input
          type="text"
          placeholder="New Category"
          name="name"
          value={categoryData.name}
          onChange={handleCategoryData}
          className="bg-slate-700 text-slate-300 p-1 rounded focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
        />
        {formErrors?.categoryName && (
          <span className="absolute top-full right-0 bg-rose-500 text-slate-800 text-xs rounded p-1 bg-opacity-95 z-10 max-w-64">
            {formErrors.categoryName}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>Select an emoji</p>
        <div className="flex gap-1 flex-wrap">
          {emojisOptions.map((emoji, i) => (
            <span
              key={i}
              className={`border border-slate-600 rounded-md p-2 cursor-pointer ${
                categoryData.emoji === emoji && "border-cyan-400"
              }`}
              onClick={() =>
                handleCategoryData({ target: { name: "emoji", value: emoji } })
              }
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>Select a color</p>
        <div className="flex gap-2">
          {colorOptions.map((color, i) => (
            <span
              key={i}
              className={`w-9 h-9 rounded-md cursor-pointer ${
                categoryData.color === color && "border-2 border-slate-300"
              }`}
              onClick={() =>
                handleCategoryData({ target: { name: "color", value: color } })
              }
              style={{ backgroundColor: `${color}` }}
            ></span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>Subcategories</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add subcategory"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            className="w-full bg-slate-700 text-slate-300 p-1 rounded focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
          />
          <button
            className="bg-slate-700 rounded"
            onClick={handleSubcategories}
          >
            <LuPlus className="h-full w-full px-3 text-xl hover:scale-110 transition-all duration-200 ease-in-out" />
          </button>
        </div>
        <div className="flex gap-1 w-full text-slate-400 flex-wrap">
          {categoryData.subcategories.map((name) => (
            <span className="p-0.5 rounded border border-slate-600 min-w-fit">
              {name}
            </span>
          ))}
        </div>
      </div>
      <div className="text-sm flex justify-end gap-2">
        <button
          onClick={cancelForm}
          className="border border-slate-600 text-slate-400 rounded p-1"
        >
          Cancel
        </button>
        <button
          disabled={!formIsValid}
          className="bg-cyan-500 text-slate-700 font-medium rounded p-1 transition-all duration-200 ease-in-out hover:bg-cyan-400 disabled:bg-cyan-600"
        >
          Add Category
        </button>
      </div>
    </div>
  );
}
