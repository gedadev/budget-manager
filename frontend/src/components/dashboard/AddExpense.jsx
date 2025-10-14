import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useFormValidations } from "../../hooks/useFormValidations";
import { useFormatter } from "../../hooks/useFormatter";

export function AddExpense() {
  const { addExpense } = useExpenses();
  const { formatCurrency, cleanCurrency, formatDateInput, formatLabel } =
    useFormatter();
  const {} = useFormValidations();
  const [formData, setFormData] = useState({
    amount: "",
    date: formatDateInput(new Date(Date.now())),
    commerce: "",
    description: "",
    category: "",
    subcategory: "",
    paymentMethod: "",
  });
  const formInputs = [
    {
      label: "Description",
      name: "description",
      type: "text",
      value: formData.description,
      placeholder: "What did you buy?",
    },
    {
      label: "Commerce",
      name: "commerce",
      type: "text",
      value: formData.commerce,
      placeholder: "Where did you buy it?",
    },
    {
      label: "Amount",
      name: "amount",
      type: "text",
      value: formatCurrency(formData.amount),
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      value: formData.date,
    },
  ];
  const formSelectors = [
    {
      label: "Category",
      name: "category",
      defaultValue: formData.category,
      options: ["basics", "lifestyle", "savings", "others"],
    },
    {
      label: "Subcategory",
      name: "subcategory",
      defaultValue: formData.subcategory,
      options: ["others"],
    },
    {
      label: "Payment Method",
      name: "method",
      defaultValue: formData.method,
      options: ["cash", "credit card"],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      setFormData({ ...formData, [name]: cleanCurrency(value) });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
  };

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md text-lg">
      <div className="flex items-center gap-2">
        <LuPlus /> Add expense
      </div>
      <form className="text-slate-200" onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          {formInputs.map((input, i) => (
            <div className="w-1/2 p-2 flex flex-col gap-2" key={i}>
              <label htmlFor={input.name}>{formatLabel(input.label)}</label>
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                placeholder={input.placeholder}
                value={input.value}
                onChange={handleChange}
                className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {formSelectors.map((selector, i) => (
            <div className="p-2 flex flex-col gap-2" key={i}>
              <label htmlFor={selector.name}>{selector.label}</label>
              <select
                name={selector.name}
                id={selector.name}
                defaultValue={selector.value}
                onChange={handleChange}
                className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
              >
                {selector.options.map((option, i) => (
                  <option value={option} key={i}>
                    {formatLabel(option)}
                  </option>
                ))}
              </select>
            </div>
          ))}
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
