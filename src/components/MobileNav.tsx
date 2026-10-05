"use client";

import { useState } from "react";

type Category = {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
};

type MobileNavProps = {
  categories: Category[];
};

const MobileNav = ({ categories }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      {/* Hamburger */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <span className="text-sm font-semibold text-gray-800">
            মেনু
          </span>

          <div className="flex flex-col gap-1">
            <span
              className={`h-0.5 w-5 bg-gray-800 transition-transform ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 bg-gray-800 transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-0.5 w-5 bg-gray-800 transition-transform ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white shadow-sm">
          <div className="px-4 py-2">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={category.slug}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 last:border-0 hover:text-red-600"
              >
                <span>{category.title}</span>

                <span className="text-gray-300">›</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;