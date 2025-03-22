// pages/product/[id].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { addItemToCart } from "@/redux/slices/cartSlice";
import { addItemToWishList, removeItemFromWishList} from "@/redux/slices/wishListSlice";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import ProductCard from "@/components/product/ProductCard";
import Image from "next/image";
import {  Button, TextField, Modal, Box } from "@mui/material";



const ProductDetailPage = ({ product, similarProducts, vendorProducts, categories}) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  const {userInfo} = useSelector((state) => state.user);

  const [count, setCount] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.length > 0 ? product.images[0].url : "/default-image.jpg"
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].url); 
    }
  }, [product])

  useEffect(() => {
    if (wishListItems.find((item) => item._id === id)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishListItems, id]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const addToCartHandler = () => {
    const isItemExists = cartItems.find((item) => item._id === product._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...product, qty: count };
        dispatch(addItemToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishList(product));
      setIsInWishlist(false);
    } else {
      dispatch(addItemToWishList(product));
      setIsInWishlist(true);
    }
  };
//Review
  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReview({ rating: 0, comment: "" });
  };

  const submitReview = async () => {
    const newReviewData = {
      user: userInfo,
      rating: review.rating,
      comment: review.comment,
      productId: product._id,
    };  
    try {
      const result = await dispatch(createProductReview(newReviewData));
    
      if (result.type === "products/createProductReview/fulfilled") {
        toast.success(result.payload.message || "Review submitted successfully!");
        closeReviewModal();
        router.push(`/product/${product?._id}`);
      } else if (result.type === "products/createProductReview/rejected") {
        toast.error(result.payload || "You have already reviewed this product.");
        window.location.reload(); 
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      window.location.reload(); 
    }
  };
  
  if (!product || error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          {error || "Product not found!"}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header categories={categories} />

      <div className="container mx-auto p-6">
        {/* Main Layout for Left and Right Sections */}
        <div className="flex flex-col lg:flex-row gap-4 bg-[#F6F6F6] shadow-md rounded-lg p-4 items-stretch">

        {/* Left Section: Product Image and Thumbnails */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full">
            {/* Main Product Image */}
            <div className="w-full h-[400px] relative mb-4">
              <Image
                src={selectedImage}
                alt={product?.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg border border-gray-200"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 mt-2 overflow-x-auto">
              {product?.images.map((img, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 flex-shrink-0 border rounded-lg cursor-pointer overflow-hidden ${
                    selectedImage === img.url ? "border-2 border-blue-500" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img.url)}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    width={96}
                    height={96}
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            {isInWishlist ? (
              <AiFillHeart className="text-3xl" />
            ) : (
              <AiOutlineHeart className="text-3xl" />
            )}
          </button>

          {/* Product Details Content */}
          <div>
            <h1 className="text-gray-800 text-3xl font-semibold">
              {product?.name}
            </h1>
            <div className="flex items-center mt-3">
              <span className="text-2xl text-black font-bold">
                ${product?.discountPrice}
              </span>
              {product?.originalPrice > product?.discountPrice && (
                <span className="text-gray-500 text-lg line-through ml-3">
                  ${product?.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center mt-2">
              <span className="flex text-yellow-500 text-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      product?.rating >= index + 1
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </span>
              <span className="text-yellow-500 text-sm font-bold ml-2">
                ({product?.rating || "4.5"})
              </span>
              <span className="text-sm ml-4 text-gray-600">
                {product?.sold_out} Sold 
              </span>
            </div>

            {/* Stock Status */}
            <div className="mt-2">
              <span
                className={`text-sm font-semibold ${
                  product?.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product?.stock > 0 ? "In Stock" : "Sold Out"}
              </span>
            </div>
            <p className="mt-4 text-gray-600">{product?.description}</p>
            <ProductAttributes attributes={product?.attributes} />
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={decrementCount}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-l-lg hover:bg-gray-300 text-lg"
              >
                -
              </button>
              <span className="px-8 py-2 text-gray-700 text-lg">{count}</span>
              <button
                onClick={incrementCount}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-r-lg hover:bg-gray-300 text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCartHandler}
              className="flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white text-lg font-medium rounded-lg shadow hover:bg-gray-800"
            >
              Add To Cart
            </button>
            {/* Wishlist Icon Button */}
            <button
              onClick={toggleWishlist}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-200 focus:outline-none mx-auto"
            >
              {isInWishlist ? (
                <AiFillHeart className="text-red-500 text-2xl sm:text-3xl" />
              ) : (
                <AiOutlineHeart className="text-gray-500 text-2xl sm:text-3xl" />
              )}
            </button>
            <button
              onClick={openReviewModal}
              className="flex items-center justify-center px-6 py-2.5 bg-blue-500 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-600"
            >
              Leave a Review
            </button>
          </div>
        </div>
        </div>

      {/* Review Modal */}
      <Modal
        open={isReviewModalOpen}
        onClose={closeReviewModal}
        aria-labelledby="review-modal-title"
        aria-describedby="review-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="review-modal-title" variant="h6" component="h2">
            Leave a Review
          </Typography>
          
          {/* Rating Selection */}
          <div className="flex items-center mt-4">
            <span className="mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((ratingValue) => (
              <FaStar
                key={ratingValue}
                className={`cursor-pointer text-2xl ${
                  review.rating >= ratingValue
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                onClick={() => setReview((prev) => ({ ...prev, rating: ratingValue }))}
              />
            ))}
          </div>

          {/* Review Text */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Write your review here..."
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            sx={{ mt: 2 }}
          />

          {/* Modal Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={closeReviewModal} sx={{ mr: 2 }} variant="outlined">
              Cancel
            </Button>
            <Button onClick={submitReview} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

        {/* Related Products and More from Store */}
        <div className="mt-12 flex flex-col md:flex-row justify-between gap-6">
          {/* More from the Store Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold">Related Products</h3>
            <div className="mt-6 flex flex-row gap-4">
              {similarProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* More from the Store Section */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold">More From The Store</h3>
            <div className="mt-6 flex flex-col gap-4">
              {vendorProducts?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isMoreFromSeller={true}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12"></div>
      </div>

      <Footer />
    </>
  );
};

import {
  FaTag,
  FaRuler,
  FaPalette,
  FaCogs,
  FaCar,
  FaClock,
  FaGasPump,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaBook,
  FaBuilding,
  FaBriefcase,
  FaMoneyBillWave,
  FaUser,
  FaLayerGroup,
  FaMap,
  FaCalendarAlt,
  FaVial,
} from "react-icons/fa";
import { Typography } from "@mui/joy";
import { createProductReview } from "@/redux/slices/productSlice";

// Mapping of attributes to icons
const attributeIcons = {
  brand: FaTag,
  size: FaRuler,
  color: FaPalette,
  material: FaCogs,
  gender: FaUser,
  model: FaCar,
  make: FaCar,
  year: FaClock,
  mileage: FaMapMarkerAlt,
  fuelType: FaGasPump,
  warranty: FaCalendarAlt,
  condition: FaCogs,
  processor: FaCogs,
  memory: FaLayerGroup,
  storage: FaLayerGroup,
  display: FaRuler,
  propertyType: FaBuilding,
  location: FaMap,
  bedrooms: FaBed,
  bathrooms: FaBath,
  area: FaRuler,
  author: FaUser,
  publisher: FaBuilding,
  genre: FaBook,
  format: FaBook,
  language: FaBook,
  roomType: FaBuilding,
  type: FaTag,
  expiryDate: FaCalendarAlt,
  ingredients: FaVial,
  jobType: FaBriefcase,
  salary: FaMoneyBillWave,
  experienceLevel: FaUser,
  industry: FaCogs,
};

const ProductAttributes = ({ attributes }) => {
  if (!attributes || Object.keys(attributes).length === 0) return null;

  return (
    <div className="mt-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(attributes).map(([key, value]) => {
          // Get the corresponding icon for the attribute, if it exists
          const IconComponent = attributeIcons[key.toLowerCase()];

          return (
            <li key={key} className="text-gray-700 flex items-center">
              {IconComponent && (
                <IconComponent className="mr-2 text-gray-500" />
              )}
              <span className="font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>
              <span className="ml-2">{value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    // Fetch the product first
    const productRes = await axios.get(`${baseURL}/api/products/${id}`).catch((err) => {
      console.error("Single Product Error:", err);
      return null;
    });

    if (!productRes || !productRes.data || !productRes.data.product) {
      return { notFound: true };
    }

    const product = productRes.data.product;

    const [similarProductsRes, vendorProductsRes, categoriesRes] = await Promise.all([
      axios
        .get(`${baseURL}/api/products?subSubCategory=${product.subSubCategory}`)
        .catch((err) => {
          console.error("Similar Products Error:", err);
          return null;
        }),
      axios
        .get(`${baseURL}/api/products/${product.vendorId}/products`)
        .catch((err) => {
          console.error("Vendor Products Error:", err);
          return null;
        }),
        axios.get(`${baseURL}/api/categories`).catch((err) => {
          console.error("Categories Error:", err);
          return null;
        }),
      ]);

    return {
      props: {
        product,
        similarProducts: similarProductsRes?.data?.products || [],
        vendorProducts: vendorProductsRes?.data?.products || [],
        categories: categoriesRes?.data?.categories || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return {
      notFound: true,
    };
  }
}

export default ProductDetailPage;
