// // components/vendor/VendorProfileData.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import moment from 'moment';
// import ProductCard from '@/components/product/ProductCard';
// import Ratings from '@/components/product/Ratings';
// import styles from '@/styles/styles';
// import { fetchVendorProducts, fetchVendorEvents } from '@/redux/slices/vendorSlice';

// const VendorProfileData = ({ vendor }) => {
//   const [active, setActive] = useState(1);

//   const { products } = useSelector((state) => state.products);
//   const { events } = useSelector((state) => state.events);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (vendor._id) {
//       dispatch(fetchVendorProducts(vendor._id));
//       dispatch(fetchVendorEvents(vendor._id));
//     }
//   }, [dispatch, vendor._id]);

//   const allReviews = products?.map((product) => product.reviews).flat() || [];

//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <div className="w-full flex">
//           <div className="flex items-center" onClick={() => setActive(1)}>
//             <h5
//               className={`font-semibold text-lg ${
//                 active === 1 ? 'text-red-500' : 'text-gray-800'
//               } cursor-pointer pr-5`}
//             >
//               Shop Products
//             </h5>
//           </div>
//           <div className="flex items-center" onClick={() => setActive(2)}>
//             <h5
//               className={`font-semibold text-lg ${
//                 active === 2 ? 'text-red-500' : 'text-gray-800'
//               } cursor-pointer pr-5`}
//             >
//               Running Events
//             </h5>
//           </div>
//           <div className="flex items-center" onClick={() => setActive(3)}>
//             <h5
//               className={`font-semibold text-lg ${
//                 active === 3 ? 'text-red-500' : 'text-gray-800'
//               } cursor-pointer pr-5`}
//             >
//               Shop Reviews
//             </h5>
//           </div>
//         </div>
//         <div>
//           {router.pathname.includes('dashboard') && (
//             <button
//               onClick={() => router.push('/vendor/dashboard')}
//               className={`${styles.button} rounded-lg h-10 px-4 bg-blue-600 text-white`}
//             >
//               Go Dashboard
//             </button>
//           )}
//         </div>
//       </div>
//       <div className="mt-6">
//         {active === 1 && (
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
//             {products?.map((item, index) => (
//               <ProductCard data={item} key={index} isShop />
//             ))}
//           </div>
//         )}

//         {active === 2 && (
//           <div>
//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
//               {events?.map((item, index) => (
//                 <ProductCard data={item} key={index} isShop isEvent />
//               ))}
//             </div>
//             {events?.length === 0 && (
//               <h5 className="w-full text-center py-5 text-lg">No Events for this shop!</h5>
//             )}
//           </div>
//         )}

//         {active === 3 && (
//           <div>
//             {allReviews?.map((item, index) => (
//               <div key={index} className="w-full flex my-4">
//                 <img
//                   src={item.user.avatar?.url}
//                   className="w-12 h-12 rounded-full"
//                   alt="User Avatar"
//                 />
//                 <div className="pl-4">
//                   <div className="flex w-full items-center">
//                     <h1 className="font-semibold pr-2">{item.user.name}</h1>
//                     <Ratings rating={item.rating} />
//                   </div>
//                   <p className="text-gray-700 mt-1">{item?.comment}</p>
//                   <p className="text-gray-600 text-sm">{moment(item.createdAt).format('DD/MM/YYYY')}</p>
//                 </div>
//               </div>
//             ))}
//             {allReviews?.length === 0 && (
//               <h5 className="w-full text-center py-5 text-lg">No Reviews for this shop!</h5>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VendorProfileData;


import React from 'react';

const VendorProfileData = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Vendor Profile</h2>
        <p className="text-gray-600">Detailed information about the vendor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-gray-700">Basic Information</h3>
            <div className="mt-2">
              <p className="text-gray-600"><strong>Name:</strong> {vendor.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {vendor.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {vendor.phone}</p>
              <p className="text-gray-600"><strong>Address:</strong> {vendor.address}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-gray-700">Business Information</h3>
            <div className="mt-2">
              <p className="text-gray-600"><strong>Business Name:</strong> {vendor.businessName}</p>
              <p className="text-gray-600"><strong>Business Type:</strong> {vendor.businessType}</p>
              <p className="text-gray-600"><strong>About:</strong> {vendor.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium text-gray-700">Social Links</h3>
        <div className="mt-2">
          {vendor.socialLinks && vendor.socialLinks.map((link, index) => (
            <p key={index} className="text-gray-600">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link.platform}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorProfileData;
