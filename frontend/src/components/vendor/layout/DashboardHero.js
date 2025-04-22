import React from 'react';
import { FaClock, FaCheckCircle, FaBox, FaTruck, FaBoxOpen, FaTimesCircle, FaUndo, FaBan } from 'react-icons/fa';
import Link from 'next/link';

const DashboardHero = () => { 
  return (
  //   <div className="p-1 sm:p-2 md:p-4 bg-gray-100">
  <div className="w-full p-4 md:p-8 rounded-md bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h1 className="text-lg sm:text-xl font-semibold">Welcome Kamrujjaman Joy</h1>
          <p className="text-xs sm:text-sm text-gray-600">Monitor your business analytics and statistics.</p>
        </div>
        <Link href="/vendor/products">
          <button className="bg-blue-600 text-white px-3 py-1 text-xs sm:text-sm rounded">Products</button>
        </Link>
      </div>
      
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-sm sm:text-lg font-semibold mb-3 sm:mb-0">Order Analytics</h2>
          <div className="relative">
            <button className="bg-gray-200 text-gray-600 px-3 py-1 text-xs sm:text-sm rounded">Overall Statistics</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaClock className="text-lg sm:text-xl text-yellow-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Pending</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">3</span>
          </div>
          
          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaCheckCircle className="text-lg sm:text-xl text-green-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Confirmed</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">4</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaBox className="text-lg sm:text-xl text-yellow-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Packaging</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">1</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaTruck className="text-lg sm:text-xl text-green-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Out For Delivery</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">2</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaBoxOpen className="text-lg sm:text-xl text-green-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Delivered</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">10</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaTimesCircle className="text-lg sm:text-xl text-yellow-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Cancelled</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">1</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaUndo className="text-lg sm:text-xl text-yellow-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Returned</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">1</span>
          </div>

          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <FaBan className="text-lg sm:text-xl text-red-500 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Failed To Deliver</span>
            </div>
            <span className="text-lg sm:text-xl font-semibold">2</span>
          </div>
        </div>
      </div>


      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-sm sm:text-lg font-semibold mb-4">Vendor Wallet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Wallet Item 1 */}
          <div className="bg-gray-100 p-3 md:p-4 lg:p-6 rounded-lg text-center">
            <img
              alt="Withdrawable Balance Icon"
              className="mx-auto mb-3 md:mb-4"
              src="https://storage.googleapis.com/a1aa/image/xoWfjfkiIUnntEAcGfXVqfhKeSHaTJNMa4o3WCEvBfDll7w5E.jpg"
              width="80"
              height="80"
            />
            <p className="text-md md:text-lg lg:text-xl font-semibold">$10,023.50</p>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Withdrawable Balance</p>
            <button className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 rounded">Withdraw</button>
          </div>
          {/* Wallet Item 2 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Pending Withdraw Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/Or1HbKgTqjaYI1XSJQgZp7KQwmBgVyNlcLY109QUdgvm7w5E.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$50.00</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Pending Withdraw</p>
          </div>

          {/* Wallet Item 3 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Total Commission Given Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/JeB1Knbw3fqhcUiofNNLGHpKtKQMl7ic7xbZLekR0gBW5OcOB.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$6,394.47</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Total Commission Given</p>
          </div>

          {/* Wallet Item 4 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Already Withdrawn Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/AgxYeai0RqXpXiEbnOnFl5CwAiGyAJWz8qwnHJgzjhcM3hzJA.jpg"
              width="100"
              height="100"
            />
            <p className="text-md md:text-lg lg:text-xl font-semibold">$600.00</p>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Already Withdrawn</p>
          </div>

          {/* Wallet Item 5 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Total Delivery Charge Earned Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/iv8x2u2L4l5sERFbaqClxpHZz0si5e5tMKvJw7ViKWSO3hzJA.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$822.00</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Total Delivery Charge Earned</p>
          </div>
            {/* Wallet Item 6 */}
            <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Total Tax Given Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/kUFEYN6dkJYDC1v0KhTgNajfpVE3Tj9YJB0QXj6nL3gzmMlgs0.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$1000.00</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Total Tax Given</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <h2 className="text-sm sm:text-lg font-semibold mb-4">Vendor Wallet</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Wallet Item 1 */}
          <div className="bg-gray-100 p-3 md:p-4 lg:p-6 rounded-lg text-center">
            <img
              alt="Withdrawable Balance Icon"
              className="mx-auto mb-3 md:mb-4"
              src="https://storage.googleapis.com/a1aa/image/xoWfjfkiIUnntEAcGfXVqfhKeSHaTJNMa4o3WCEvBfDll7w5E.jpg"
              width="80"
              height="80"
            />
            <p className="text-md md:text-lg lg:text-xl font-semibold">$10,023.50</p>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Withdrawable Balance</p>
            <button className="bg-blue-600 text-white px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 rounded">Withdraw</button>
          </div>
          {/* Wallet Item 2 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Pending Withdraw Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/Or1HbKgTqjaYI1XSJQgZp7KQwmBgVyNlcLY109QUdgvm7w5E.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$50.00</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Pending Withdraw</p>
          </div>

          {/* Wallet Item 3 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Total Commission Given Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/JeB1Knbw3fqhcUiofNNLGHpKtKQMl7ic7xbZLekR0gBW5OcOB.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$6,394.47</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Total Commission Given</p>
          </div>

          {/* Wallet Item 4 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Already Withdrawn Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/AgxYeai0RqXpXiEbnOnFl5CwAiGyAJWz8qwnHJgzjhcM3hzJA.jpg"
              width="100"
              height="100"
            />
            <p className="text-md md:text-lg lg:text-xl font-semibold">$600.00</p>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Already Withdrawn</p>
          </div>

          {/* Wallet Item 5 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Total Delivery Charge Earned Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/iv8x2u2L4l5sERFbaqClxpHZz0si5e5tMKvJw7ViKWSO3hzJA.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$822.00</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Total Delivery Charge Earned</p>
          </div>
            {/* Wallet Item 6 */}
            <div className="bg-gray-100 p-6 rounded-lg text-center">
            <img
              alt="Total Tax Given Icon"
              className="mx-auto mb-4"
              src="https://storage.googleapis.com/a1aa/image/kUFEYN6dkJYDC1v0KhTgNajfpVE3Tj9YJB0QXj6nL3gzmMlgs0.jpg"
              width="100"
              height="100"
            />
              <p className="text-md md:text-lg lg:text-xl font-semibold">$1000.00</p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-3">Total Tax Given</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
