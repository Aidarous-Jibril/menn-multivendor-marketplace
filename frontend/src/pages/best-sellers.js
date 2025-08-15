import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BestSellers from '@/components/routes/BestSellers';


const BestSellersPage = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <Header activeHeading={2} />
      <main className="flex-grow">
        <BestSellers />
      </main>
      <Footer />
    </div>
  );
};

export default BestSellersPage;
