import { useEffect, useState } from "react";
import { LuCheck, LuChevronDown, LuPlus } from "react-icons/lu";
import { useExpenses } from "../../hooks/useExpenses";
import { useFormValidations } from "../../hooks/useFormValidations";
import { useFormatter } from "../../hooks/useFormatter";
import { toast } from "sonner";
import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";

export function ExpenseForm({
  cancelForm,
  formAction = "new",
  selectedExpense,
}) {
  const { addExpense, updateExpense } = useExpenses();
  const {
    activeCategories,
    defaultCategory,
    getCategoryName,
    getSubcategoryName,
  } = useCategories();
  const { formatCurrency, cleanCurrency, formatDateInput } = useFormatter();
  const { formErrors, handleBlur, resetErrors, validateForm } =
    useFormValidations();
  const [formIsValid, setFormIsValid] = useState(false);
  const [selectorsOptions, setSelectorsOptions] = useState({});
  const [formConfig, setFormConfig] = useState();
  const [selectedExpenseData, setSelectedExpenseData] = useState({});
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
      name: "categoryId",
      managerRoute: "categories",
      defaultValue: getCategoryName(formData.categoryId) || "Create category",
      options: selectorsOptions.categories,
    },
    {
      label: "Subcategory",
      name: "subcategoryId",
      managerRoute: "categories",
      defaultValue:
        getCategoryName(formData.subcategoryId, true) || "Add Subcategory",
      options: selectorsOptions.subcategories,
    },
    // {
    //   label: "Payment Method",
    //   name: "method",
    //   managerRoute: "",
    //   defaultValue: formData.method || "Loading...",
    //   options: [
    //     { id: 1, label: "💵 Cash", name: "cash" },
    //     { id: 2, label: "💳 Credit Card", name: "credit card" },
    //   ],
    // },
  ];

  useEffect(() => {
    if (!cancelForm) return;

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

  useEffect(() => {
    if (formAction === "new") {
      setFormConfig({
        title: "Add Expense",
        label: {
          submitButton: "Add Expense",
          loading: "Adding expense...",
        },
        handler: addExpense,
      });

      return;
    }

    if (formAction === "edit") {
      setFormConfig({
        title: "Edit Expense",
        label: {
          submitButton: "Update Expense",
          loading: "Updating expense...",
        },
        handler: updateExpense,
      });

      setSelectedExpenseData({
        amount: String(selectedExpense.amount),
        date: formatDateInput(new Date(selectedExpense.date)),
        commerce: selectedExpense.commerce,
        description: selectedExpense.description,
        // method: "cash",
        categoryId: selectedExpense.categoryId,
        subcategoryId: selectedExpense.subcategoryId,
      });
      setFormData({
        amount: String(selectedExpense.amount),
        date: formatDateInput(new Date(selectedExpense.date)),
        commerce: selectedExpense.commerce,
        description: selectedExpense.description,
        // method: "cash",
        categoryId: selectedExpense.categoryId,
        subcategoryId: selectedExpense.subcategoryId,
      });

      return;
    }
  }, []);

  useEffect(() => {
    if (!activeCategories || !defaultCategory) return;

    if (activeCategories.length === 0) {
      setSelectorsOptions({ categories: [], subcategories: [] });
      setFormData({
        amount: "0",
        date: formatDateInput(new Date(Date.now())),
        commerce: "",
        description: "",
        // method: "cash",
        categoryId: "",
        subcategoryId: "",
      });
      return;
    }

    const categoryOptions = activeCategories.map((category) => ({
      id: category._id,
      label: `${category.emoji} ${category.name}`,
      name: category.name,
    }));
    const subcategoryOptions = defaultCategory.subcategories?.map(
      (subcategory) => ({
        id: subcategory._id,
        label: subcategory.name,
        name: subcategory.name,
      })
    );
    setSelectorsOptions({
      categories: categoryOptions,
      subcategories: subcategoryOptions || [],
    });

    if (formAction === "new")
      setFormData({
        amount: "0",
        date: formatDateInput(new Date(Date.now())),
        commerce: "",
        description: "",
        // method: "cash",
        categoryId: defaultCategory._id,
        subcategoryId: defaultCategory.subcategories?.[0]?._id,
      });
  }, [activeCategories, defaultCategory, selectedExpense]);

  useEffect(() => {
    const isValid = validateForm(formData);
    if (formAction === "edit") {
      const formChanged =
        JSON.stringify(formData) !== JSON.stringify(selectedExpenseData);

      setFormIsValid(isValid && formChanged);
      return;
    }

    setFormIsValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    resetErrors();

    if (name === "categoryId") {
      const [targetCategory] = activeCategories.filter(
        (category) => category._id === value
      );
      const firstSubcategory = targetCategory.subcategories?.[0];
      const subcategoryOptions = targetCategory.subcategories?.map(
        (subcategory) => {
          return {
            id: subcategory._id,
            label: subcategory.name,
            name: subcategory.name,
          };
        }
      );

      setSelectorsOptions({
        ...selectorsOptions,
        subcategories: subcategoryOptions || [],
      });
      setFormData({
        ...formData,
        categoryId: value,
        subcategoryId: firstSubcategory?._id,
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
    await toast.promise(formConfig?.handler(formData, selectedExpense?._id), {
      loading: formConfig?.label.loading,
      success: (success) => {
        setFormData({
          ...formData,
          amount: "",
          commerce: "",
          description: "",
        });
        cancelForm && cancelForm();
        return success.message;
      },
      error: (error) => error.message,
    });
  };

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md text-lg">
      <div className="flex items-center gap-2">
        <LuPlus /> {formConfig?.title}
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
                value={input.value || ""}
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
        <div className="px-2 mt-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={!formIsValid}
            className="bg-cyan-500 text-slate-700 w-full rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-cyan-400 disabled:bg-cyan-600"
          >
            {formConfig?.label.submitButton}
          </button>
          {cancelForm && (
            <button
              onClick={cancelForm}
              className="text-slate-300 w-full rounded-md p-2 transition-all duration-200 ease-in-out hover:text-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

const FormSelector = ({ selector, handleChange }) => {
  const { formatLabel } = useFormatter();
  const [activeOptions, setActiveOptions] = useState(false);

  const handleOption = (selector, optionId) => {
    handleChange({
      target: {
        name: selector,
        value: optionId,
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
        {selector.options?.map((option) => (
          <li
            key={option.id}
            className={`cursor-pointer p-1 rounded-md hover:bg-purple-600 transition-all duration-200 ease-in-out flex items-center gap-2 justify-between ${
              selector.defaultValue === option.name && "bg-purple-700"
            }`}
            onClick={() => handleOption(selector.name, option.id)}
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
            Add {selector.label}
          </li>
        </Link>
      </ul>
    </div>
  );
};
