import AllCoupons from '@/components/vendor/AllCoupons';
import DashboardHeader from '@/components/vendor/layout/DashboardHeader';
import DashboardSideBar from '@/components/vendor/layout/DashboardSideBar';


const VendorProducts = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between bg-gray-100" >
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>

        <div className="w-full flex justify-center">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;



c