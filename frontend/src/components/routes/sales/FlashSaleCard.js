// /components/routes/sales/flashSaleCard
import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import CountdownTimer from "./CountdownTimer";

const FlashCard = ({ event }) => {
  const {
    _id,
    images,
    name,
    originalPrice,
    discountPrice,
    rating,
    sold_out,
    stock,
    endDate,
  } = event;

  return (
    <div className="bg-white shadow-md rounded-lg p-3 min-w-[200px] max-w-[240px] transform transition-transform hover:scale-105 relative">
      <div className="relative">
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
          -{Math.round(((originalPrice - discountPrice) / originalPrice) * 100)}%
        </span>
        <img
          src={images[0]?.url || "/placeholder.jpg"}
          alt={name}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      <div className="mt-2">
        <div className="px-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h3 className="text-gray-800 text-base font-semibold truncate w-full md:w-auto">
              {name.slice(0, 15)}
              {name.length > 15 ? "..." : ""}
            </h3>
            <div className="flex items-center mt-2 md:mt-0">
              <span className="text-lg text-black font-bold">${discountPrice}</span>
              {originalPrice > discountPrice && (
                <span className="text-gray-500 text-sm line-through ml-2">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center mt-1">
          <span className="flex text-yellow-500 text-xs">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={`text-${rating >= index + 1 ? "yellow-500" : "gray-300"}`}
              />
            ))}
          </span>
          <span className="text-yellow-500 text-xs font-bold ml-2">{rating || "4.5"}</span>
          <span className="text-xs ml-2">{sold_out} Sold</span>
        </div>
        <div className="flex items-center mt-1">
          <span className={`text-xs font-bold ${stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {stock > 0 ? "In Stock" : "Sold Out"}
          </span>
        </div>

        <div className="mt-2">
          <CountdownTimer
            endDate={endDate} 
            textColor="text-white" 
            bgColor="bg-red-800" 
            textSize="text-sm" 
          />
        </div>

        <div className="mt-3 flex space-x-8">
          <Link href={`/flash-sale/${_id}`} legacyBehavior>
            <a className="bg-black text-white text-xs font-bold py-1 px-2.5 rounded-md hover:bg-gray-800">
              See Details
            </a>
          </Link>
          <button className="bg-black text-white text-xs font-bold py-1 px-2.5 rounded-md hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
