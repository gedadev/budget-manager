import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { CategoriesList } from "./CategoriesList";

export function Categories() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4 py-4">
      <Header />
      <CategoriesList />
    </div>
  );
}

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div className="flex items-center gap-2 text-3xl">
        <LuArrowLeft
          className="cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={() => navigate(-1)}
        />
        <h1>Categories</h1>
      </div>
      <div className="text-sm text-slate-400 px-2">
        <p>Manage your categories</p>
      </div>
    </header>
  );
};
