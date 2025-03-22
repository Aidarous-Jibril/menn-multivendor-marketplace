import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';
import VendorSettings from '@/components/vendor/VendorSettings';



const VendorSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100" >
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={12} />
        </div>

        <div className="w-full flex justify-center">
          <VendorSettings />
        </div>
      </div>
    </div>
  );
};

export default VendorSettingsPage;



