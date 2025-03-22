import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';




const VendorAllRefundsPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between items-center">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={11} />
        </div>

        <div className="w-full flex justify-center items-center">
          {/* <CreateFlashDeal /> */}
          VendorAllRefundsPage
        </div>
      </div>
    </div>
  );
};

export default VendorAllRefundsPage;