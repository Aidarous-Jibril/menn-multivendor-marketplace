import React, { useState, useEffect } from "react";
import axios from "axios";
import {  FaTimes, FaSearch, FaFilter } from "react-icons/fa";

import {fetchSubcategories, fetchSubSubcategories } from "@/redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";

const VendorProfile = ({ vendor, vendorProducts, brands, categories }) => {
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { subcategories, subSubcategories } = useSelector((state) => state.categories);
  const [vendorInfo, setVendorInfo] = useState(null);

  useEffect(() => {
    if (vendor) {
      setVendorInfo(vendor);
      localStorage.setItem("vendorInfo", JSON.stringify(vendorInfo));
    }
  }, [vendor]);
 
  useEffect(() => {
    if (mainCategory) {
      dispatch(fetchSubcategories(mainCategory));
      dispatch(fetchSubcategories("")); // Reset subcategories
    }
    setSubCategory("");
    setSubSubCategory("");
  }, [dispatch, mainCategory]);

  useEffect(() => {
    if (subCategory) {
      dispatch(fetchSubSubcategories(subCategory));
    } else {
      dispatch(fetchSubSubcategories("")); // Reset sub-subcategories
    }
    setSubSubCategory("");
  }, [dispatch, subCategory]);

  useEffect(() => {
    let filtered = [...vendorProducts]; // Copy the array.

    if (mainCategory) {
      filtered = filtered.filter(
        (product) => product.mainCategory === mainCategory
      );
    }
    if (subCategory) {
      filtered = filtered.filter(
        (product) => product.subCategory === subCategory
      );
    }
    if (subSubCategory) {
      filtered = filtered.filter(
        (product) => product.subSubCategory === subSubCategory
      );
    }
    if (selectedBrand) {
      console.log("Selected Brand:", selectedBrand);
      filtered = filtered.filter((product) => product.brand === selectedBrand);
    }
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((sale) =>
        sale.name.toLowerCase().includes(lowerCaseQuery)
      );
    }
    setFilteredProducts(filtered);
//     let filtered = vendorProducts
//   .filter((product) => !mainCategory || product.mainCategory === mainCategory)
//   .filter((product) => !subCategory || product.subCategory === subCategory)
//   .filter((product) => !subSubCategory || product.subSubCategory === subSubCategory)
//   .filter((product) => !selectedBrand || product.brand === selectedBrand)
//   .filter((product) =>
//     !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
// setFilteredProducts(filtered);

  }, [
    mainCategory,
    subCategory,
    subSubCategory,
    selectedBrand,
    vendorProducts,
    searchQuery,
  ]);

  // Search input handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResetFilters = () => {
    setMainCategory(""); // Reset main category
    setSubCategory(""); // Reset subcategory
    setSubSubCategory(""); // Reset sub-subcategory
    setSelectedBrand(""); // Reset selected brand
    setFilteredProducts(vendorProducts); // Reset the filtered products
    setSearchQuery("");
  };
  return (
    <>
    <Header categories={categories} />
      <div className="container mx-auto p-6">
        {/* Hero Section  */}
        <div className="bg-[#416B80] text-white p-10 rounded-lg text-center">
          <div className="flex justify-center items-center mb-4">
            {vendorInfo?.avatar?.url && (
              <img
                src={vendorInfo?.avatar?.url}
                alt={`${vendorInfo?.name} Avatar`}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>
          <h1 className="text-3xl font-bold">{vendorInfo?.name} Store</h1>
          <p className="mt-2">{vendorInfo?.description || "No description available"}</p>
        </div>

        {/* Product Filter Clear and Search - Centered */}
        <div className="p-4 bg-white shadow mt-4 flex justify-center items-center">
          {/* Search Bar */}
          <div className="relative w-full sm:w-2/3 max-w-lg">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {/* Filter Button */}
          <div className="ml-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              onClick={handleResetFilters}
            >
              <FaTimes />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaFilter className="text-black-500" />
            <h2 className="text-lg font-semibold">Filter Products</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="block text-gray-700">Main Category</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
              >
                <option value="">Select Main Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Sub Category</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!mainCategory}
              >
                <option value="">Select Sub Category</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub.slug}>{sub.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Sub-Sub Category</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={subSubCategory}
                onChange={(e) => setSubSubCategory(e.target.value)}
                disabled={!subCategory}
              >
                <option value="">Select Sub-Sub Category</option>
                {subSubcategories.map((subSub) => (
                  <option key={subSub._id} value={subSub.slug}>{subSub.name}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700">Brand</label>
              <select
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            {filteredProducts && filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className=" bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>

      </div>
    <Footer />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id: vendorId } = context.query;
  const baseURL = process.env.API_URL || "http://localhost:8000"; //process.env.API_URL is undefined, check it
console.log("process.env.API_URL:", process.env.API_URL)
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error.message);
      return null;
    }
  };


  const [vendorRes, vendorProductsRes, brandsRes, categoriesRes] =
    await Promise.all([
      fetchData(`${baseURL}/api/vendors/${vendorId}`),
      fetchData(`${baseURL}/api/products/${vendorId}/products`),
      fetchData(`${baseURL}/api/brands`),
      fetchData(`${baseURL}/api/categories`),
    ]);

  return {
    props: {
      vendor: vendorRes?.vendor || [],
      vendorProducts: vendorProductsRes?.products || [],
      brands: brandsRes?.brands || [],
      categories: categoriesRes?.categories || [],
    },
  };
};

export default VendorProfile;

