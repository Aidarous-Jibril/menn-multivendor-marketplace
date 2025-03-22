// // RelatedProducts.js
// import React from "react";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";


// const RelatedProducts = ({ similarProducts, title }) => {
//   return (
//     <div className="w-full py-8">
//       <h2 className="text-2xl font-extrabold text-gray-800 mb-6">{title}</h2>

//       {similarProducts && similarProducts.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6"> 
//           {similarProducts.map((product, index) => (
//             <div
//               key={index}
//               className="transform transition duration-300 hover:scale-105 bg-white p-4 shadow-lg rounded-lg">
//               <RelatedProductsCard product={product} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-600 text-lg mt-4">No related products found.</p>
//       )}
//     </div>

//   );
// };



// const RelatedProductsCard = ({ product }) => {
//   return (
//     <Link href={`/product/${product?._id}`} legacyBehavior>
//       <div className="bg-white rounded-lg shadow-md overflow-hidden w-full cursor-pointer transition-transform duration-300 hover:scale-105">
        
//         {/* Product Image */}
//         <div className="relative bg-gray-100">
//           <img
//             src={product?.images?.[0]?.url || "/placeholder.jpg"}
//             alt={product?.name || "Product Image"}
//             className="w-full h-full md:h-64 object-cover p-0"
//           />
//           {product?.discountPrice && (
//             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
//               -{Math.round(((product.originalPrice - product.discountPrice) / product.originalPrice) * 100)}%
//             </span>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="p-4">
//           {/* Product Name */}
//           <h3 className="text-gray-800 text-base font-semibold truncate">
//             {product?.name || "Product Name"}
//           </h3>

//           {/* Rating */}
//           <div className="flex items-center my-2">
//             <div className="flex text-yellow-500 text-sm">
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <FaStar
//                   key={index}
//                   className={product?.rating >= index + 1 ? "text-yellow-500" : "text-gray-300"}
//                 />
//               ))}
//             </div>
//             <span className="text-yellow-500 text-sm font-bold ml-2">
//               {product?.rating || "N/A"}
//             </span>
//           </div>

//           {/* Pricing */}
//           <div className="flex items-center space-x-2">
//             <span className="text-black text-lg font-bold">
//               ${product?.discountPrice || product?.originalPrice || "N/A"}
//             </span>
//             {product?.discountPrice && product?.originalPrice > product.discountPrice && (
//               <span className="text-gray-500 text-sm line-through">
//                 ${product?.originalPrice}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };



// export default RelatedProducts;



import React from 'react'

const RelatedProducts = () => {
  return (
    <div>RelatedProducts</div>
  )
}

export default RelatedProducts