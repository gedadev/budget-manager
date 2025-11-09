import { Benefits, CTA, Features, Hero } from "../components/landing/Landing";
import { Header } from "../components/landing/Header";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export function Landing() {
  const landingSections = [<Hero />, <Features />, <Benefits />, <CTA />];
  const [viewIndex, setViewIndex] = useState(0);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      const { deltaY } = e;

      if (deltaY > 0) nextView();
      if (deltaY < 0) prevView();

      setTimeout(() => (isLoadingRef.current = false), 500);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const nextView = () =>
    setViewIndex((index) => {
      if (index === landingSections.length - 1) return 0;
      return index + 1;
    });

  const prevView = () =>
    setViewIndex((index) => {
      if (index === 0) return landingSections.length - 1;
      return index - 1;
    });

  return (
    <div>
      <header className="absolute top-0 flex justify-between items-center w-full p-3 z-50">
        <Header />
      </header>
      <main className="max-h-screen overflow-hidden">
        {landingSections.map((section, i) => (
          <div
            key={i}
            className="transition-all duration-200"
            style={{ transform: `translateY(${viewIndex * -100}%)` }}
          >
            {section}
          </div>
        ))}
      </main>
      <div className="fixed bottom-0 m-5 flex flex-col gap-3">
        <LuChevronUp
          onClick={prevView}
          className={`${
            viewIndex === 0
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } text-slate-400 bg-slate-700 rounded-full p-1 text-4xl cursor-pointer hover:bg-slate-600 transition-all duration-150`}
        />
        <LuChevronDown
          onClick={nextView}
          className={`${
            viewIndex === landingSections.length - 1
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } text-slate-400 bg-slate-700 rounded-full p-1 text-4xl cursor-pointer hover:bg-slate-600 transition-all duration-150`}
        />
      </div>
    </div>
  );
}
