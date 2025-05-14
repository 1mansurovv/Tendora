import React, { useContext } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { MyContext } from "../App"; // Context import qilish

export default function Cart() {
  const { cart, language, favorites, toggleFavorite } = useContext(MyContext); // Context-dan ma'lumot olish

  const t = {
    emptyCart: { uz: "Savatchangiz bo‘sh.", ru: "Ваша корзина пуста." },
    priceUnset: { uz: "Narx belgilangan emas.", ru: "Цена не установлена." },
    buyNow: { uz: "Hozir sotib olish", ru: "Купить сейчас" },
  };

  return (
    <div className="p-6 min-h-screen mx-auto">
      <div className="max-w-[1300px] mx-auto">
        <h2
          className={`text-2xl font-bold mb-6 ${
            language === "uz" ? "text-black" : "text-white"
          }`}
        >
          Savatcha
        </h2>

        {/* Agar savat bo‘sh bo‘lsa */}
        {cart?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl shadow-lg border p-4 transition relative cursor-pointer"
              >
                {/* Sevimli tugmasi */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id); // Mahsulotni sevimlilarga qo‘shish
                  }}
                  className={`absolute top-3 right-3 text-xl ${
                    favorites[item.id] ? "text-red-500" : "text-gray-500"
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

                <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition gap-2">
                  <FiShoppingCart />
                  {t.buyNow[language]}
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Agar savat bo‘sh bo‘lsa
          <div className="text-center text-gray-500">
            {t.emptyCart[language]}
          </div>
        )}
      </div>
    </div>
  );
}
