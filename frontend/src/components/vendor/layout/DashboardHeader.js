import React, { useEffect, useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { FiPackage, FiShoppingBag, FiTrash } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import Link from 'next/link';
import { CiBank, CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { BsAlexa } from "react-icons/bs";
import { IoIosAddCircle, IoMdAdd } from "react-icons/io";
import { deleteVendorNotification, fetchVendorNotificationCount, fetchVendorNotifications, logoutVendor, markVendorNotificationAsRead } from "@/redux/slices/vendorSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FaBell } from "react-icons/fa";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { vendorInfo, notificationCount, notifications } = useSelector((state) => state.vendors);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchVendorNotificationCount());
  }, [dispatch]);

  const toggleNotifications = async () => {
    const newState = !showDropdown;
    setShowDropdown(newState);

    if (newState) {
      const result = await dispatch(fetchVendorNotifications());
      if (result?.payload?.length > 0) {
        result.payload.forEach((notification) => {
          if (!notification.isRead) {
            dispatch(markVendorNotificationAsRead(notification._id));
          }
        });
      }
    }
  };

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
          <Link href="/vendor/orders">
            <FiShoppingBag color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/products">
            <FiPackage color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/create-product">
            <IoMdAdd color="#555" size={28} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/flash-sales">
            <BsAlexa color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/create-flash-sale">
            <IoIosAddCircle color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/withdraw">
            <CiMoneyBill color="#555" size={28} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/bank-info">
            <CiBank color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/inbox">
            <BiMessageSquareDetail color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/coupons">
            <AiOutlineGift color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/refunds">
            <HiOutlineReceiptRefund color="#555" size={25} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>
          <Link href="/vendor/settings">
            <CiSettings color="#555" size={26} className="mx-5 cursor-pointer hidden sm:block" />
          </Link>

          {/* 🔔 Notification Bell */}
          <div
            className="relative mx-5 cursor-pointer hidden sm:block"
            onClick={toggleNotifications}
          >
            <FaBell size={22} className="text-green-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}

            {/* Dropdown modal */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-[260px] bg-white shadow-lg rounded-md border border-gray-200 z-50">
                <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                {notifications?.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <span>{n.message}</span>
                      <button
                        onClick={() => dispatch(deleteVendorNotification(n._id))}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Notification"
                      >
                        <FiTrash size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                )}
              </div>
            )}
          </div>

          {/* 🔓 Logout */}
          <button
            onClick={handleVendorLogout}
            className="mx-5 cursor-pointer hidden sm:block bg-transparent border-none"
          >
            <LuLogOut size={25} color="#555" />
          </button>
          
          <Link href={`/vendor/${vendorInfo?._id}`}>
            <img
              src={vendorInfo?.avatar?.url  }
            //   src={vendorInfo?.avatar?.url || "https://images.assetsdelivery.com/compings_v2/marsono/marsono1804/marsono180400465.jpg"}
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
