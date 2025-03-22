import React, { useState } from "react";
import DashboardHeader from "@/components/admin/layout/DashboardHeader";
import DashboardHero from "@/components/admin/layout/DashboardHero";
import DashboardSideBar from "@/components/admin/layout/DashboardSidebar";

const AdminDashboard = () => {

  return (
    <>
    <DashboardHeader />

    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-row">
        {/* Sidebar */}
        <div className='w-[320px]'> 
          <DashboardSideBar active={1}/>
        </div>

        <div className="flex-1 p-6">
          <DashboardHero />
        </div>
      </div>
    </div>
  </>
  );
};

export default AdminDashboard;
