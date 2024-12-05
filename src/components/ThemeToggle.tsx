"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export function ModeToggle() {
  const { theme: themeOverride, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = themeOverride === "system" ? systemTheme : themeOverride;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <button className="h-5 w-5 rounded-full">
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        animate={{
          scale: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 180,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>
      <motion.div
        animate={{
          scale: theme === "light" ? 1 : 0,
          rotate: theme === "light" ? 0 : -180,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-blue-500" />
      </motion.div>
    </motion.button>
  );
}
