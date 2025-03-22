import DashboardHeader from "@/components/admin/layout/DashboardHeader";
import DashboardSideBar from "@/components/admin/layout/DashboardSidebar";
import AllCustomersTable from "@/components/admin/AllCustomersTable";
import withAdminAuth from "@/lib/withAdminAuth";


const Customers = () => {  
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>

        <div className="w-full flex justify-center overflow-hidden">
        <AllCustomersTable  />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(Customers);
