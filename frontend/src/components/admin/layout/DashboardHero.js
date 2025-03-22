import React from 'react';
import { FaTruck, FaBoxOpen, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

const DashboardHero = () => {
  return (
    <div className="p-1 sm:p-2 md:p-4 bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h1 className="text-lg sm:text-xl font-semibold">Welcome Admin</h1>
          <p className="text-xs sm:text-sm text-gray-600">Monitor overall site statistics.</p>
        </div>
        <Link href="/admin/products">
          <button className="bg-blue-600 text-white px-3 py-1 text-xs sm:text-sm rounded">
            Manage Products
          </button>
        </Link>
      </div>

      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              <FaCheckCircle className="text-lg sm:text-xl text-green-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Orders Confirmed</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">150</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              <FaTruck className="text-lg sm:text-xl text-yellow-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Orders In Transit</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">80</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              <FaBoxOpen className="text-lg sm:text-xl text-green-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Orders Delivered</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">120</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between flex-shrink-0">
            <div className="flex items-center">
              <FaTimesCircle className="text-lg sm:text-xl text-red-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Orders Canceled</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
