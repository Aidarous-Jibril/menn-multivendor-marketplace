import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';
import VendorInboxMessages from '@/components/vendor/VendorInboxMessages';




const VendorInbox= () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between items-center">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>

        <div className="w-full flex justify-center items-center">
          <VendorInboxMessages />
        </div>
      </div>
    </div>
  );
};

export default VendorInbox