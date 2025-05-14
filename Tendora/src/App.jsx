// App.js
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Catalog from "./components/Catalog";
import Tendora from "./components/Tendora";
import Sevimli from "./components/Sevimli";
import Karzin from "./components/Karzin";
import Tenmodal from "./components/Tenmodal";
import Footer from "./components/Footer";

export const MyContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("uz");
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Sevimlilarni localStorage'dan boshlang‘ich qiymat sifatida olish
  const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
  const [favorites, setFavorites] = useState(initialFavorites);

  // ✅ Sevimlilar o‘zgarganda localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <MyContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        favorites,
        setFavorites,
        cart,
        setCart,
        addToCart,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<><Main /><Catalog /><Tendora /></>} />
          <Route path="/sevimli" element={<Sevimli />} />
          <Route path="/karzin" element={<Karzin />} />
          <Route path="/tovar/:id" element={<Tenmodal />} />
        </Routes>
        <Footer />
      </Router>
    </MyContext.Provider>
  );
}
