import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorStatistics } from "@/redux/slices/vendorSlice";
import Loader from "@/components/vendor/layout/Loader";
import Image from "next/image";
import Link from "next/link";

const TopSellers = ({ vendors, isLoading }) => {
  const dispatch = useDispatch();
  const { vendorStatistics } = useSelector((state) => state.vendors);

  useEffect(() => {
    if (vendors && vendors.length > 0) {
      vendors.forEach((vendor) => {
        dispatch(getVendorStatistics(vendor._id));
      });
    }
  }, [vendors, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  const bannerSrc = "/images/store.png";
  const backupLogo = "/images/store-backup.png";

  return (
    <div className="bg-gray-100 ">
      <div className="max-w-7xl p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Top Sellers</h2>
            <Link href="#" className="text-blue-500">
              View All <i className="fas fa-chevron-right" />
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {vendors?.map((seller, index) => (
              <Link href={`/vendor/dashboard/${seller?._id}`} key={index}>
                <div className="bg-white rounded-lg shadow p-4 relative min-w-[180px] max-w-[240px] sm:min-w-[220px] sm:max-w-[280px] md:min-w-[240px] md:max-w-[300px] lg:min-w-[260px] lg:max-w-[350px] xl:min-w-[280px] xl:max-w-[400px]">
                  <div className="relative">
                    <div className="group transition-transform duration-300 ease-in-out transform hover:scale-105">
                      <Image
                        src={bannerSrc}
                        alt={`${seller.name} banner`}
                        width={400}
                        height={100}
                        className="rounded-t-lg w-full h-32 sm:h-16 md:h-20 lg:h-24"
                      />
                    </div>
                    <div className="absolute left-4 -bottom-14 bg-white p-2 rounded-full border border-gray-200 shadow-lg group-hover:scale-105 transition-transform duration-300 ease-in-out">
                      <Image
                        src={seller?.avatar.url || backupLogo}
                        alt={`${seller.name} logo`}
                        width={80}
                        height={80}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24  rounded-full object-cover"
                      />
                    </div>
                    {seller.discount && (
                      <div className="absolute top-0 left-0 p-2 bg-black text-white rounded-full">
                        <span className="text-sm">{seller.discount}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-12 text-center">
                    <h3 className="text-lg font-bold hover:text-blue-800">{seller.name}</h3>
                    <div className="flex items-center justify-center text-gray-500">
                      <span className="text-sm">{seller.rating}</span>
                      <i className="fas fa-star text-yellow-500 ml-1" />
                      <span className="text-sm ml-1">Rating</span>
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="text-center">
                        <span className="text-lg font-bold">
                          {seller.reviews}
                        </span>
                        <p className="text-sm text-gray-500">Reviews</p>
                      </div>
                      <div className="text-center">
                        <span className="text-lg font-bold">
                          {seller.products}
                        </span>
                        <p className="text-sm text-gray-500">Products</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellers;
