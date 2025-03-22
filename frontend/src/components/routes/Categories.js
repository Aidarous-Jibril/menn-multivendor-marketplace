import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";

const Categories = ({ categories }) => {

  return (
     <div className="container mx-auto px-2 md:px-4 py-4 relative max-w-[95%] lg:max-w-[90%]"> 
      
      <hr className="mt-5 mb-2" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Explore Popular Categories</h2>
        <Link href="/categories" className="flex items-center text-blue-600">
          View All
          <ChevronRightIcon className="ml-2 h-5 w-5" />
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <div className="flex flex-nowrap gap-6 items-center justify-center md:justify-start">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex flex-col items-center text-center flex-shrink-0"
            >
              <Link href={`/category/${category.slug}`} passHref legacyBehavior>
                <a className="cursor-pointer">
                  <div className="w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 rounded-full bg-gray-100 overflow-hidden ">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold my-4 truncate">{category.name}</p>
                  </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
