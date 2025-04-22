import DashboardHeader from "@/components/vendor/layout/DashboardHeader";
import DashboardSideBar from "@/components/vendor/layout/DashboardSideBar";
import AllCoupons from '@/components/vendor/AllCoupons';
import withAdminAuth from "@/lib/withAdminAuth";

const VendorProducts = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="w-[100px] 800px:w-[330px] bg-white  ">
          <DashboardSideBar active={10} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(VendorProducts);

