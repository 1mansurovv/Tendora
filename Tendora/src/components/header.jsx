import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaMoon,
  FaSun,
  FaGlobe,
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { MyContext } from "../App";
import KIrish from "./KIrish";

export default function Header() {
  const { theme, setTheme, language, setLanguage } = useContext(MyContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <header
        className={`flex items-center justify-between px-8 py-4 shadow-md sticky top-0 z-50 transition-all duration-300 ease-in-out
          ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-sm">
            T
          </div>
          <span className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-blue-600"}`}>
            Tendora
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-6">
          <input
            type="text"
            placeholder={language === "uz" ? "Mahsulotni izlash" : "Поиск товара"}
            className={`w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 transition
              ${theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-100 border-gray-200 text-black"}`}
          />
        </div>

        {/* Icons & settings */}
        <div className="flex items-center gap-6 text-sm">
          {/* Kirish modal ochadi */}
          <div
            onClick={() => setShowLogin(true)}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300
              ${theme === "dark" ? "text-white hover:text-blue-400" : "text-blue-600 hover:text-blue-800"}`}
          >
            <FaUser size={18} />
            <span>{language === "uz" ? "Kirish" : "Вход"}</span>
          </div>

          {/* Sevimli */}
          <Link to="/sevimli" className={`flex flex-col items-center transition ${theme === "dark" ? "text-white hover:text-blue-400" : "text-blue-600 hover:text-blue-800"}`}>
            <FaHeart size={18} />
            <span>{language === "uz" ? "Sevimli" : "Избранное"}</span>
          </Link>

          {/* Karzin */}
          <Link to="/karzin" className={`flex flex-col items-center transition ${theme === "dark" ? "text-white hover:text-blue-400" : "text-blue-600 hover:text-blue-800"}`}>
            <FaShoppingCart size={18} />
            <span>{language === "uz" ? "Karzin" : "Корзина"}</span>
          </Link>

          {/* Til tanlash */}
          <div className="relative flex items-center gap-1">
            <FaGlobe className={`${theme === "dark" ? "text-white" : "text-blue-700"} text-lg`} />
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`appearance-none pl-2 pr-6 py-1 rounded-md text-sm font-medium border border-transparent hover:border-blue-400 focus:outline-none focus:border-blue-500 transition
                  ${theme === "dark" ? "bg-transparent text-white" : "bg-white text-blue-700"}`}
              >
                <option value="uz">UZ</option>
                <option value="ru">RU</option>
              </select>
              <div className="pointer-events-none absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                <FiChevronDown />
              </div>
            </div>
          </div>

          {/* Tungi/Kunduzgi rejim */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`text-xl p-2 rounded-full transition ${theme === "dark" ? "text-white hover:text-yellow-400" : "text-blue-600 hover:text-yellow-500"}`}
          >
            {theme === "dark" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </header>

      {/* Kirish modal */}
      {showLogin && <KIrish onClose={() => setShowLogin(false)} />}
    </>
  );
}
