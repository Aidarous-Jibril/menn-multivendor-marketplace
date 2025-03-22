import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import ProductCard from '@/components/product/ProductCard';
import { getAllProducts } from '@/redux/slices/productSlice';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Loader from '@/components/vendor/layout/Loader';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Browse our product catalog" />
      </Head>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 my-8">
        <hr className="mt-5 mb-2" />
        <div className="space-y-4">
          <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-6">All Products</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
