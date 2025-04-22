import DashboardHeader from "@/components/vendor/layout/DashboardHeader";
import DashboardSideBar from "@/components/vendor/layout/DashboardSideBar";
import VendorSettings from '@/components/vendor/VendorSettings';
import withAdminAuth from "@/lib/withAdminAuth";

const VendorSettingsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />

      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="w-[100px] 800px:w-[330px] bg-white  ">
          <DashboardSideBar active={12} />
        </div>

        <div className="flex-1 overflow-y-auto">
          <VendorSettings />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(VendorSettingsPage);

