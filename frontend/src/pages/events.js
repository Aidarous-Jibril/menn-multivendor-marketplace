// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllSales } from "@/redux/slices/saleSlice";
// import FlashSaleCard from "@/components/routes/sales/FlashSaleCard";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Link from "next/link";

// const AllEventsPage = () => {
//   const dispatch = useDispatch();
//   const { sales, isLoading, error } = useSelector((state) => state.sales);

//   useEffect(() => {
//     dispatch(getAllSales());
//   }, [dispatch]);

//   return (
//     <>
//       <Header />
//       <main className="container mx-auto p-4">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <div>
//             <h1 className="text-2xl font-bold mb-4">All Events</h1>
//             {sales && sales.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//                 {sales.map((sale) => (
//                   <FlashSaleCard key={sale._id} sale={sale} />
//                   // <FlashSaleCard
//                   //   key={sale?._id}
//                   //   image={sale.images[0]?.url}
//                   //   name={sale.name}
//                   //   originalPrice={sale.originalPrice}
//                   //   discountedPrice={sale.discountPrice}
//                   //   rating={sale.rating}
//                   //   reviews={sale.reviews}
//                   // />
//                 ))}
//               </div>
//             ) : (
//               <div>No events available.</div>
//             )}
//             <div className="text-right mt-4">
//               <Link href="/" className="text-blue-500">Back to Home</Link>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default AllEventsPage;

