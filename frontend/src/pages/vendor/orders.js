import AllOrdersTable from "@/components/vendor/AllOrdersTable";
import DashboardHeader from "@/components/vendor/layout/DashboardHeader";
import DashboardSideBar from "@/components/vendor/layout/DashboardSideBar";

const VendorAllOrders = () => {
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>

        <div className="w-full flex justify-center overflow-hidden">
          <AllOrdersTable />
        </div>
      </div>
    </div>
  );
};

export default VendorAllOrders;
