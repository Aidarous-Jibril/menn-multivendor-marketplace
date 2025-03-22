// Third-party library imports
import "quill/dist/quill.snow.css";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

// Local imports (Redux slices)
import { createProduct } from "@/redux/slices/productSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchAllBrands } from "@/redux/slices/brandSlice";

// Category-specific attributes
const categoryAttributes = {
  clothing: ["size", "color", "material", "gender"],
  vehicles: ["model", "make", "year", "mileage", "fuelType"],
  electronics: [
    "model",
    "warranty",
    "condition",
    "processor",
    "memory",
    "storage",
    "display",
  ],
  shoes: ["size", "color", "material", "gender"],
  property: ["propertyType", "location", "bedrooms", "bathrooms", "area"],
  content: ["author", "publisher", "genre", "format", "language"],
  home: ["material", "dimensions", "roomType"],
  wellness: ["type", "expiryDate", "ingredients", "gender"],
  jobs: ["jobType", "location", "salary", "experienceLevel", "industry"],
};


const CreateProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { vendorInfo } = useSelector((state) => state.vendors);
  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);

  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    subSubCategory: "",
    brand: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
    isFeatured: false,
    attributes: {},
  });

  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllBrands());
  }, [dispatch]);

  useEffect(() => {
    if (productData.mainCategory) {
      const mainCategoryObj = categories.find(
        (cat) => cat.slug === productData.mainCategory
      );
      setSubcategories(mainCategoryObj?.subcategories || []);
      setProductData({
        ...productData,
        subCategory: "",
        subSubCategory: "",
        attributes: {},
      });
    }
  }, [productData.mainCategory, categories]);

  useEffect(() => {
    if (productData.subCategory) {
      const subCategoryObj = subcategories.find(
        (subcat) => subcat.slug === productData.subCategory
      );
      console.log("subCategoryObj:", subCategoryObj); // Log here
      setSubSubcategories(subCategoryObj?.subsubcategories || []);
    } else {
      setSubSubcategories([]);
    }
  }, [productData.subCategory, subcategories]);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductData({
      ...productData,
      mainCategory: value,
      subCategory: "",
      subSubCategory: "",
      attributes: {},
    });
  };

  const handleDescriptionChange = (content) => {
    // Remove all HTML tags and store as plain text
    const cleanContent = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] }).trim();
  
    setProductData((prevData) => ({
      ...prevData,
      description: cleanContent,
    }));
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      attributes: { ...productData.attributes, [name]: value },
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleIsFeaturedChange = (e) => {
    setProductData({
      ...productData,
      isFeatured: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productData.mainCategory ||
      !productData.subCategory ||
      !productData.brand
    ) {
      toast.error("Please select all required fields.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const newForm = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key !== "attributes") {
        newForm.append(key, productData[key]);
      }
    });
    newForm.append("vendorId", vendorInfo._id);

    Object.keys(productData.attributes).forEach((key) => {
      newForm.append(`attributes[${key}]`, productData.attributes[key]);
    });

    images.forEach((url) => {
      newForm.append("images", url);
    });
    try {
      const result = await dispatch(createProduct(newForm));

      if (result.type === "products/createProduct/fulfilled") {
        toast.success("Product created successfully!");
        router.push("/vendor/dashboard");
      } else if (result.type === "products/createProduct/rejected") {
        const errorMessage = result.payload?.message || "An error occurred while creating the product.";
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full bg-gray-100 p-4 rounded-md">
      {/* Page Header */}
      <div className="w-full flex justify-between items-center mb-4">
        <h5 className="text-[24px] font-[500]">Create Product</h5>
      </div>

      {/* Form Fields */}
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Product Information */}
        <div className="w-full mb-6 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>

          <div className="flex items-center mb-4">
            <label className="w-[180px] text-[16px] font-medium">
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New product"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[16px] font-medium mb-2">
              Description:
            </label>
            <RichTextEditor
              value={productData.description}
              onChange={handleDescriptionChange}
              className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Selection */}
          <div>
            <label className="block mb-2 text-[16px]">Main Category:</label>
            <select
              value={productData.mainCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a category</option>
              {categories?.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Selection */}
          <div>
            <label className="block mb-2 text-[16px]">Subcategory:</label>
            <select
              value={productData.subCategory}
              onChange={(e) =>
                setProductData({ ...productData, subCategory: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.slug} value={subcategory.slug}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Subcategory Selection */}
          <div>
            <label className="block mb-2 text-[16px]">Sub-Subcategory:</label>
            <select
              value={productData.subSubCategory}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  subSubCategory: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a sub-subcategory</option>
              {subSubcategories.map((subSubcategory) => (
                <option key={subSubcategory.slug} value={subSubcategory.slug}>
                  {subSubcategory.name}
                </option>
              ))}
            </select>
          </div>
          {/* Brand Selection */}
          <div>
            <label className="block mb-2 text-[16px]">Brand:</label>
            <select
              value={productData.brand}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  brand: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a Brand</option>
              {brands?.map((brand) => (
                <option key={brand.name} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price and Stock */}
        <div className="mb-6 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Price & Stock</h2>

          <div className="flex items-center mb-4">
            <label className="w-[180px] text-[16px] font-medium">
              Original Price:
            </label>
            <input
              type="number"
              name="originalPrice"
              value={productData.originalPrice}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="w-[180px] text-[16px] font-medium">
              Discount Price:
            </label>
            <input
              type="number"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="w-[180px] text-[16px] font-medium">Stock:</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Attribute Fields */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryAttributes[productData.mainCategory]?.map((attribute) => (
            <div className="flex items-center mb-4" key={attribute}>
              <label className="w-[180px] text-[16px]">
                {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:
              </label>
              <input
                type="text"
                name={attribute}
                value={productData.attributes[attribute] || ""}
                onChange={handleAttributeChange}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Images Upload */}
        <div className="mb-6 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 border border-gray-300 rounded-md"
          />
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`preview ${index}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Product Checkbox */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={productData.isFeatured}
              onChange={handleIsFeaturedChange}
              className="mr-2"
            />
            <span className="text-[16px] font-medium">Featured Product</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-500 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <AiOutlinePlus size={22} className="mr-1" />
          <span className="font-semibold tracking-wide">Create Product</span>
        </button>
      </form>
    </div>
  );
};

import "quill/dist/quill.snow.css"; // Import Quill CSS
import { AiOutlinePlus } from "react-icons/ai";

let Quill;

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const loadQuill = async () => {
    if (typeof window !== "undefined") {
      const QuillImport = await import("quill");
      Quill = QuillImport.default;
    }
  };

  useEffect(() => {
    loadQuill().then(() => {
      if (Quill && quillRef.current && !editorRef.current) {
        editorRef.current = new Quill(quillRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link", "image"],
            ],
          },
        });

        // Set the initial content and listen for changes
        editorRef.current.root.innerHTML = value;
        editorRef.current.on("text-change", () => {
          onChange(editorRef.current.root.innerHTML);
        });
      }
    });
  }, []);

  return (
    <div style={{ border: "1px solid #ccc", minHeight: "150px" }}>
      <div ref={quillRef} />
    </div>
  );
};

export default CreateProduct;
