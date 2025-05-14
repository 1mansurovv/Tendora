import React, { useContext } from "react";
import { MyContext } from "../App";
import {
  FaInstagram,
  FaTelegram,
  FaFacebookF,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

export default function Footer() {
  const { theme, language } = useContext(MyContext);
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-900" : "";
  const textColor = isDark ? "text-gray-300" : "text-gray-700";
  const titleColor = isDark ? "text-white" : "text-black";

  // 🗣 Tarjimalar
  const t = {
    about: { uz: "Biz haqimizda", ru: "О нас" },
    delivery: { uz: "Topshirish punktlari", ru: "Пункты доставки" },
    jobs: { uz: "Vakansiyalar", ru: "Вакансии" },
    forUsers: { uz: "Foydalanuvchilarga", ru: "Пользователям" },
    contact: { uz: "Biz bilan bog'lanish", ru: "Связаться с нами" },
    faq: { uz: "Savol-Javob", ru: "Вопрос-Ответ" },
    forSellers: { uz: "Tadbirkorlarga", ru: "Предпринимателям" },
    sellOnShop: { uz: "Do‘konda soting", ru: "Продавайте в магазине" },
    sellerLogin: { uz: "Sotuvchi paneliga kirish", ru: "Вход для продавцов" },
    openPoint: { uz: "Punkt ochish", ru: "Открыть пункт" },
    downloadApp: { uz: "Ilovani yuklab olish", ru: "Скачать приложение" },
    onSocial: { uz: "Ijtimoiy tarmoqlarda", ru: "В социальных сетях" },
    rights: {
      uz: "Barcha huquqlar himoyalangan.",
      ru: "Все права защищены.",
    },
    author: {
      uz: "Asoschisi: ",
      ru: "Основатель: ",
    },
  };

  return (
    <footer className={`${bgColor} py-12 px-6 transition-colors`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className={`font-semibold mb-4 ${titleColor}`}>{t.about[language]}</h3>
          <ul className={`space-y-2 ${textColor}`}>
            <li><a href="#" className="hover:underline">{t.delivery[language]}</a></li>
            <li><a href="#" className="hover:underline">{t.jobs[language]}</a></li>
          </ul>
        </div>

        <div>
          <h3 className={`font-semibold mb-4 ${titleColor}`}>{t.forUsers[language]}</h3>
          <ul className={`space-y-2 ${textColor}`}>
            <li><a className="hover:underline">{t.contact[language]}</a></li>
            <li><a href="#" className="hover:underline">{t.faq[language]}</a></li>
          </ul>
        </div>

        <div>
          <h3 className={`font-semibold mb-4 ${titleColor}`}>{t.forSellers[language]}</h3>
          <ul className={`space-y-2 ${textColor}`}>
            <li><a href="#" className="hover:underline">{t.sellOnShop[language]}</a></li>
            <li><a href="#" className="hover:underline">{t.sellerLogin[language]}</a></li>
            <li><a href="#" className="hover:underline">{t.openPoint[language]}</a></li>
          </ul>
        </div>

        <div>
          <h3 className={`font-semibold mb-4 ${titleColor}`}>{t.downloadApp[language]}</h3>
          <div className={`flex flex-col space-y-2 mt-2 ${isDark ? "text-white" : "text-gray-800"}`}>
            <a href="#" className="flex items-center gap-2 hover:underline text-base transition-colors">
              <FaApple /> App Store
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline text-base transition-colors">
              <FaGooglePlay /> Google Play
            </a>
          </div>
        </div>

        <div>
          <h3 className={`font-semibold mb-4 ${titleColor}`}>{t.onSocial[language]}</h3>
          <div className="flex space-x-4 text-xl mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 hover:scale-110 transition" />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer">
              <FaTelegram className="text-blue-400 hover:scale-110 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-blue-600 hover:scale-110 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-red-600 hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className={`mt-10 text-center text-xs ${textColor}`}>
        &copy; {new Date().getFullYear()} Internet do‘kon. {t.author[language]}
        <strong>Mansurov Otabek</strong>. {t.rights[language]}
      </div>
    </footer>
  );
}
