"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoCarousel({ photos }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return null;
  }

  const activePhoto = photos[activeIndex];
  const hasMultiplePhotos = photos.length > 1;

  const showPreviousPhoto = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    );
  };

  const showNextPhoto = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30">
      <div className="relative aspect-[16/9] bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhoto.src}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {hasMultiplePhotos && (
          <>
            <button
              type="button"
              onClick={showPreviousPhoto}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-950/70 p-2 text-slate-200 backdrop-blur hover:border-teal-400 hover:text-teal-300 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={showNextPhoto}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-950/70 p-2 text-slate-200 backdrop-blur hover:border-teal-400 hover:text-teal-300 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">
            {activePhoto.title}
          </h3>
          {activePhoto.description && (
            <p className="mt-1 text-sm text-slate-400">
              {activePhoto.description}
            </p>
          )}
        </div>

        {hasMultiplePhotos && (
          <div className="flex items-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Tampilkan ${photo.alt}`}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-teal-400"
                    : "w-2.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
