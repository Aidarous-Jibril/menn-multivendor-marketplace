import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { CiBank, CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {  IoMdPeople } from "react-icons/io";
import { FaStoreAlt } from "react-icons/fa";
import { logoutAdmin } from "@/redux/slices/adminSlice";

const DashboardSideBar = ({ active }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //logout vendor
  const handleAdminLogout = async () => {
    try {
      await dispatch(logoutAdmin()).unwrap();
      toast.success("You have logged out successfully!");
      router.push("/admin/login");
    } catch (error) {
      toast.error(error || "Failed to log out.");
      console.error("Logout Error:", error);
    }
  };
  
  return (
    <div className="w-full h-full bg-white shadow-sm flex flex-col justify-between">
     <div className="flex-grow">
        {/* Sidebar Items */}
        <div className="w-full flex items-center p-4">
          <Link href="/admin/dashboard" className="w-full flex items-center">
            <MdOutlineDashboard
              size={30}
              color={`${active === 1 ? "crimson" : "#555"}`}
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 1 ? "text-[crimson]" : "text-[#555]"
              } hidden 800px:block`}
            >
              Dashboard
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/customers" className="w-full flex items-center">
            <IoMdPeople size={30} color={active === 2 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Customers
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/vendors" className="w-full flex items-center">
            <FaStoreAlt size={30} color={active === 3 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Vendors
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/orders" className="w-full flex items-center">
            <FiShoppingBag size={30} color={active === 4 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Orders
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/products" className="w-full flex items-center">
            <FiPackage size={30} color={active === 5 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Products
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/categories" className="w-full flex items-center">
            <AiOutlineGift size={30} color={active === 6 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Categories
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/subcategories" className="w-full flex items-center">
            <AiOutlineGift size={30} color={active === 7 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 7 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              SubCategories
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/sub-subcategories" className="w-full flex items-center">
            <AiOutlineGift size={30} color={active === 8 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 8 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Sub-SubCategories
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/coupons" className="w-full flex items-center">
            <AiOutlineGift size={30} color={active === 9 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 9 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Coupons
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/sales" className="w-full flex items-center">
            <CiMoneyBill size={30} color={active === 10 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 10 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Sales
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/refunds" className="w-full flex items-center">
            <HiOutlineReceiptRefund size={30} color={active === 11 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 11 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Refunds
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/inbox" className="w-full flex items-center">
            <BiMessageSquareDetail size={30} color={active === 11 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 12 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Inbox
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/bank" className="w-full flex items-center">
            <CiBank size={30} color={active === 12 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 13 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Bank
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link href="/admin/settings" className="w-full flex items-center">
            <CiSettings size={30} color={active === 13 ? "crimson" : "#555"} />
            <h5 className={`pl-2 text-[18px] font-[400] ${active === 14 ? "text-[crimson]" : "text-[#555]"} hidden 800px:block`}>
              Settings
            </h5>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="w-full flex items-center p-4">
        <button
          onClick={handleAdminLogout}
          className="w-full flex items-center cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          <LuLogOut size={30} className="text-white" />
          <h5 className="pl-2 text-[18px] font-[400] hidden 800px:block">
            Logout
          </h5>
        </button>
      </div>
    </div>
  );
};

export default DashboardSideBar;
