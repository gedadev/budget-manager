import { useState } from "react";
import { colorOptions, emojisOptions } from "../../utils/main";
import { LuPlus } from "react-icons/lu";

export function CategoryForm() {
  const [newSubcategory, setNewSubcategory] = useState("");
  const [categoryData, setCategoryData] = useState({
    name: "",
    emoji: "🏷️",
    color: "#E67E22",
    subcategories: [],
  });

  const handleCategoryData = (e) => {
    const { name, value } = e.target;

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
      <div className="flex flex-col gap-1 text-sm">
        <label>Category name</label>
        <input
          type="text"
          placeholder="New Category"
          name="name"
          value={categoryData.name}
          onChange={handleCategoryData}
          className="bg-slate-700 text-slate-300 p-1 rounded focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p>Select an emoji</p>
        <div className="flex gap-1 flex-wrap">
          {emojisOptions.map((emoji) => (
            <span
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
          {colorOptions.map((color) => (
            <span
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
        <button className="border border-slate-600 text-slate-400 rounded p-1">
          Cancel
        </button>
        <button className="bg-cyan-500 text-slate-700 font-medium rounded p-1">
          Add Category
        </button>
      </div>
    </div>
  );
}
