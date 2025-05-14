import React, { useState, createContext } from "react";
import Bady from "./components/bady";

// MyContext yaratish
export const MyContext = createContext();

export default function App() {
  const [theme, setTheme] = useState(""); // Default theme is dark

  return (
    <div>
      <MyContext.Provider value={{ theme, setTheme }}>
        <Bady />
      </MyContext.Provider>
    </div>
  );
}
