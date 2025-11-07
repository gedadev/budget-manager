import { useEffect, useState } from "react";
import { useScreen } from "../../hooks/useScreen";
import { LuCircle, LuCircleDot } from "react-icons/lu";

export function ProductFeatures({ features }) {
  const { isMobile } = useScreen();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const getNext = () => {
      setCurrentFeatureIndex((index) => {
        if (index === features.length - 1) return 0;
        return index + 1;
      });
    };

    const slideInterval = setInterval(() => getNext(), 4000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto text-center mb-10">
        <h1 className="text-slate-100 text-4xl font-semibold">
          Powerful Features
        </h1>
        <span className="text-slate-400">
          Everything you need to take control of your finances
        </span>
      </div>
      {isMobile ? (
        <>
          <div className="w-11/12 flex overflow-hidden text-slate-100">
            {features.map((feature, i) => (
              <div
                key={i}
                className="min-w-full mt-10 bg-slate-700 px-3 py-4 rounded-md flex flex-col items-center gap-2 transition-all duration-200"
                style={{ translate: `${currentFeatureIndex * -100}%` }}
              >
                <span className="bg-slate-600 p-2 rounded-lg text-purple-500">
                  {feature.icon}
                </span>
                <h2 className="text-slate-200 text-lg">{feature.title}</h2>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 text-slate-500 text-xs mt-4">
            {features.map((_, index) => (
              <>
                {index === currentFeatureIndex ? (
                  <LuCircleDot />
                ) : (
                  <LuCircle
                    className="cursor-pointer"
                    onClick={() => setCurrentFeatureIndex(index)}
                  />
                )}
              </>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-5xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-slate-700 px-3 py-4 rounded-md flex flex-col gap-3 items-center border border-slate-500"
            >
              <span className="bg-slate-600 p-2 rounded-lg text-purple-500">
                {feature.icon}
              </span>
              <h2 className="text-slate-200 text-lg">{feature.title}</h2>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
