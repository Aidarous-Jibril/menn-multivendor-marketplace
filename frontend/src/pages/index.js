// pages/index.js
import 'tailwindcss/tailwind.css';
import React from 'react';
import 'tailwindcss/tailwind.css';

import Header from '../components/layout/Header';
import HeroPage from '../components/routes/HeroPage';
import Categories from '../components/routes/Categories';
import FeaturedProducts from '../components/routes/FeaturedProducts';
import Sponsored from '../components/routes/Sponsored';
import Footer from '../components/layout/Footer';
import LatestProducts from '@/components/routes/LatestProducts';
import Brands from '@/components/routes/Brands';
import FlashSales from '@/components/routes/sales/FlashSales';
import HeaderPromo from '@/components/layout/HeaderPromo';
import TopSellers from '@/components/routes/Sellers';
import axios from 'axios';

const HomePage = ({ products, categories, vendors, sales }) => {

  return (
    <div className="overflow-x-hidden">
      <HeaderPromo />
       <Header activeHeading={1} products={products} categories={categories} />
       {/* <HeroPage />  */}
      <Categories categories={categories} />
      <FlashSales sales={sales} />
      <LatestProducts products={products} />
      {/* <FeaturedProducts products={products} isLoading={isLoading} error={error} /> */}
      <TopSellers vendors={vendors} />
      <Brands />
      <Sponsored />
      <Footer />
    </div>
  );
};


export async function getServerSideProps() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const [productsRes, categoriesRes, vendorsRes, salesRes] = await Promise.all([
      axios.get(`${baseURL}/api/products`).catch(err => { console.error("Products Error:", err); return null; }),
      axios.get(`${baseURL}/api/categories`).catch(err => { console.error("Categories Error:", err); return null; }),
      axios.get(`${baseURL}/api/vendors`).catch(err => { console.error("Vendors Error:", err); return null; }),
      axios.get(`${baseURL}/api/events`).catch(err => { console.error("Sales Error:", err); return null; }),
    ]);

    return {
      props: {
        products: productsRes?.data?.products || [],
        categories: categoriesRes?.data?.categories || [],
        vendors: vendorsRes?.data?.vendors || [],
        sales: salesRes?.data?.sales || [],
      },
    };
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data:", error.message);

    // Provide fallback props in case of failure
    return {
      props: {
        products: [],
        categories: [],
        vendors: [],
        sales: [],
      },
    };
  }
}


export default HomePage;
