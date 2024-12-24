import { useState } from "react";

import { useEffect } from "react";

export function useIsScrolled() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToElementId = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { isScrolled, scrollToElementId, scrollToTop };
}
