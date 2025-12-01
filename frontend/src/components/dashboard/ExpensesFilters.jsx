import { useEffect } from "react";

export function ExpensesFilters({ cancelForm }) {
  useEffect(() => {
    if (!cancelForm) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") cancelForm();
    };

    const handleClick = (event) => {
      const { id } = event.target;
      if (id === "filters-bg") cancelForm();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className="bg-slate-800 max-w-6xl mx-auto p-4 rounded-md mt-4">
      <h2>Expenses Filters</h2>
    </section>
  );
}
