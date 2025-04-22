// pages/sale/[id].js
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


const FlashProductDetails = ({ sale, similarProducts, vendorProducts }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
    const {userInfo} = useSelector((state) => state.user);

  const [count, setCount] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(sale?.images?.length > 0 ? sale?.images[0].url : "/default-image.jpg");
 const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({ rating: 0, comment: "" }); 
    const [sampleRating, setSampleRating] = useState(0);
  
  // for sample rating
  useEffect(() => {
    setSampleRating(Math.random() * (5 - 3) + 3);
  }, []);

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
    const isItemExists = cartItems.find((item) => item._id === sale._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (sale.stock < count) {
        toast.error("sale stock limited!");
      } else {
        const cartData = { ...sale, qty: count };
        dispatch(addItemToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishList(sale));
      setIsInWishlist(false);
    } else {
      dispatch(addItemToWishList(sale));
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
      productId: sale._id,
    };
    
    try {
      const result = await dispatch(createProductReview(newReviewData));
  
      console.log("Dispatch result:", result);
  
      if (result.type === "products/createProductReview/fulfilled") {
        toast.success(result.payload.message || "Review submitted successfully!");
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
    


  if (!sale || error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          {error || "sale not found!"}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        {/* Main Layout for Left and Right Sections */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-md rounded-lg p-6 items-stretch">
          {/* Left Section: sale Image and Thumbnails */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full ">
              <div className="w-full h-80 relative mb-4">
                <Image
                  src={selectedImage}
                  alt={sale?.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* Thumbnail Images */}
              <div className="flex gap-4 justify-center mt-2">
                {sale?.images.map((img, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 border rounded-lg cursor-pointer overflow-hidden"
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


          {/* Right Section: sale Details */}
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

            {/* sale Details Content */}
            <div>
              <h1 className="text-gray-800 text-3xl font-semibold">{sale?.name}</h1>
              {/* Countdown Timer */}
              <div className="mt-3">
                <CountdownTimer
                  endDate={sale?.endDate}
                  textColor="text-white"
                  bgColor="bg-red-600"
                  textSize="text-sm"
                />
              </div>

              <div className="flex items-center mt-3">
                <span className="text-2xl text-black font-bold">
                  ${sale?.discountPrice}
                </span>
                {sale?.originalPrice > sale?.discountPrice && (
                  <span className="text-gray-500 text-lg line-through ml-3">
                    ${sale?.originalPrice}
                  </span>
                )}
              </div>
              {/* <div className="flex items-center mt-2">
                <span className="flex text-yellow-500 text-sm">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        sale?.rating >= index + 1
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={index < Math.floor(sampleRating) ? "text-yellow-500" : "text-gray-300"}
                      size={14}
                    />
                  ))}
                </span>
                <span className="text-yellow-500 text-sm font-bold ml-2">
                  {sale?.rating || "4.5"}{sampleRating.toFixed(1)} / 5
                </span>
                <span className="text-sm ml-4 text-gray-600">
                  {sale?.sold_out} Sold
                </span>
              </div> */}
              <div className="flex items-center mt-2">
                {/* Star Ratings */}
                <span className="flex text-yellow-500 text-sm">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`${
                        (sale?.rating || sampleRating) >= index + 1
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </span>

                {/* Rating Value */}
                <span className="text-yellow-500 text-sm font-bold ml-2">
                  {(sale?.rating || sampleRating).toFixed(1)} / 5
                </span>

                {/* Sold Count */}
                <span className="text-sm ml-4 text-gray-600">
                  {sale?.sold_out} Sold
                </span>
              </div>

              {/* Stock Status */}
              <div className="mt-2">
                <span
                  className={`text-sm font-semibold ${
                    sale?.stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {sale?.stock > 0 ? "In Stock" : "Sold Out"}
                </span>
              </div>
              <p className="mt-4 text-gray-600">{sale?.description}</p>
              <ProductAttributes attributes={sale?.attributes} />
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
import CountdownTimer from "@/components/routes/sales/CountdownTimer";
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

// export async function getServerSideProps({ params }) {
//   const { id } = params;
//   const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; 

//   try {
//     const saleRes = await axios.get(`${baseURL}/api/sales/${id}`);
//     const sale = saleRes?.data.sale;
//     console.log("SALE logged in getServerSideProps:", sale)
//     // Fetch similar products and vendor products in parallel
//     const [similarProductsRes, vendorProductsRes] = await Promise.all([
//       axios.get(`${baseURL}/api/products?subSubCategory=${sale.subSubCategory}`),
//       axios.get(`${baseURL}/api/products/${sale.vendorId}/products`)
//     ]);

//     const similarProducts = similarProductsRes.data.products;
//     const vendorProducts = vendorProductsRes.data.products;

//     return {
//       props: {
//         sale,
//         similarProducts,
//         vendorProducts,
//       },
//     };
//   } catch (error) {
//     console.error("Failed to fetch data:", error.message);
//     return {
//       notFound: true,
//     };
//   }
// }
export async function getServerSideProps({ params }) {
  const { id } = params;
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    // First, fetch the sale data
    const saleRes = await axios.get(`${baseURL}/api/sales/${id}`);
    const sale = saleRes.data.sale;

    if (!sale) {
      return { notFound: true };
    }

    // Now fetch the other data using Promise.allSettled
    const results = await Promise.allSettled([
      axios.get(`${baseURL}/api/products?subSubCategory=${sale.subSubCategory}`),
      axios.get(`${baseURL}/api/products?vendorId=${sale.vendorId}`)
    ]);

    // Destructure the results; if a promise was rejected, fallback to an empty array
    const similarProducts =
      results[0].status === "fulfilled" ? results[0].value.data.products : [];
    const vendorProducts =
      results[1].status === "fulfilled" ? results[1].value.data.products : [];
console.log("similarProducts:", similarProducts)
    return {
      props: {
        sale,
        similarProducts,
        vendorProducts,
      },
    };
  } catch (error) {
    console.error("Failed to fetch sale:", error.message);
    return {
      notFound: true,
    };
  }
}
export default FlashProductDetails;

