import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "../vendor/layout/Loader";
import ProductCard from "../product/ProductCard";

const LatestProducts = ({ products, isLoading, error }) => {
  const scrollRef = useRef(null);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date descending
    .slice(0, 10);

  if (!products || products.length === 0) return <div>No products found</div>;
  if (latestProducts.length === 0)
    return <div>No latest products available</div>;

  //arrows
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 relative max-w-[95%] lg:max-w-[90%]">
      <hr className="mt-5 mb-2" />
      <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6">
        Latest Products
      </h2>

      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Products Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-2 pb-4 scrollbar-hide"
      >
        <div className="flex gap-4 flex-nowrap">
          {latestProducts.map((product) => (
            <div key={product._id} className="min-w-[200px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default LatestProducts;