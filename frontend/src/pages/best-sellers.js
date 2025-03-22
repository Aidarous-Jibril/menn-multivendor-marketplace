import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BestSellers from '@/components/routes/BestSellers';


const BestSellersPage = () => {
  return (
    <div>
      <Header activeHeading={2} />
      <BestSellers />
      <Footer />
    </div>
  );
};

export default BestSellersPage;
