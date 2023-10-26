import React, { createContext, useEffect, useMemo, useState } from "react";

export const DrawersContext = createContext();
const DrawersContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resNav, setResNav] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    const isDark = localStorage.getItem("isDark");
    // if showBanner null/undefined fallback to true
    return JSON.parse(isDark) ?? true;
  });

  useEffect(() => {
    localStorage.setItem("isDark", darkMode);
    if (darkMode) {
      document.childNodes[1].dataset.theme = "mydark";
    } else {
      document.childNodes[1].dataset.theme = "mylight";
    }
  }, [darkMode]);

  return (
    <DrawersContext.Provider
      value={{ isOpen, setIsOpen, resNav, setResNav, darkMode, setDarkMode }}
    >
      {children}
    </DrawersContext.Provider>
  );
};

export default DrawersContextProvider;
