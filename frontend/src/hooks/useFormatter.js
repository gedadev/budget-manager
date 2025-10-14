export function useFormatter() {
  const formatCurrency = (currency) => {
    return `$ ${(currency / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const cleanCurrency = (currency) => currency.replace(/\D/g, "");

  const cleanSpaces = (value) => value.replace(/\s/g, "");

  const formatDateInput = (dateObj) => {
    const year = String(dateObj.getFullYear());
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const date = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const formatLabel = (label) => {
    const split = label.split(" ");
    const capitalize = split.map(
      (word) => `${word.at(0).toUpperCase()}${word.slice(1).toLowerCase()}`
    );

    return capitalize.join(" ");
  };

  return {
    formatCurrency,
    cleanCurrency,
    cleanSpaces,
    formatDateInput,
    formatLabel,
  };
}
