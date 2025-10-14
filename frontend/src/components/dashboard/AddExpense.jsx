import { useState } from "react";
import { LuPlus } from "react-icons/lu";

export function AddExpense() {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
    subcategory: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md text-lg">
      <div className="flex items-center gap-2">
        <LuPlus /> Add expense
      </div>
      <form className="text-slate-200" onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="w-1/2 p-2 flex flex-col gap-2">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            />
          </div>
          <div className="w-1/2 p-2 flex flex-col gap-2">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            />
          </div>
          <div className="w-full p-2 flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="What did you buy?"
              value={formData.description}
              onChange={handleChange}
              className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="p-2 flex flex-col gap-2">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              defaultValue={formData.category}
              onChange={handleChange}
              className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            >
              <option value="">Select a category</option>
            </select>
          </div>
          <div className="p-2 flex flex-col gap-2">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              name="subcategory"
              id="subcategory"
              defaultValue={formData.subcategory}
              onChange={handleChange}
              className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            >
              <option value="">Optional</option>
            </select>
          </div>
          <div className="p-2 flex flex-col gap-2">
            <label htmlFor="method">Payment Method</label>
            <select
              name="method"
              id="method"
              defaultValue={formData.paymentMethod}
              onChange={handleChange}
              className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
            >
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
        <div className="px-2 mt-2">
          <button
            type="submit"
            className="bg-cyan-500 text-slate-700 w-full rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-cyan-400"
          >
            Add Expense
          </button>
        </div>
      </form>
    </section>
  );
}
