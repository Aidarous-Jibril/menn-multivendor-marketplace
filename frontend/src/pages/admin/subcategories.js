import DashboardHeader from "@/components/admin/layout/DashboardHeader";
import DashboardSideBar from "@/components/admin/layout/DashboardSidebar";
import SubcategoryTable from "@/components/admin/SubcategoryTable";
import withAdminAuth from "@/lib/withAdminAuth";


const SubCategories = () => {  
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>

        <div className="w-full flex justify-center overflow-hidden">
        <SubcategoryTable  />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(SubCategories);
