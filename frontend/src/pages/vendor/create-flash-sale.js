import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';
import CreateFlashSale from '@/components/vendor/CreateFlashSale';




const VendorCreateFlashSale = () => {
  return (
    <>
       <DashboardHeader />
      <div className="flex w-full min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <CreateFlashSale />
        </div>
      </div>
    </>
  );
};

export default VendorCreateFlashSale;