// import React from "react";
// import { AiOutlineGift } from "react-icons/ai";
// import { MdOutlineDashboard } from "react-icons/md";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import Link from 'next/link';
// import { CiBank, CiMoneyBill, CiSettings } from "react-icons/ci";
// import { HiOutlineReceiptRefund } from "react-icons/hi";
// import { LuLogOut } from "react-icons/lu";
// import { BsAlexa } from "react-icons/bs";
// import { IoIosAddCircle, IoMdAdd } from "react-icons/io";
// import { logoutVendor } from "@/redux/slices/vendorSlice";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";

// const DashboardHeader = () => {
//   const { vendorInfo } = useSelector((state) => state.vendors); 
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleVendorLogout = async () => {
//     try {
//       const result = await dispatch(logoutVendor()); 
  
//       if (result.type === "vendor/logoutVendor/fulfilled") {
//         toast.success("You have logged out successfully!");
//         router.push("/vendor/login");  
//       } else {
//         toast.error("Failed to log out. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//       toast.error("An unexpected error occurred during logout.");
//     }
//   };
  
//   return (
//     <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
//       <div>
//         <Link href="/">
//           <img
//             src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//             alt="Store Logo"
//           />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center mr-4">
//           <Link href="/vendor/dashboard">
//             <MdOutlineDashboard color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/orders">
//             <FiShoppingBag color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/products">
//             <FiPackage color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/create-product">
//             <IoMdAdd color="#555" size={28} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/flash-sales">
//             <BsAlexa color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/create-flash-sale">
//             <IoIosAddCircle color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/withdraw">
//             <CiMoneyBill color="#555" size={28} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/bank-info">
//             <CiBank color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/inbox">
//             <BiMessageSquareDetail color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/coupons">
//             <AiOutlineGift color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/refunds">
//             <HiOutlineReceiptRefund color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/settings">
//             <CiSettings color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href="/vendor/login"      onClick={handleVendorLogout}>
//             <LuLogOut color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
//           </Link>
//           <Link href={`/vendor/${vendorInfo?._id}`}>
//             <img
//               src={vendorInfo?.avatar?.url  }
//             //   src={vendorInfo?.avatar?.url || "https://images.assetsdelivery.com/compings_v2/marsono/marsono1804/marsono180400465.jpg"}
//               alt="Store Avatar"
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;
import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import Link from 'next/link';
import { CiBank, CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { BsAlexa } from "react-icons/bs";
import { IoIosAddCircle, IoMdAdd, IoMdPeople } from "react-icons/io";
import { logoutVendor } from "@/redux/slices/vendorSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FaStoreAlt } from "react-icons/fa";

const DashboardHeader = () => {
  const { vendorInfo } = useSelector((state) => state.vendors); 
  const dispatch = useDispatch();
  const router = useRouter();

  const handleVendorLogout = async () => {
    try {
      const result = await dispatch(logoutVendor()); 
  
      if (result.type === "vendor/logoutVendor/fulfilled") {
        toast.success("You have logged out successfully!");
        router.push("/vendor/login");  
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An unexpected error occurred during logout.");
    }
  };
  
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link href="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="Store Logo"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link href="/vendor/dashboard">
            <MdOutlineDashboard color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/customers">
            <IoMdPeople color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/vendors">
            <FaStoreAlt color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/orders">
            <FiShoppingBag color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/products">
            <FiPackage color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/coupons">
            <AiOutlineGift color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/sales">
            <CiMoneyBill color="#555" size={28} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/refunds">
            <HiOutlineReceiptRefund color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/inbox">
            <BiMessageSquareDetail color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/bank">
            <CiBank color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/settings">
            <CiSettings color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/login" onClick={handleVendorLogout}>
            <LuLogOut color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href={`/vendor/${vendorInfo?._id}`}>
            <img
            //   src={vendorInfo?.avatar?.url  }
              src={vendorInfo?.avatar?.url || "https://images.assetsdelivery.com/compings_v2/marsono/marsono1804/marsono180400465.jpg"}
              alt="Store Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
