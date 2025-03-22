// Third-party library imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Local imports
import { addPaymentMethod, deletePaymentMethod } from "@/redux/slices/userSlice";
import styles from "@/styles/styles";


const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleAddPaymentMethod = async () => {
    try {
      const result = await dispatch(addPaymentMethod(cardDetails));

      if (result.type === 'user/addPaymentMethod/fulfilled') {
        toast.success(result.payload.message);
        setCardDetails({
          cardHolderName: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
        setShowForm(false);
      } else if (result.type === 'user/addPaymentMethod/rejected') {
        toast.error(result.payload);
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
      toast.error('Failed to add payment method. Please try again.');
    }
  };

  const handleDeletePaymentMethod = async () => {
    try {
      const result = await dispatch(deletePaymentMethod());

      if (result.type === 'user/deletePaymentMethod/fulfilled') {
        toast.success(result.payload.message);
      } else if (result.type === 'user/deletePaymentMethod/rejected') {
        toast.error(result.payload);
      }
    } catch (error) {
      console.error('Error deleting payment method:', error);
      toast.error('Failed to delete payment method. Please try again.');
    }
  };

  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 px-4">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md px-2`}>
          <span className="text-white" onClick={() => setShowForm(!showForm)}>
            Add New
          </span>
        </div>
      </div>
      <br />

      {showForm && (
        <div className="bg-white p-5 rounded shadow">
          <input
            type="text"
            name="cardHolderName"
            placeholder="Card Holder Name"
            value={cardDetails.cardHolderName}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            value={cardDetails.expiryDate}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddPaymentMethod}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {isClient && userInfo?.paymentMethod && (
        <div className="w-full flex justify-between items-center bg-white h-[90px] rounded-[4px] px-3 pr-10 shadow mt-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
            >
              <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 29.6875 19.40625 C 26.585938 19.40625 25 20.933594 25 22.875 C 25 26.386719 29.0625 25.914063 29.0625 27.71875 C 29.0625 28.023438 28.828125 28.75 27.125 28.75 C 25.417969 28.75 24.3125 28.09375 24.3125 28.09375 L 23.78125 30.46875 C 23.78125 30.46875 24.886719 31.09375 27 31.09375 C 29.113281 31.09375 32.03125 29.476563 32.03125 27.125 C 32.03125 24.296875 27.96875 24.074219 27.96875 22.8125 C 27.96875 22.167969 28.46875 21.6875 29.9375 21.6875 C 30.890625 21.6875 31.96875 22.40625 31.96875 22.40625 L 32.46875 19.96875 C 32.46875 19.96875 31.050781 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 13.78125 27.5625 C 13.78125 27.5625 13.597656 26.886719 13.53125 26.46875 C 11.996094 23.023438 9.5 21.75 9.5 21.75 L 11.875 30.75 L 15.125 30.75 L 19.625 19.625 Z M 20.78125 19.625 L 19.03125 30.75 L 22 30.75 L 23.78125 19.625 Z M 36.8125 19.625 L 31.96875 30.75 L 34.90625 30.75 L 35.5 29.15625 L 39.1875 29.15625 L 39.5 30.75 L 42.1875 30.75 L 39.90625 19.625 Z M 6.25 19.65625 C 6.25 19.65625 12.054688 21.453125 13.40625 25.8125 L 12.40625 20.75 C 12.40625 20.75 11.976563 19.65625 10.8125 19.65625 Z M 37.9375 22.84375 L 38.75 27.03125 L 36.3125 27.03125 Z"></path>
            </svg>
            <h5 className="text-sm sm:text-md font-md pl-5">
              {userInfo.paymentMethod.cardHolderName}
            </h5>
          </div>
          <div className="text-sm sm:text-md flex items-center pl-8">
            <h6>**** **** **** {userInfo.paymentMethod.cardNumber.slice(-4)}</h6>
            <h5 className="text-sm sm:text-md text-bold pl-6">
              {userInfo.paymentMethod.expiryDate}
            </h5>
          </div>
          <div>
            <AiOutlineDelete
              size={25}
              className="cursor-pointer text-[red]"
              onClick={handleDeletePaymentMethod}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
