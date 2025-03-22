import { fetchAllBrands } from "@/redux/slices/brandSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../vendor/layout/Loader";
import { ChevronRightIcon } from "@heroicons/react/solid";

const Brands = () => {
    const dispatch = useDispatch();

    const { brands, isLoading, error } = useSelector(
      (state) => state.brands
    ); 
    
    useEffect(() => {
      dispatch(fetchAllBrands());
    }, [dispatch]);
  
    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error}</div>;
  return (
    // <div className="container mx-auto px-4 py-0">
           <div className="container mx-auto px-2 md:px-4 py-4 relative max-w-[95%] lg:max-w-[90%]"> 

              <hr className="mt-5 mb-2" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Brands</h2>
        <a href="#" className="flex items-center text-blue-600">
                    View All
                    <ChevronRightIcon className="ml-2 h-5 w-5" /> {/* Forward arrow icon */}
                </a>
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {brands.map((brand) => (
          <div className="flex-shrink-0 w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center p-2">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-10 w-10 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
