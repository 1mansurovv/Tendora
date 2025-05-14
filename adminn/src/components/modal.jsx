import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { MyContext } from "../App";

import "react-toastify/dist/ReactToastify.css";

export default function Modal({ onClose, onSubmit }) {
  const { theme } = useContext(MyContext); // 👉 contextdan theme olamiz
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await axios.post(
          "https://api.uzpin.games/api/v1/globals/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setImages((prev) => [...prev, res.data.file_url]);
        setImagePreviews((prev) => [...prev, URL.createObjectURL(file)]);
      } catch (error) {
        console.error("Rasm yuklashda xatolik:", error);
        toast.error("Rasm yuklashda xatolik yuz berdi.");
      }
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Mahsulot nomi kiritilishi kerak";
    if (!description.trim()) newErrors.description = "Ta'rif kiritilishi kerak";
    if (!price || Number(price) <= 0)
      newErrors.price = "Narx to‘g‘ri kiritilishi kerak";
    if (images.length === 0) newErrors.image = "Kamida 1 ta rasm tanlang";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring!");
      return;
    }

    setErrors({});
    const newProduct = {
      name,
      description,
      price,
      category,
      images,
    };

    try {
      const response = await axios.post(
        "http://localhost:3500/marlet",
        newProduct
      );
      if (response.status === 201) {
        toast.success("Mahsulot muvaffaqiyatli qo‘shildi!");
        setSuccessMessage("✅ Mahsulot muvaffaqiyatli qo‘shildi!");
        setTimeout(() => {
          onSubmit(response.data);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Xatolik:", error);
      toast.error("Mahsulotni yuborishda xatolik yuz berdi.");
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-300 
          ${
            theme === "dark"
              ? "bg-[#2f2f2f] text-white border border-gray-700"
              : "bg-white text-gray-900 border border-gray-200 backdrop-blur-md"
          }`}
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Mahsulot Qo‘shish
          </h2>

          {successMessage && (
            <div className="mb-4 text-green-500 text-center font-semibold">
              {successMessage}
            </div>
          )}

          {/* Mahsulot nomi */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Mahsulot nomi"
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-[#3a3a3a] border border-gray-600 focus:ring-yellow-500"
                  : "bg-gray-50 border border-gray-300 focus:ring-blue-400"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              placeholder="Ta'rif"
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-[#3a3a3a] border border-gray-600 focus:ring-yellow-500"
                  : "bg-gray-50 border border-gray-300 focus:ring-blue-400"
              } resize-none`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Narxi */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="Narxi (so‘m)"
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "bg-[#3a3a3a] border border-gray-600 focus:ring-yellow-500"
                  : "bg-gray-50 border border-gray-300 focus:ring-blue-400"
              }`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Rasm tanlash */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              className={`w-full p-2 rounded-lg cursor-pointer ${
                theme === "dark"
                  ? "bg-[#3a3a3a] border border-gray-600"
                  : "bg-gray-50 border border-gray-300"
              }`}
              onChange={handleImageUpload}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Rasm preview */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={src}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-0 right-0 bg-black/70 text-white rounded-full p-1"
                  >
                    <CgClose size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Kategoriya tanlash */}
          <div className="mb-6">
            <select
              className={`w-full p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-[#3a3a3a] border border-gray-600 text-white"
                  : "bg-gray-50 border border-gray-300"
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Electronics">Elektronika</option>
              <option value="Clothing">Kiyimlar</option>
              <option value="Home">Uy</option>
              <option value="Books">Kitoblar</option>
            </select>
          </div>

          {/* Tugmalar */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            >
              Bekor
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
            >
              Saqlash
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
