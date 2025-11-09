import { Benefits, CTA, Features, Hero } from "../components/landing/Landing";
import { Header } from "../components/landing/Header";
import { useEffect, useRef, useState } from "react";

export function Landing() {
  const landingSections = [<Hero />, <Features />, <Benefits />, <CTA />];
  const [viewIndex, setViewIndex] = useState(0);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      const { deltaY } = e;

      if (deltaY > 0) {
        setViewIndex((index) => {
          if (index === landingSections.length - 1) return 0;
          return index + 1;
        });
      }
      if (deltaY < 0) {
        setViewIndex((index) => {
          if (index === 0) return landingSections.length - 1;
          return index - 1;
        });
      }

      setTimeout(() => (isLoadingRef.current = false), 500);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

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
    </div>
  );
}
