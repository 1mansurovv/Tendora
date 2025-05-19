// Cart.jsx
import React, { useContext, useState, useEffect } from "react";
import { FiShoppingCart, FiHeart, FiTrash2 } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { MyContext } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    language,
    favorites,
    toggleFavorite,
    removeFromCart,
    theme,
  } = useContext(MyContext);

  const [orderedItems, setOrderedItems] = useState(() => {
    try {
      const saved = localStorage.getItem("orderedItems");
      return saved ? JSON.parse(saved) : {};
    } catch (err) {
      console.error("orderedItems parse error:", err);
      return {};
    }
  });

  const navigate = useNavigate();
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
    } catch (err) {
      console.error("localStorage save error:", err);
    }
  }, [orderedItems]);

  const t = {
    emptyCart: { uz: "Savatchangiz bo‘sh.", ru: "Ваша корзина пуста." },
    priceUnset: { uz: "Narx belgilangan emas.", ru: "Цена не установлена." },
    buyNow: { uz: "Hozir sotib olish", ru: "Купить сейчас" },
  };

  const handleOrder = (itemId) => {
    if (orderedItems[itemId]) {
      toast.info("Buyurtmangiz tayyorlanmoqda...", {
        position: "top-center",
        autoClose: 3000,
        theme: isDark ? "dark" : "light",
      });
      return;
    }

    const newState = {
      ...orderedItems,
      [itemId]: true,
    };

    setOrderedItems(newState);

    toast.success("Buyurtmangiz qabul qilindi!", {
      position: "top-center",
      autoClose: 3000,
      theme: isDark ? "dark" : "light",
    });
  };

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          {language === "uz" ? "Savatcha" : "Корзина"}
        </h2>

        {cart?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl shadow-lg border p-4 transition relative ${
                  isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }}
                  className={`absolute top-3 left-3 text-xl ${
                    isDark ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-600"
                  } transition-colors`}
                  title="O'chirish"
                >
                  <FiTrash2 />
                </button>

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

                {item.images?.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.description}
                    className="w-full h-48 object-contain rounded-xl mb-4"
                  />
                )}

                <h2 className="text-base font-semibold mb-1">
                  {item.description}
                </h2>
                <p className="text-lg font-bold mb-1">
                  {item.price ? `${item.price} so'm` : t.priceUnset[language]}
                </p>

                <div className="flex items-center text-sm text-yellow-500 mb-2">
                  <FaStar className="mr-1" /> 4.7 (293)
                </div>

                <button
                  onClick={() => handleOrder(item.id)}
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition gap-2"
                >
                  <FiShoppingCart />
                  {t.buyNow[language]}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MdRemoveShoppingCart
              className={`text-7xl mb-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            />
            <h3 className="text-2xl font-semibold mb-2">
              {t.emptyCart[language]}
            </h3>
            <p className={`text-md mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {language === "uz"
                ? "Siz hali hech qanday mahsulot qo‘shmagansiz."
                : "Вы еще не добавили товары."}
            </p>
            <button
              onClick={() => navigate("/tendora")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
            >
              {language === "uz" ? "Xarid qilishni boshlash" : "Начать покупки"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
