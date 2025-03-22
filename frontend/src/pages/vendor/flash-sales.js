import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';
import AllFlashSaleProducts from '@/components/vendor/AllFlashSaleProducts';



const VendorAllFlashSales= () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between items-center">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>

        <div className="w-full flex justify-center items-center">
          <AllFlashSaleProducts />
        </div>
      </div>
    </div>
  );
};

export default VendorAllFlashSales