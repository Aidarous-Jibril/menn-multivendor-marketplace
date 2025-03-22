import DashboardHeader from "@/components/admin/layout/DashboardHeader";
import DashboardSideBar from "@/components/admin/layout/DashboardSidebar";
import AllCouponsTable from "@/components/admin/AllCouponsTable";
import withAdminAuth from "@/lib/withAdminAuth";




const Coupons = () => {  
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>

        <div className="w-full flex justify-center overflow-hidden">
        <AllCouponsTable  />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(Coupons);

