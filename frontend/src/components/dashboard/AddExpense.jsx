import { useState } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useFormValidations } from "../../hooks/useFormValidations";
import { useFormatter } from "../../hooks/useFormatter";

export function AddExpense() {
  const { addExpense } = useExpenses();
  const { formatCurrency, cleanCurrency, formatDateInput } = useFormatter();
  const { formErrors, handleBlur, resetErrors } = useFormValidations();
  const [formData, setFormData] = useState({
    amount: "",
    date: formatDateInput(new Date(Date.now())),
    commerce: "",
    description: "",
    category: "basics",
    subcategory: "other",
    method: "cash",
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
      options: [
        { label: "🌳 Basics", name: "basics" },
        { label: "🎊 Lifestyle", name: "lifestyle" },
        { label: "💰 Savings", name: "savings" },
        { label: "🛒 Others", name: "others" },
      ],
    },
    {
      label: "Subcategory",
      name: "subcategory",
      defaultValue: formData.subcategory,
      options: [{ label: "🛒 Others", name: "others" }],
    },
    {
      label: "Payment Method",
      name: "method",
      defaultValue: formData.method,
      options: [
        { label: "💵 Cash", name: "cash" },
        { label: "💳 Credit Card", name: "credit card" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    resetErrors();

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
            <div
              className="w-1/2 px-2 my-2 flex flex-col gap-2 relative"
              key={i}
            >
              <label htmlFor={input.name}>{input.label}</label>
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                placeholder={input.placeholder}
                value={input.value}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-slate-700 rounded-md p-2 text-sm focus:outline-slate-500 focus:outline-none focus:outline-offset-0"
              />
              {formErrors?.[input.name] && (
                <span className="absolute top-full right-0 mx-2 bg-rose-500 text-slate-800 text-xs rounded p-1 bg-opacity-95 z-10 max-w-64">
                  {formErrors[input.name]}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {formSelectors.map((selector, i) => (
            <FormSelector
              key={i}
              selector={selector}
              handleChange={handleChange}
            />
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

const FormSelector = ({ selector, handleChange }) => {
  const { formatLabel } = useFormatter();
  const [activeOptions, setActiveOptions] = useState(false);

  const handleOption = (selector, option) => {
    handleChange({
      target: {
        name: selector,
        value: option,
      },
    });
    setActiveOptions(!activeOptions);
  };

  return (
    <div className="p-2 flex flex-col gap-2 relative">
      <span>{selector.label}</span>
      <div
        onClick={() => setActiveOptions(!activeOptions)}
        className="flex justify-between items-center gap-2 bg-slate-700 rounded-md p-2 text-sm cursor-pointer"
      >
        {formatLabel(selector.defaultValue)} <LuChevronDown />
      </div>
      <ul
        className={`absolute min-w-max bg-slate-700 rounded-md p-4 text-sm flex flex-col gap-2 z-10 transition-all duration-200 ease-in-out ${
          activeOptions
            ? "top-full opacity-100 pointer-events-auto"
            : "top-20 opacity-0 pointer-events-none"
        } `}
        style={{ wordSpacing: "0.2rem" }}
      >
        {selector.options.map((option, i) => (
          <li
            key={i}
            className="cursor-pointer p-1 rounded-md hover:bg-purple-600 transition-all duration-200 ease-in-out"
            onClick={() => handleOption(selector.name, option.name)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
