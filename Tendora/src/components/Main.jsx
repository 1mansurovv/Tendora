import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MyContext } from "../App";

export default function Main() {
  const { theme, language } = useContext(MyContext);

  const slides = [
    {
      id: 1,
      title: "Nike Air Max 270",
      subtitle:
        language === "uz"
          ? "Erkaklar uchun sport krossovkasi"
          : "Мужские спортивные кроссовки",
      image:
        "https://images.openai.com/thumbnails/url/HNVBX3icDcnbEkJAAADQv-mtZHKJmaZZ1xh0EcUbyyxi7WZV-rM-pb-p83q-n4oxMqgcV2J4nwgriznLMb9AA8tYDRew77ih6gmpMdrSzf9UEBSKDY9C0gp-fFbI0z0c3RxKvDuFCnYcMdCsZsyzUbCmW-StpAfIa1HwZYB3PBJNGQUJsxvK9jQ1DM26rk7SOgx5vTC6sjHT_WtsG6ktsQbPuPKMLFpqEQKY1u_48pyNAyUbHZg_dPNAvg",
    },
    {
      id: 2,
      title: "Elastik tizzalik",
      subtitle:
        language === "uz"
          ? "Sportchilar uchun elastik tizzalik"
          : "Эластичные наколенники для спорта",
      image:
        "https://images.openai.com/thumbnails/url/orSnd3icDcnbDoIgAADQv-mNtKujrTVKZrZGFzPrqSUywQwo0Mwf61v6mzqv5_vh1mozcRwm6fOtLcuATeWgmxt7tYJ2qbo7hiuthcxnj-n_JohkMKC7MEnwEJGowoD7qIRbck3MU7IVBOc4cqs1aj3fHsKyRpeg8Ozr9KaA5_EOgleKvRoPe6P9LRdCYw6M8oVfHJnH4vOykf0NbdhYtcolbcka2IRAZfOoIp3KPPR0gfAPNgtBBQ",
    },
    {
      id: 3,
      title: "iPhone 12 Pro Max",
      subtitle:
        language === "uz"
          ? "128GB xotiraga ega Apple smartfoni"
          : "Apple смартфон с 128ГБ памяти",
      image: "https://apple-com.ru/image/cache/catalog/product/iphone%2012%20pro%20max/a2531f84a6bda9b79f20330197e6fdf2-800x540h.jpg.webp",
    },
    {
      id: 4,
      title: "Samsung Galaxy S21",
      subtitle:
        language === "uz"
          ? "Flagman telefon 5G texnologiyasi bilan"
          : "Флагманский телефон с 5G",
      image: "https://ikarvon.uz/storage/products/March2022/spjYiC4jDebma2NAr5Hq.webp",
    },
    {
      id: 5,
      title: "Sony WH-1000XM4",
      subtitle:
        language === "uz"
          ? "Simsiz quloqchinlar, ovoz izolyatsiyasi bilan"
          : "Беспроводные наушники с шумоподавлением",
      image: "https://images.openai.com/thumbnails/url/IuT0hHicDclLDoIwFADA27hDwA8RE2MIQQUCUlEUN0TaQiFaCn1-8GYexdvobOf7YQBCzlWVctz1AihRIOf6sJRwgQoPcXNTJWuEqHi5bBf_m1shMdcYSY26veHJPbwPJG0MQ2DPqdMCjqc81hMMRcSS8JyeOo3SfsaTLOLdnYxH4SOHiD5QAAXZ1pk-8l921iNu565JptF1c3F2W14bMXq2Hq2QfzTfLcuClWJOmDW4y1YsbMv5AWb4Qsg",
    },
  ];

  return (
    <div
      className={`py-8 px-4 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[ Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          spaceBetween={30}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className={`flex items-center justify-between px-8 py-6 transition-colors duration-500
                ${
                  theme === "dark"
                    ? "text-white"
                    : "text-black"
                }`}
              >
                <div className="max-w-xl">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg font-semibold mb-6">{slide.subtitle}</p>
                  <button
                    className={`px-6 py-2 border rounded-full text-lg font-medium transition
                    ${
                      theme === "dark"
                        ? "border-white hover:bg-white hover:text-black"
                        : "border-gray-800 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {language === "uz" ? "Batafsil" : "Подробнее"}
                  </button>
                </div>

                <div className="z-10 flex-shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-96 h-72 object-cover rounded-3xl  transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
