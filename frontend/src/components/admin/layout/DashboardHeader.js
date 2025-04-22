import React, { useEffect, useState } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { FiPackage, FiShoppingBag, FiTrash } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import Link from "next/link";
import { CiBank, CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { IoMdPeople } from "react-icons/io";
import { FaStoreAlt, FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchAdminNotificationCount,
  fetchAdminNotifications,
  markNotificationAsRead,
  logoutAdmin,
  deleteAdminNotification,
} from "@/redux/slices/adminSlice";
import { toast } from "react-toastify";



const DashboardHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { adminInfo, notificationCount, notifications } = useSelector(
    (state) => state.admin
  );
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminNotificationCount());
  }, [dispatch]);

  const handleAdminLogout = async () => {
    try {
      await dispatch(logoutAdmin()).unwrap();
      toast.success("You have logged out successfully!");
      router.push("/admin/login");
    } catch (error) {
      toast.error(error || "Failed to log out.");
    }
  };

  const toggleNotifications = async () => {
    const newState = !showDropdown;
    setShowDropdown(newState);

    if (newState) {
      const result = await dispatch(fetchAdminNotifications());

      const unread = result?.payload?.filter(n => !n.isRead) || [];
      await Promise.all(
        unread.map((n) => dispatch(markNotificationAsRead(n._id)))
      );

      dispatch(fetchAdminNotificationCount());
    }
  };

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      {/* Logo */}
      <div>
        <Link href="/">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="Store Logo"
          />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center">
        <div className="flex items-center mr-4 relative">
          <Link href="/admin/dashboard">
            <MdOutlineDashboard className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/customers">
            <IoMdPeople className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/admins">
            <FaStoreAlt className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/orders">
            <FiShoppingBag className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/products">
            <FiPackage className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/coupons">
            <AiOutlineGift className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/sales">
            <CiMoneyBill className="mx-5 cursor-pointer hidden sm:block" size={28} color="#555" />
          </Link>
          <Link href="/admin/refunds">
            <HiOutlineReceiptRefund className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/inbox">
            <BiMessageSquareDetail className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/bank">
            <CiBank className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>
          <Link href="/admin/settings">
            <CiSettings className="mx-5 cursor-pointer hidden sm:block" size={25} color="#555" />
          </Link>

          {/* 🔔 Notifications */}
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

            {/* Notifications Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-[260px] bg-white shadow-lg rounded-md border border-gray-200 z-50">
                <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <span>{n.message}</span>
                      <button
                        onClick={() => dispatch(deleteAdminNotification(n._id))}
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
            onClick={handleAdminLogout}
            className="mx-5 cursor-pointer hidden sm:block bg-transparent border-none"
          >
            <LuLogOut size={25} color="#555" />
          </button>

          {/* 👤 Avatar */}
          <Link href={`/admin/${adminInfo?._id}`}>
            <img
              src={
                adminInfo?.avatar?.url ||
                "https://images.assetsdelivery.com/compings_v2/marsono/marsono1804/marsono180400465.jpg"
              }
              alt="Admin Avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
