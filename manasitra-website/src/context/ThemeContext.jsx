"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // 'light' (Calm) or 'dark' (Serenity)

  useEffect(() => {
    // Check local storage or time of day (6 PM to 6 AM = Dark)
    const savedTheme = localStorage.getItem("mansitra-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 6) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("mansitra-theme", nextTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "dark" ? "dark-theme-mode" : "light-theme-mode"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useEmotionTheme() {
  return useContext(ThemeContext);
}
