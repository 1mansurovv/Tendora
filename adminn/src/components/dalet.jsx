import React from 'react';
import { FaExclamationTriangle } from "react-icons/fa";

export default function Dalet({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-gradient-to-br from-white to-gray-100 dark:from-[#2c2c2c] dark:to-[#3c3c3c] text-gray-800 dark:text-white w-[90%] max-w-md p-8 rounded-2xl shadow-2xl text-center animate-fade-in-up">
        <div className="flex justify-center mb-4 text-red-500 text-4xl">
          <FaExclamationTriangle />
        </div>
        <h2 className="text-2xl font-bold mb-3">Ishonchingiz komilmi?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Bu amalni bekor qilib bo‘lmaydi. Rostdan ham ushbu elementni o‘chirmoqchimisiz?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
          >
            Ha, o‘chir
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-md transition"
          >
            Yo‘q, bekor
          </button>
        </div>
      </div>
    </div>
  );
}
