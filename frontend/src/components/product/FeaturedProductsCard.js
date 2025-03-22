// import Link from 'next/link';
// import Image from 'next/image'; 

// const FeaturedProductsCard = ({ product }) => {
//   const originalPrice = parseFloat(product?.originalPrice) || 0;
//   const discountedPrice = parseFloat(product?.discountPrice) || 0;

//   const calculateDiscountPercentage = (original, discounted) => {
//     if (original > 0) {
//       const discountPercentage = ((original - discounted) / original) * 100;
//       return discountPercentage.toFixed(0); 
//     }
//     return 0;
//   };

//   const discountPercentage = calculateDiscountPercentage(originalPrice, discountedPrice);

//   return (
//     <Link href={`/product/${product?._id}`} passHref>
//       <div className="border rounded-lg p-4 bg-white shadow-sm max-w-xs flex items-center cursor-pointer">
//         {/* Left side: Image and discount */}
//         <div className="relative w-40 h-30 flex-shrink-0 mr-4 overflow-hidden">
//           <Image
//             src={product?.images[0]?.url || "/default-image.jpg"}
//             alt={product?.name}
//             width={100}  
//             height={100} 
//             className="rounded-lg transform transition-transform duration-300 hover:scale-110"
//           />
//           {discountPercentage > 0 && (
//             <span className="absolute top-1 left-1 bg-green-800 text-white px-1 py-0.5 rounded-lg text-xs">
//             -{discountPercentage}%
//             </span>
//           )}
//         </div>
        
//         {/* Right side: Product information */}
//         <div className="flex-grow">
//           <h3 className="text-lg font-bold mb-1">
//             {product?.name.slice(0, 10)}
//           </h3>
//           {product?.originalPrice > 0 && (
//             <div className="text-gray-500 line-through text-sm">
//               ${parseFloat(product?.originalPrice).toFixed(2)}
//             </div>
//           )}
//           <div className="text-blue-600 font-bold">
//             ${parseFloat(product?.discountPrice).toFixed(2)}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default FeaturedProductsCard;
