"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function AccordionText({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [fileContents, setFileContents] = useState({});

  useEffect(() => {
    const itemsWithFiles = items.filter((item) => item.contentFile);

    itemsWithFiles.forEach(async (item) => {
      if (fileContents[item.contentFile]) {
        return;
      }

      try {
        const response = await fetch(item.contentFile);
        const text = await response.text();

        setFileContents((currentContents) => ({
          ...currentContents,
          [item.contentFile]: text,
        }));
      } catch {
        setFileContents((currentContents) => ({
          ...currentContents,
          [item.contentFile]: "Konten belum bisa dimuat.",
        }));
      }
    });
  }, [items, fileContents]);

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const content = item.contentFile
          ? fileContents[item.contentFile] || "Memuat konten..."
          : item.content;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-800/40 transition-colors"
            >
              <span className="text-sm md:text-base font-semibold text-slate-100">
                {item.title}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-teal-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="whitespace-pre-line px-5 pb-5 text-sm md:text-base leading-relaxed text-slate-300 text-justify">
                    {content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
