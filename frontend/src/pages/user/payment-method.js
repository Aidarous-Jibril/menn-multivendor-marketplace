import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import ProfileSideBar from '@/components/profile/ProfileSideBar';
import styles from '@/styles/styles';
import PaymentMethod from '@/components/user/PaymentMethod';

const PaymentMethodPage = () => {
    const [active, setActive] = useState(8);

    return (
      <div>
        <Header />
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
          <div className='w-[50px] md:w-[335px]'>
            <ProfileSideBar active={active} setActive={setActive} />
          </div>
          <div className="w-full">
            <PaymentMethod active={active} />
          </div>
        </div>
      </div>
    );
  };

export default PaymentMethodPage;
