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

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MyContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("uz");

  // ✅ Savatni localStorage'dan olish
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Sevimlilarni localStorage'dan olish
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : {};
  });

  // ✅ Buyurtma qilingan mahsulotlar
  const [orderedItems, setOrderedItems] = useState(() => {
    const saved = localStorage.getItem("orderedItems");
    return saved ? JSON.parse(saved) : {};
  });

  // ✅ useEffect — localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
  }, [orderedItems]);

  // Savatga mahsulot qo‘shish
  const addToCart = (product) => {
    if (cart.find((item) => item.id === product.id)) {
      return false;
    }
    setCart((prev) => [...prev, product]);
    return true;
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return updated;
    });
  };

  return (
    <MyContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        favorites,
        setFavorites,
        toggleFavorite,
        orderedItems,
        setOrderedItems, // ✅ Cart sahifasida ishlatamiz
      }}
    >
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main />
                <Catalog />
                <Tendora />
              </>
            }
          />
          <Route path="/sevimli" element={<Sevimli />} />
          <Route path="/karzin" element={<Karzin />} />
          <Route path="/tovar/:id" element={<Tenmodal />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
      />
    </MyContext.Provider>
  );
}
