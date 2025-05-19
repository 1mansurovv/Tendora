import React, { useContext, useState } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function KIrish({ onClose }) {
  const { theme, setIsLoggedIn } = useContext(MyContext); // isLoggedIn holatini boshqarish
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    let validationErrors = {};

    // Telefon 9ta raqamdan iborat bo'lishi kerak (faqat raqam, masalan 901234567)
    if (!/^\d{9}$/.test(phone)) {
      validationErrors.phone = true;
    }

    // Parol bo‘sh bo‘lmasligi kerak
    if (!password.trim()) {
      validationErrors.password = true;
    }

    setErrors(validationErrors);

    // Agar xatoliklar bo‘lmasa
    if (Object.keys(validationErrors).length === 0) {
      toast.success("Sahifaga kirdingiz!", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => {
          setIsLoggedIn(true); // login holatini yangilash
          onClose(); // modalni yopamiz
          navigate("/"); // bosh sahifaga o'tamiz
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 relative transition-all duration-300
          ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-400 hover:text-red-500 transition"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Kirish</h2>

        {/* Telefon raqami input */}
        <input
          type="tel"
          placeholder="Telefon raqamingiz (90xxxxxxx)"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // faqat raqam
          maxLength={9}
          className={`w-full px-4 py-3 mb-4 rounded-lg border focus:outline-none transition
            ${
              theme === "dark"
                ? `bg-gray-800 ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  } text-white`
                : `bg-gray-100 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } text-black`
            }`}
        />

        {/* Parol input */}
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-3 mb-6 rounded-lg border focus:outline-none transition
            ${
              theme === "dark"
                ? `bg-gray-800 ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } text-white`
                : `bg-gray-100 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-black`
            }`}
        />

        {/* Kirish tugmasi */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Kirish
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
