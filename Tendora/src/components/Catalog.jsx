import React, { useContext } from "react";
import { MyContext } from "../App";
import {
  FaTshirt,
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaTv,
  FaHome,
} from "react-icons/fa";

const categories = [
  { id: 1, name_uz: "Kiyim", name_ru: "Одежда", icon: <FaTshirt /> },
  { id: 2, name_uz: "Elektronika", name_ru: "Электроника", icon: <FaLaptop /> },
  { id: 3, name_uz: "Telefonlar", name_ru: "Телефоны", icon: <FaMobileAlt /> },
  { id: 4, name_uz: "Quloqchinlar", name_ru: "Наушники", icon: <FaHeadphones /> },
  { id: 5, name_uz: "Televizorlar", name_ru: "Телевизоры", icon: <FaTv /> },
  { id: 6, name_uz: "Uy uchun", name_ru: "Для дома", icon: <FaHome /> },
];

export default function Catalog() {
  const { theme, language } = useContext(MyContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`py-16 px-4 transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`p-6 rounded-[15px] shadow-lg flex flex-col items-center justify-center
              bg-blue-600 hover:bg-blue-700 text-white`}
          >
            <div className="text-5xl mb-2">{cat.icon}</div>
            <div className="text-sm mt-1 font-semibold">
              {language === "uz" ? cat.name_uz : cat.name_ru}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
