import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import ProfileSideBar from '@/components/user/layout/ProfileSideBar';
import styles from '@/styles/styles';
import Inbox from '@/components/user/Inbox';

const InboxPage = () => {
  const [active, setActive] = useState(5);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className='w-[50px] md:w-[335px]'>
          <ProfileSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full">
          <Inbox active={active} />
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
