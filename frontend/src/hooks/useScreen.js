import { useEffect, useState } from "react";

export function useScreen() {
  const [isMobile, setIsMobile] = useState();
  const [isMedium, setIsMedium] = useState();

  useEffect(() => {
    setIsMobile(window.innerWidth <= 640);
    setIsMedium(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsMedium(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isMedium };
}
