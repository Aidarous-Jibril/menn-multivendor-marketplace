// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllEvents } from "@/redux/slices/eventSlice";
// import EventCard from "@/components/routes/events/EventCard";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Link from "next/link";

// const AllEventsPage = () => {
//   const dispatch = useDispatch();
//   const { allEvents, isLoading, error } = useSelector((state) => state.events);

//   useEffect(() => {
//     dispatch(getAllEvents());
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
//             {allEvents && allEvents.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//                 {allEvents.map((event) => (
//                   <EventCard
//                     key={event._id}
//                     image={event.images[0]?.url}
//                     name={event.name}
//                     originalPrice={event.originalPrice}
//                     discountedPrice={event.discountPrice}
//                     rating={event.rating}
//                     reviews={event.reviews}
//                   />
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


import React from 'react'

const events = () => {
  return (
    <div>events</div>
  )
}

export default events