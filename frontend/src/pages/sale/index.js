import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import ProductCard from "@/components/product/ProductCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/vendor/layout/Loader";
import { getAllSales } from "@/redux/slices/saleSlice";

const SaleProductsPage = () => {
  const dispatch = useDispatch();
  const { sales, isLoading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  const filterValidSales = (sales) => {
    const currentDate = new Date();
    return sales?.filter((product) => {
      const saleEndDate = new Date(product.saleEnd);
      return saleEndDate >= currentDate;
    });
  };  

  const validSales = filterValidSales(sales);
  
  return (
    <>
      <Head>
        <title>Sale - Huge Discounts!</title>
        <meta
          name="description"
          content="Browse our flash sale products and grab your favorites at discounted prices!"
        />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-[1600px] px-2 sm:px-4 lg:px-10 my-8">
          <h2 className="text-3xl font-bold text-center mb-8">Sale Products</h2>
          <hr className="mb-8" />
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
              {validSales?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isSale={true}
                  saleEndDate={product.saleEnd}
                />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SaleProductsPage;
