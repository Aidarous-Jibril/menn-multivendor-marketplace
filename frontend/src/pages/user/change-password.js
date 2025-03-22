import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import ProfileSideBar from '@/components/profile/ProfileSideBar';
import styles from '@/styles/styles';
import ChangePassword from '@/components/user/ChangePassword';

const ChangePasswordPage = () => {
  const [active, setActive] = useState(6);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className='w-[50px] md:w-[335px]'>
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
