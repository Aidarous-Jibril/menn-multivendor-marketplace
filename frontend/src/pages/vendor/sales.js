// /pages/vendor/sales.js
import DashboardHeader from "@/components/vendor/layout/DashboardHeader";
import DashboardSideBar from "@/components/vendor/layout/DashboardSideBar";
import AllSaleProducts from '@/components/vendor/AllSaleProducts';
import withAdminAuth from "@/lib/withAdminAuth";

const VendorAllSaleProducts = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="w-[100px] 800px:w-[330px] bg-white  ">
          <DashboardSideBar active={5} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <AllSaleProducts />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(VendorAllSaleProducts);