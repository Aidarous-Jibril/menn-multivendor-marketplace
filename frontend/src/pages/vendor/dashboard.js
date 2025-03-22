// pages/vendor/dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import DashboardHeader from "@/components/vendor/layout/DashboardHeader";
import DashboardSideBar from "@/components/vendor/layout/DashboardSideBar";
import DashboardHero from "@/components/vendor/layout/DashboardHero";
import Loader from "@/components/vendor/layout/Loader";

const VendorDashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { vendorInfo } = useSelector((state) => state.vendors);

  useEffect(() => {
    if (!vendorInfo || !vendorInfo._id) {
      router.push("/vendor/login");
    } else {
      setLoading(false); 
    }
  }, [vendorInfo, router]);

  if (loading) {
    return <Loader />; 
  }

  return (
    <>
      <DashboardHeader />

      <div className="bg-gray-100 min-h-screen">
        <div className="flex flex-row">
          {/* Sidebar */}
          <div className='w-[100px] 800px:w-[300px]'>
            <DashboardSideBar active={1}/>
          </div>

          {/* Main Content (DashboardHero component) */}
          <div className="flex-1 p-6">
            <DashboardHero />
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboardPage;
