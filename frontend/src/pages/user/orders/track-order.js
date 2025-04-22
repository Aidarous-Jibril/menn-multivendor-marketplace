import React from 'react';
import Header from '@/components/layout/Header';
import OrderTracker from '@/components/user/OrderTracker';
import ProfileSideBar from '@/components/user/layout/ProfileSideBar';
import withAdminAuth from '@/lib/withAdminAuth';

const TrackOrder = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="w-[100px] 800px:w-[330px] bg-white  ">
          <ProfileSideBar active={3} />
        </div>

        <div className="flex-1 overflow-y-auto">
        <OrderTracker />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(TrackOrder);