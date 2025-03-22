import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto p-2">
        {/* Back to Home Link */}
        <Link href="/" passHref legacyBehavior>
          <a className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Home
          </a>
        </Link>

        <div className="bg-blue-100 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-blue-700">CATEGORY</h1>
          <p className="text-blue-600">
            Find your favourite categories and products
          </p>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`} key={category._id}>
              <div className="bg-white p-2 rounded-lg shadow cursor-pointer hover:shadow-lg transition transform hover:scale-105">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="mx-auto mb-2 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 object-cover rounded-full"
                />
                <p className="text-center text-gray-800 font-medium text-xs md:text-sm">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
