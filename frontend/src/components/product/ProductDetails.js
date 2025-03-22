// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import {
// fetchProductsBySubSubCategory,
//   getProductById,
//   vendorGetAllProducts,
// } from "@/redux/slices/productSlice";
// import { addItemToCart } from "@/redux/slices/cartSlice";
// import { addItemToWishList, removeItemFromWishList } from "@/redux/slices/wishListSlice";
// //components
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Loader from "@/components/vendor/layout/Loader";
// import RelatedProducts from "@/components/product/RelatedProducts";
// import FeaturedProductsCard from "@/components/product/FeaturedProductsCard";


// const ProductDetailPage = ({product, isOnSale, saleEndDate}) => {
//   const router = useRouter();
//   const { id } = router.query;
//   const dispatch = useDispatch();
// //   const {  vendorProducts, similarProducts, isLoading, error } = useSelector((state) => state.products);
//   const { cartItems } = useSelector((state) => state.cart);
//   const { wishListItems } = useSelector((state) => state.wishList);
  
//   const [count, setCount] = useState(1);
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedImage, setSelectedImage] = useState("/default-image.jpg");

//   useEffect(() => {
//     if (product?.images && product.images.length > 0) {
//       setSelectedImage(product.images[0]?.url || "/default-image.jpg");
//     }
//   }, [product]);

//   useEffect(() => {
//     if (id) {
//       dispatch(getProductById(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (product?.vendor?._id) {
//       dispatch(vendorGetAllProducts(product?.vendorId));
//     }
//   }, [product, dispatch]);

//   useEffect(() => {
//     if (product?.subSubCategory) {
//       dispatch(fetchProductsBySubSubCategory({ id: product.subSubCategory }));
//     }
//   }, [dispatch, product?.subSubCategory]);

//   useEffect(() => {
//     if (wishListItems && wishListItems.find((item) => item._id === id)) {
//       setIsInWishlist(true);
//     } else {
//       setIsInWishlist(false);
//     }
//   }, [wishListItems, id]);

//   const incrementCount = () => setCount(count + 1);
//   const decrementCount = () => {
//     if (count > 1) setCount(count - 1);
//   };

//   const addToCartHandler = () => {
//     const isItemExists = cartItems.find((item) => item._id === product._id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (product.stock < count) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...product, qty: count };
//         dispatch(addItemToCart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

//   const toggleWishlist = () => {
//     if (isInWishlist) {
//       dispatch(removeItemFromWishList(product));
//       setIsInWishlist(false);
//     } else {
//       dispatch(addItemToWishList(product));
//       setIsInWishlist(true);
//     }
//   };

// //   if (isLoading) return <Loader />;
// //   if (error) return <div>Error: {error}</div>;

//   return (
//       <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Left Section: Product Image and Thumbnails */}
//         <div className="lg:col-span-1">
//           <div className="p-4 border rounded-lg shadow-lg">
//             {/* Main Product Image */}
//             <div className="mb-4">
//               <img
//                 src={selectedImage}
//                 alt={product?.name}
//                 className="w-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
//               />
//             </div>

//             {/* Thumbnail Images */}
//             <div className="flex justify-center gap-2">
//               {product?.images.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img.url}
//                   alt={`Thumbnail ${index + 1}`}
//                   className={`w-16 h-16 border rounded-lg cursor-pointer transition-opacity duration-300 ease-in-out ${
//                     selectedImage === img.url ? 'opacity-100' : 'opacity-70 hover:opacity-100'
//                   }`}
//                   onClick={() => setSelectedImage(img.url)} // Update main image on click
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Middle Section: Product Details */}
//         <div className="lg:col-span-1">
//           <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
//           <div className="flex items-center mb-4">
//             <div className="text-yellow-500">
//               {/* Star Ratings */}
//               <span>⭐</span>
//               <span>⭐</span>
//               <span>⭐</span>
//               <span>⭐</span>
//               <span>⭐</span>
//             </div>
//             <span className="text-gray-500 text-sm ml-2">
//               (0 Reviews) | 0 Orders | 0 Wish Listed
//             </span>
//           </div>
//           <div className="text-2xl font-bold text-blue-600 mb-4">
//             ${parseFloat(product?.discountPrice).toFixed(2)}
//             {product?.originalPrice > 0 && (
//               <span className="text-gray-500 line-through text-sm ml-2">
//                 ${parseFloat(product?.originalPrice).toFixed(2)}
//               </span>
//             )}
//           </div>
//           <div className="flex items-center mb-4">
//             <label htmlFor="quantity" className="mr-2 text-gray-700">
//               Quantity:
//             </label>
//             <div className="flex items-center border rounded-lg overflow-hidden">
//               <button
//                 className="px-2 py-1 text-gray-600"
//                 onClick={decrementCount}
//               >
//                 -
//               </button>
//               <input
//                 type="text"
//                 id="quantity"
//                 className="w-12 text-center border-l border-r py-1"
//                 value={count}
//               />
//               <button
//                 className="px-2 py-1 text-gray-600"
//                 onClick={incrementCount}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//           <div className="text-lg font-bold text-blue-600 mb-4">
//             Total Price: ${parseFloat(product?.discountPrice).toFixed(2)} (Tax
//             incl.)
//           </div>
//           <div className="flex gap-4 mb-4">
//             <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
//               Buy now
//             </button>
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
//               onClick={() => addToCartHandler(product._id)}
//             >
//               Add to cart
//             </button>
//             <div>
//               {isInWishlist ? (
//                 <AiFillHeart
//                   size={30}
//                   className="cursor-pointer"
//                   onClick={toggleWishlist} // Call toggleWishlist to remove from wishlist
//                   color="red"
//                   title="Remove from wishlist"
//                 />
//               ) : (
//                 <AiOutlineHeart
//                   size={30}
//                   className="cursor-pointer"
//                   onClick={toggleWishlist} // Call toggleWishlist to add to wishlist
//                   color="#333"
//                   title="Add to wishlist"
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Section: Vendor Info and More Products */}
//         <div className="lg:col-span-1">
//           <div className="p-4 border rounded-lg shadow-lg mb-4">
//             <ul className="space-y-2 text-sm text-gray-600">
//               <li className="flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="w-5 h-5 mr-2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 5h18M9 5v13a3 3 0 01-3 3H6a3 3 0 01-3-3V5a3 3 0 013-3h1a3 3 0 013 3z"
//                   />
//                 </svg>
//                 <span className="font-medium">Brand:</span> {product?.brand}
//               </li>
//               <li className="flex items-center">

//                 <span className="font-medium">Category:</span>{" "}
//                 {product?.category}
//               </li>
//               <li className="flex items-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   className="w-5 h-5 mr-2"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 5h18M9 5v13a3 3 0 01-3 3H6a3 3 0 01-3-3V5a3 3 0 013-3h1a3 3 0 013 3z"
//                   />
//                 </svg>
//                 <span className="font-medium">Stock:</span>{" "}
//                 {product?.stock} items available
//               </li>
//             </ul>
//           </div>

//           {/* <RelatedProducts products={similarProducts} />
//           <FeaturedProductsCard products={vendorProducts} /> */}
//         </div>
//       </div>
//   );
// };

// export default ProductDetailPage;



import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  fetchProductsBySubSubCategory,
  getProductById,
  vendorGetAllProducts,
} from "@/redux/slices/productSlice";
import { addItemToCart } from "@/redux/slices/cartSlice";
import { addItemToWishList, removeItemFromWishList } from "@/redux/slices/wishListSlice";
//components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/vendor/layout/Loader";
import RelatedProducts from "@/components/product/RelatedProducts";
import FeaturedProductsCard from "@/components/product/FeaturedProductsCard";

const ProductDetailPage = ({ product, isOnSale, saleEndDate }) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  const { vendorProducts } = useSelector((state) => state.products);

  const [count, setCount] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState("/default-image.jpg");
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]?.url || "/default-image.jpg");
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.vendor?._id) {
      dispatch(vendorGetAllProducts(product?.vendorId));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (product?.subSubCategory) {
      dispatch(fetchProductsBySubSubCategory({ id: product.subSubCategory }));
    }
  }, [dispatch, product?.subSubCategory]);

  useEffect(() => {
    if (wishListItems && wishListItems.find((item) => item._id === id)) {
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

  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Section: Product Image and Thumbnails */}
        <div className="lg:col-span-2">
          <div className="p-4 border rounded-lg shadow-lg">
            {/* Main Product Image */}
            <div className="mb-4">
              <img
                src={selectedImage}
                alt={product?.name}
                className="w-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex justify-center gap-2">
              {product?.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 border rounded-lg cursor-pointer transition-opacity duration-300 ease-in-out ${
                    selectedImage === img.url ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(img.url)} // Update main image on click
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
          <div className="flex items-center mb-4">
            <div className="text-yellow-500">
              {/* Star Ratings */}
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <span className="text-gray-500 text-sm ml-2">
              (0 Reviews) | 0 Orders | 0 Wish Listed
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-4">
            ${parseFloat(product?.discountPrice).toFixed(2)}
            {product?.originalPrice > 0 && (
              <span className="text-gray-500 line-through text-sm ml-2">
                ${parseFloat(product?.originalPrice).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2 text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-2 py-1 text-gray-600"
                onClick={decrementCount}
              >
                -
              </button>
              <input
                type="text"
                id="quantity"
                className="w-12 text-center border-l border-r py-1"
                value={count}
              />
              <button
                className="px-2 py-1 text-gray-600"
                onClick={incrementCount}
              >
                +
              </button>
            </div>
          </div>
          <div className="text-lg font-bold text-blue-600 mb-4">
            Total Price: ${parseFloat(product?.discountPrice).toFixed(2)} (Tax
            incl.)
          </div>
          <div className="flex gap-4 mb-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
              Buy now
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => addToCartHandler(product._id)}
            >
              Add to cart
            </button>
            <div>
              {isInWishlist ? (
                <AiFillHeart
                  size={30}
                  className="cursor-pointer"
                  onClick={toggleWishlist} // Call toggleWishlist to remove from wishlist
                  color="red"
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  className="cursor-pointer"
                  onClick={toggleWishlist} // Call toggleWishlist to add to wishlist
                  color="#333"
                  title="Add to wishlist"
                />
              )}
            </div>
          </div>
          {/* Product Description Section */}
      <div className="container mx-auto p-6 mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4"
          onClick={toggleDescriptionVisibility}
        >
          {isDescriptionVisible ? 'Hide Description' : 'Show Description'}
        </button>

        {isDescriptionVisible && (
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 md:mr-8">
              {/* Tab Navigation */}
              <div className="border-b mb-4">
                <nav className="flex space-x-4">
                  <div
                    className={`cursor-pointer text-lg font-bold py-2 border-b-2 ${
                      activeTab === "overview"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </div>
                  <div
                    className={`cursor-pointer text-lg font-bold py-2 border-b-2 ${
                      activeTab === "reviews"
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </div>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="bg-gray-100 p-4 rounded-lg">
                {activeTab === "overview" && (
                  <>
                    <h3 className="text-lg font-bold mb-2">
                      Product Description:
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product?.description}
                    </p>
                  </>
                )}
                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Product Reviews:</h3>
                    {product?.reviews && product.reviews.length > 0 ? (
                      product?.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="mb-4 p-4 border rounded-lg bg-white shadow-sm"
                        >
                          <div className="text-sm font-bold">
                            {review.author}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.date}
                          </div>
                          <p className="text-gray-700 mt-2">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No reviews available.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
        </div>
      </div>

      
    </>
  );
};

export default ProductDetailPage;
