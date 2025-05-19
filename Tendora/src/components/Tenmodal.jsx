import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { MyContext } from "../App";
import { toast } from "react-toastify";

export default function Tenmodal() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { theme, language, addToCart } = useContext(MyContext);

  const swiperRef = useRef(null);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3500/marlet/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setTotalPrice(data.price);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (product) {
      const price = Number(product.price || 0);
      setTotalPrice(price * quantity);
    }
  }, [quantity, product]);

  if (loading) return <div className="p-6">Yuklanmoqda...</div>;
  if (!product)
    return <div className="p-6 text-red-500">Mahsulot topilmadi.</div>;

  const images = product?.images || [product.img];
  const isDark = theme === "dark";

  const t = {
    title: { uz: "Mahsulot detali", ru: "Детали товара" },
    stock: { uz: "Yangi mahsulot! Stokda bor.", ru: "Новый товар! В наличии." },
    price: { uz: "1 dona narxi", ru: "Цена за 1 штуку" },
    quantity: { uz: "Miqdor", ru: "Количество" },
    addToCart: { uz: "Savatchaga qo‘shish", ru: "Добавить в корзину" },
    order: { uz: "Buyurtma berish", ru: "Оформить заказ" },
    total: { uz: "Jami", ru: "Итого" },
    shipping: {
      uz: "Tezkor yetkazib berish: Toshkent ichida 1 kun, viloyatlarga 2-3 kun ichida.",
      ru: "Быстрая доставка: В Ташкенте за 1 день, в регионы 2-3 дня.",
    },
    payment: {
      uz: "To‘lov: Uzcard, Humo, bo‘lib to‘lash imkoniyati mavjud.",
      ru: "Оплата: Есть возможность оплатить картами Uzcard, Humo и в рассрочку.",
    },
  };
  const handleOrder = () => {
    setOrderCount((prev) => prev + 1);

    if (orderCount === 0) {
      toast.success("Buyurtmangiz qabul qilindi!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDark ? "dark" : "light",
      });
    } else {
      toast.info("Buyurtmangiz tayyorlanmoqda...", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDark ? "dark" : "light",
      });
    }
  };

  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity, totalPrice };
    const added = addToCart(productToAdd);
    if (added) {
      toast.success("Mahsulot savatchaga qo'shildi!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDark ? "dark" : "light",
      });
    } else {
      toast.info("Mahsulot savatchada mavjud!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: isDark ? "dark" : "light",
      });
    }
  };

  return (
    <div
      className={`${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`image-${i}`}
                  className="w-full h-[400px] object-contain border rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex gap-2 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => swiperRef.current?.slideTo(i)}
                className="w-20 h-20 object-contain border rounded-xl cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-600">
              {product.description}
            </h2>
            <button className="text-2xl text-gray-400 hover:text-red-500 transition">
              <FiHeart />
            </button>
          </div>

          <p className="text-gray-600">{t.stock[language]}</p>
          <p className="text-lg text-gray-500">
            {t.price[language]}: {product.price} so‘m
          </p>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              {t.quantity[language]}
            </span>
            <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <FiMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold flex-1"
            >
              {t.addToCart[language]}
            </button>
            <button
              onClick={handleOrder}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold flex-1"
            >
              {t.order[language]}
            </button>
          </div>

          <p className="text-lg font-bold">
            {t.total[language]}: {totalPrice} so‘m
          </p>

          <p className="text-sm mt-4 text-gray-500">{t.shipping[language]}</p>
          <p className="text-sm text-gray-500">{t.payment[language]}</p>
        </div>
      </div>
    </div>
  );
}
