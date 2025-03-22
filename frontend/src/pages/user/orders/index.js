// pages/user/orders/index.js
import React, { useState } from 'react';
import AllOrders from '@/components/user/AllOrders';
import Header from '@/components/layout/Header';
import ProfileSideBar from '@/components/profile/ProfileSideBar';
import styles from '@/styles/styles';
import Footer from '@/components/layout/Footer';

const OrdersPage = () => {
  const [active, setActive] = useState(2);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className='w-[50px] md:w-[335px]'>
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full">
          <AllOrders active={active} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;
