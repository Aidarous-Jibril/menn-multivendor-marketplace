// import React from 'react';
// import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
// import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';
// import CreateProduct from '@/components/vendor/CreateProduct';


// const VendorCreateProductPage = () => {
//   return (
//     <div>
//       <DashboardHeader />

//       <div className="w-full flex justify-between items-center">
//         <div className="w-[100px] 800px:w-[330px]">
//           <DashboardSideBar active={4} />
//         </div>

//         <div className="w-full flex justify-center items-center">
//           <CreateProduct />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorCreateProductPage;



// // pages/vendor/dashboard.js
// import React from 'react';
// import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
// import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';
// import CreateProduct from '@/components/vendor/CreateProduct';
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useSelector } from "react-redux";


// const VendorCreateProductPage = () => {
//   const [active, setActive] = useState(1);
//   const router = useRouter();
//   const { vendorInfo } = useSelector((state) => state.vendors);

//   useEffect(() => {
//     if (!vendorInfo) {
//       router.push("/vendor/login"); // Redirect if not authenticated
//     }
//   }, [vendorInfo, router]);

//   return (
//     <>
//       <DashboardHeader />

//       <div className="bg-gray-100 min-h-screen">
//         <div className="flex flex-row">
//           {/* Sidebar */}
//           <div className='w-[100px] 800px:w-[300px]'>
//             <DashboardSideBar active={1}/>
//           </div>

//           {/* Main Content (DashboardHero component) */}
//           <div className="flex-1 p-6">
//             <CreateProduct />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default VendorCreateProductPage;


import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/vendor/layout/DashboardHeader";
import DashboardSideBar from "@/components/vendor/layout/DashboardSideBar";
import CreateProduct from "@/components/vendor/CreateProduct";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const VendorCreateProductPage = () => {
  const [active, setActive] = useState(1);
  const router = useRouter();
  const { vendorInfo } = useSelector((state) => state.vendors);

  useEffect(() => {
    if (!vendorInfo) {
      router.push("/vendor/login"); // Redirect if not authenticated
    }
  }, [vendorInfo, router]);

  return (
    <>
      <DashboardHeader />
      <div className="flex w-full min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <CreateProduct />
        </div>
      </div>
    </>
  );
};

export default VendorCreateProductPage;
