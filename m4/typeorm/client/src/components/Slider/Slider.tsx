"use client";

import { SliderProps } from "@/types";
import React, { useState, useCallback, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Slider: React.FC<SliderProps> = ({ announcements }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  }, [announcements.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === announcements.length - 1 ? 0 : prev + 1
    );
  }, [announcements.length]);

  const goToSlide = useCallback((index: number) => setCurrentIndex(index), []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!announcements || announcements.length === 0) {
    return <div>No hay diapositivas disponibles</div>;
  }

  return (
    <div className="max-w-[1400px] h-[500px] w-full m-auto py-16 px-4 relative group">
      {/* Imagen */}
      <div
        style={{ backgroundImage: `url(${announcements[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      />
      {/* Flechas */}
      <div
        className="hidden group-hover:block absolute top-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <BsChevronCompactRight size={30} />
      </div>
      <div
        className="hidden group-hover:block absolute top-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <BsChevronCompactLeft size={30} />
      </div>
      {/* Indicadores */}
      <div className="flex justify-center py-2">
        {announcements.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`text-2xl cursor-pointer ${
              index === currentIndex ? "text-blue-500" : "text-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
