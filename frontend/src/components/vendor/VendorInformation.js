// Third-party library imports
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

// Local imports (Redux slice)
import { logoutVendor } from '@/redux/slices/vendorSlice';

const VendorInformation = ({ vendor }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutVendor()); // Make sure logout action is defined in your userSlice
    router.push('/vendor/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center">
        <Image
          src={vendor.avatar?.url || 'https://images.assetsdelivery.com/compings_v2/marsono/marsono1804/marsono180400465.jpg'}
          alt={vendor.name}
          width={120}
          height={120}
          className="w-[120px] h-[120px] rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold mt-4">{vendor.name}</h2>
        <hr className="my-4 border-gray-300 w-full" />
      </div>
      <div className="mt-6">
        <div className="mb-6">
          <p className="text-lg text-gray-700"><strong>Email:</strong> {vendor.email}</p>
          <p className="text-lg text-gray-700"><strong>Phone:</strong> {vendor.phoneNumber}</p>
          <p className="text-lg text-gray-700"><strong>Address:</strong> {vendor.address}</p>
          <p className="text-lg text-gray-700"><strong>Joined:</strong> {vendor?.createdAt?.slice(0, 10)}</p>
          <p className="text-lg text-gray-700"><strong>Business Name:</strong> {vendor.businessName}</p>
          <p className="text-lg text-gray-700"><strong>Business Type:</strong> {vendor.businessType}</p>
        </div>
        <h3 className="text-xl font-medium mb-4">About Your Business</h3>
        <p className="text-gray-600 mb-4">We are a family-owned bakery specializing in fresh, homemade pastries and breads. Our mission is to bring the taste of traditional baking to the local community, using only the finest ingredients.</p>
        {/* <p className="text-gray-600">{vendor.description}</p> */}
      </div>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default VendorInformation;
