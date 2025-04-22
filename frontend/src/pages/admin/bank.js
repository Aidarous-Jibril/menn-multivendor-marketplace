import withAdminAuth from '@/lib/withAdminAuth';
import DashboardHeader from '@/components/admin/layout/DashboardHeader';
import DashboardSideBar from '@/components/admin/layout/DashboardSidebar';
import BankOverview from '@/components/admin/BankOverview';

const BankPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top header (remains at the top) */}
      <DashboardHeader />

      {/* Main section: a flex container filling the remaining space */}
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        {/* Sticky sidebar container */}
        <div className="w-[100px] 800px:w-[330px] bg-white  ">
          <DashboardSideBar active={14} />
        </div>

        {/* Main content (scrolls) */}
        <div className="flex-1 overflow-y-auto">
          <BankOverview />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(BankPage);