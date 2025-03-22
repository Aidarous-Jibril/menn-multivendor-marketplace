import DashboardHeader from "@/components/admin/layout/DashboardHeader";
import DashboardSideBar from "@/components/admin/layout/DashboardSidebar";
import AllOrdersTable from "@/components/admin/AllOrdersTable";
import withAdminAuth from "@/lib/withAdminAuth";




const Orders = () => {  
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>

        <div className="w-full flex justify-center overflow-hidden">
        <AllOrdersTable  />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(Orders);

