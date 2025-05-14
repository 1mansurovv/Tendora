// Tendora.js
import React, { useEffect, useState, useContext } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

export default function Tendora() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { favorites, setFavorites, theme, language } = useContext(MyContext);

  useEffect(() => {
    fetch("http://localhost:3500/marlet")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isDark = theme === "dark";

  const t = {
    heading: {
      uz: "Yangi qo‘shilganlar",
      ru: "Новые поступления",
    },
    loading: {
      uz: "Yuklanmoqda...",
      ru: "Загрузка...",
    },
    priceUnset: {
      uz: "Narx belgilanmagan",
      ru: "Цена не указана",
    },
    buyNow: {
      uz: "Hozir xarid qilish",
      ru: "Купить сейчас",
    },
  };

  if (todos.length === 0) {
    return (
      <div className={`text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
        {t.loading[language]}
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen mx-auto ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-2xl font-bold mb-6">{t.heading[language]}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {todos.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/tovar/${item.id}`)}
              className={`rounded-2xl shadow-lg border p-4 transition relative cursor-pointer ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              } hover:shadow-xl`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
                className={`absolute top-3 right-3 text-xl ${
                  favorites[item.id] ? "text-red-500" : isDark ? "text-gray-400" : "text-gray-500"
                } hover:text-red-500 transition-colors`}
              >
                {favorites[item.id] ? <FaHeart /> : <FiHeart />}
              </button>

              {item.images?.[0] && (
                <img src={item.images[0]} alt={item.title} className="w-full h-48 object-contain rounded-xl mb-4" />
              )}
              <h2 className="text-base font-semibold mb-1 line-clamp-2">{item.description}</h2>
              <p className="text-lg font-bold mb-1">
                {item.price ? `${item.price} so'm` : t.priceUnset[language]}
              </p>
              <div className="flex items-center text-sm text-yellow-500 mb-2">
                <FaStar className="mr-1" /> 4.7 (293)
              </div>
              <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition gap-2">
                <FiShoppingCart />
                {t.buyNow[language]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
