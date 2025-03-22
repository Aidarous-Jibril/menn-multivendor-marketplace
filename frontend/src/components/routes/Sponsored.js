import React from 'react'
import { FaTruck, FaRegCreditCard, FaAward } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';

const Sponsored = () => {
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
</svg>

const features = [
  {
    id: 1,
    icon: <FaTruck className="text-blue-600 h-8 w-8" />,
    title: 'Fast Delivery all across the country',
  },
  {
    id: 2,
    icon: <FaRegCreditCard className="text-blue-600 h-8 w-8" />,
    title: 'Safe Payment',
  },
  {
    id: 3,
    icon: <GiReturnArrow className="text-blue-600 h-8 w-8" />,
    title: '7 Days Return Policy',
  },
  {
    id: 4,
    icon: <FaAward className="text-blue-600 h-8 w-8" />,
    title: '100% Authentic Products',
  },
];


  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.id} icon={feature.icon} title={feature.title} />
        ))}
      </div>
    </div>
  );
}

export default Sponsored

const FeatureCard = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
        {icon}
      </div>
      <p className="text-gray-800 font-semibold">{title}</p>
    </div>
  );
};

