import { useEffect, useState } from "react";
import { LuCheck, LuChevronDown, LuPlus } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useFormValidations } from "../../hooks/useFormValidations";
import { useFormatter } from "../../hooks/useFormatter";
import { toast } from "sonner";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";

export function ExpenseForm() {
  const { addExpense } = useExpenses();
  const { categories, defaultCategory } = useCategories();
  const { formatCurrency, cleanCurrency, formatDateInput } = useFormatter();
  const { formErrors, handleBlur, resetErrors, validateForm } =
    useFormValidations();
  const [formIsValid, setFormIsValid] = useState(false);
  const [selectorsOptions, setSelectorsOptions] = useState({});
  const [formData, setFormData] = useState({});
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
      managerRoute: "categories",
      defaultValue: formData.category || "Create category",
      options: selectorsOptions.categories,
    },
    {
      label: "Subcategory",
      name: "subcategory",
      managerRoute: "categories",
      defaultValue: formData.subcategory || "Add Subcategory",
      options: selectorsOptions.subcategories,
    },
    {
      label: "Payment Method",
      name: "method",
      managerRoute: "",
      defaultValue: formData.method || "Loading...",
      options: [
        { label: "💵 Cash", name: "cash" },
        { label: "💳 Credit Card", name: "credit card" },
      ],
    },
  ];

  useEffect(() => {
    if (!categories || !defaultCategory) return;

    if (categories.length === 0) {
      setSelectorsOptions({ categories: [], subcategories: [] });
      setFormData({
        amount: "0",
        date: formatDateInput(new Date(Date.now())),
        commerce: "",
        description: "",
        method: "cash",
        category: "",
        subcategory: "",
      });
      return;
    }

    const categoryOptions = categories.map((category) => ({
      label: `${category.emoji} ${category.name}`,
      name: category.name,
    }));
    const subcategoryOptions = defaultCategory.subcategories?.map(
      (subcategory) => ({
        label: subcategory.name,
        name: subcategory.name,
      })
    );

    setSelectorsOptions({
      categories: categoryOptions,
      subcategories: subcategoryOptions || [],
    });
    setFormData({
      amount: "0",
      date: formatDateInput(new Date(Date.now())),
      commerce: "",
      description: "",
      method: "cash",
      category: defaultCategory.name,
      subcategory: defaultCategory.subcategories?.[0]?.name,
    });
  }, [categories, defaultCategory]);

  useEffect(() => {
    const isValid = validateForm(formData);

    setFormIsValid(isValid);
  }, [formData]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    resetErrors();

    if (name === "category" && typeof index === "number") {
      const targetCategory = categories[index];
      const firstSubcategory = targetCategory.subcategories?.[0];

      setFormData({
        ...formData,
        category: value,
        subcategory: firstSubcategory?.name,
      });

      const subcategoryOptions = targetCategory.subcategories?.map(
        (subcategory) => {
          return {
            label: subcategory.name,
            name: subcategory.name,
          };
        }
      );

      setSelectorsOptions({
        ...selectorsOptions,
        subcategories: subcategoryOptions || [],
      });

      return;
    }

    if (name === "amount") {
      setFormData({ ...formData, [name]: cleanCurrency(value) });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(addExpense(formData), {
      loading: "Adding new entry...",
      success: (success) => {
        setFormData({
          amount: "",
          date: formatDateInput(new Date(Date.now())),
          commerce: "",
          description: "",
          category: defaultCategory.name,
          subcategory: defaultCategory.subcategories?.[0]?.name,
          method: "cash",
        });
        return success.message;
      },
      error: (error) => error.message,
    });
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
            disabled={!formIsValid}
            className="bg-cyan-500 text-slate-700 w-full rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-cyan-400 disabled:bg-cyan-600"
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

  const handleOption = (selector, option, index) => {
    handleChange(
      {
        target: {
          name: selector,
          value: option,
        },
      },
      index
    );
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
        {selector.options?.map((option, i) => (
          <li
            key={i}
            className={`cursor-pointer p-1 rounded-md hover:bg-purple-600 transition-all duration-200 ease-in-out flex items-center gap-2 justify-between ${
              selector.defaultValue === option.name && "bg-purple-700"
            }`}
            onClick={() => handleOption(selector.name, option.name, i)}
          >
            <span className="min-w-24">{option.label}</span>
            {selector.defaultValue === option.name && (
              <LuCheck className="opacity-50" />
            )}
          </li>
        ))}
        <Link to={selector.managerRoute}>
          <li
            className={
              "cursor-pointer py-1 px-2 rounded-md hover:bg-purple-600 transition-all duration-200 ease-in-out flex items-center justify-center gap-2"
            }
          >
            Add {selector.name}
          </li>
        </Link>
      </ul>
    </div>
  );
};
