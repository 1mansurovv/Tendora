import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { MyContext } from "../App";
import { Moon, Sun } from "lucide-react";
import Modal from "./Modal";
import Dalet from "./Dalet";

export default function Bady() {
  const { theme, setTheme } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Yangi qo'shilgan: Tanlangan itemni saqlash uchun state
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3500/marlet");
        setData(res.data);
      } catch (error) {
        console.error("Ma'lumot olishda xatolik:", error);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3500/marlet/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("O‘chirishda xatolik:", error);
    }
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      await deleteItem(itemToDelete);
      setItemToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const addItem = (newItem) => {
    setData((prev) => [...prev, newItem]);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`grid grid-cols-12 min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-[#f9fafb] text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`col-span-2 p-6 space-y-6 shadow-md rounded-r-3xl ${
          theme === "dark"
            ? "bg-[#2c2c2c]"
            : "bg-white/90 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="text-3xl font-extrabold text-yellow-500 tracking-wide">
          Trendora
        </div>
        <nav className="mt-6">
          <ul className="space-y-5 font-medium text-base">
            <li className="hover:text-yellow-500 cursor-pointer transition-all">
              🏠 Bosh sahifa
            </li>
            <li
              className="hover:text-yellow-500 cursor-pointer transition-all ml-2"
              onClick={() => {
                setSelectedItem(null);  // Yangi item qo'shish uchun oldingi tanlovni tozalash
                setShowModal(true);
              }}
            >
              ➕ Qo‘shish
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main panel */}
      <main className="col-span-10 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1
            className={`text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Admin panel
          </h1>
          <div className="flex items-center gap-6">
            <button onClick={toggleTheme}>
              {theme === "dark" ? (
                <Moon className="cursor-pointer text-white" />
              ) : (
                <Sun className="cursor-pointer text-yellow-500" />
              )}
            </button>
          </div>
        </div>

        {/* Card */}
        <div
          className={`p-6 rounded-2xl shadow-xl border transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#2f2f2f] border-gray-700"
              : "bg-white/70 border-gray-200 backdrop-blur-md"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Buyurtmalar
            </h2>
            <button
              onClick={() => {
                setSelectedItem(null);  // Yangi item qo'shish uchun tozalash
                setShowModal(true);
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl px-5 py-2 shadow-md transition duration-200"
            >
              + Yangi
            </button>
          </div>
          <div className="grid grid-cols-13 text-sm font-bold border-b pb-3 mb-4 dark:border-gray-600 px-4 gap-4">
            <div className="">ID</div>
            <div className="col-span-2 px-2">Nom</div>
            <div className="col-span-5 px-2">Ta'rif</div>
            <div className="col-span-2 px-2">Narx</div>
            <div className="px-2">Kategoriya</div>
            <div className="px-2">Rasm</div>
            <div className="text-center col-span-1 px-2">Amallar</div>
          </div>

          {data.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-13 items-center py-3 border-b text-sm rounded-lg transition-all duration-200 px-4"
            >
              {/* ID va Nom bitta joyda */}
              <div className="flex items-center gap-2 font-medium truncate col-span-3 px-2">
                <span>{index + 1}.</span>
                <span>{item.name}</span>
              </div>

              {/* Tavsif */}
              <div className="truncate col-span-5 px-2">{item.description}</div>

              {/* Narx */}
              <div className="text-green-600 dark:text-green-400 font-semibold col-span-2 line-clamp-2 px-2">
                {item.price} so'm
              </div>

              {/* Kategoriya */}
              <div className="capitalize px-2">{item.category}</div>

              {/* Rasm */}
              <div className="flex gap-2 flex-wrap px-2">
                {item.images?.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt="image"
                    className="h-14 w-14 object-cover rounded-lg border border-gray-200 dark:border-gray-700 "
                  />
                )}
              </div>

              {/* Tugmalar */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setSelectedItem(item);  // Edit uchun tanlangan itemni saqlaymiz
                    setShowModal(true);      // Modalni ochamiz
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                >
                  <FaPen size={14} />
                </button>
                <button
                  onClick={() => {
                    setItemToDelete(item.id);
                    setShowDeleteModal(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal uchun */}
      {showModal && (
        <Modal
          item={selectedItem}      // Tanlangan itemni uzatamiz
          onClose={() => setShowModal(false)}
          onSubmit={addItem}
        />
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <Dalet
          onClose={() => {
            setItemToDelete(null);
            setShowDeleteModal(false);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
