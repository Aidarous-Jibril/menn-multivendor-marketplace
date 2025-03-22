import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getUserAllOrders } from '@/redux/slices/orderSlice';
import { BsFillBagFill } from 'react-icons/bs';
import { IoIosArrowRoundBack } from 'react-icons/io';
import styles from '@/styles/styles';

const TrackOrderPage = () => {
  const { orders } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getUserAllOrders(userInfo._id));
    }
  }, [dispatch, userInfo?._id]);

  const order = orders.find((order) => order._id === id);

  // Define steps/stages and their corresponding labels
  const orderSteps = [
    { status: 'Processing', label: 'Processing in shop' },
    { status: 'Transferred to delivery partner', label: 'Collected by delivery partner' },
    { status: 'Shipped', label: 'On the way' },
    { status: 'Received', label: 'With local delivery company' },
    { status: 'On the way', label: 'About to be delivered' },
    { status: 'Delivered', label: 'Delivered' },
    { status: 'Processing refund', label: 'Refund processing' },
    { status: 'Refund Success', label: 'Refund successful' },
  ];

  // Determine the current step index based on order status
  const currentStepIndex = orderSteps.findIndex((step) => step.status === order?.status);

  return (
    <div className={`mt-8 px-6 ${styles.section}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-2xl lg:text-3xl font-semibold text-gray-800">Order Details</h1>
        </div>
        <Link href="/profile">
          <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
            <IoIosArrowRoundBack size={30} color="crimson" />
          </div>
        </Link>
      </div>

      <div className="mt-6">
        <h5 className="text-gray-500">
          Order ID: <span className="text-gray-800 text-xl lg:text-3xl">#{order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-gray-500">
          Placed on: <span className="text-gray-800">{order?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h2>
        <div className="flex flex-col space-y-4">
          {orderSteps.map((step, index) => (
            <div
              key={step.status}
              className={`flex items-center space-x-4 py-2 px-4 rounded-lg ${
                index <= currentStepIndex
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full border-2 ${
                  index <= currentStepIndex
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <p className="text-lg font-medium">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
