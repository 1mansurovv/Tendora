// Sevimli.js
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Sevimli() {
  const { favorites, setFavorites, theme, language } = useContext(MyContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3500/marlet")
      .then((res) => res.json())
      .then((data) => {
        const favItems = data.filter((item) => favorites[item.id]);
        setItems(favItems);
      });
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      if (updated[id]) delete updated[id];
      else updated[id] = true;
      return updated;
    });
  };

  const isDark = theme === "dark";

  const t = {
    heading: {
      uz: "Sevimli Mahsulotlar",
      ru: "Избранные товары",
    },
    priceUnset: {
      uz: "Narx belgilanmagan",
      ru: "Цена не указана",
    },
    buyNow: {
      uz: "Hozir sotib olish",
      ru: "Купить сейчас",
    },
  };

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-2xl font-bold mb-6">{t.heading[language]}</h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
            <div className="text-red-500 text-6xl mb-4">
              <FaHeart />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Sevimli mahsulotlar yo‘q</h2>
            <p className="text-gray-500 mb-6">Siz hali hech narsa qo‘shmagansiz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {items.map((item) => (
              <div key={item.id} className={`rounded-2xl shadow-lg border p-4 transition relative cursor-pointer ${
                  isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } hover:shadow-xl`}>
                <button
                  onClick={() => toggleFavorite(item.id)}
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
        )}
      </div>
    </div>
  );
}
