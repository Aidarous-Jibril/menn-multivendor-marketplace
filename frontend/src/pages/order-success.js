
// //order-success
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setOrderItems, setShippingAddress, resetCheckout } from "@/redux/slices/checkoutSlice";
// import Link from "next/link";
// import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
// import { createOrder } from "@/redux/slices/orderSlice";

// const OrderSuccess = () => {
//   const router = useRouter();
//   const { paymentId, PayerID } = router.query;
//   const dispatch = useDispatch();
  
//   const { userInfo } = useSelector((state) => state.user);
//   const { shippingAddress, orderItems, selectedPayment } = useSelector((state) => state.checkout);
  
//   const [loading, setLoading] = useState(true);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [cartCleared, setCartCleared] = useState(false); // ✅ New state

//   useEffect(() => {
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//     dispatch(setOrderItems(storedCartItems));

//     const storedShippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
//     if (storedShippingAddress) {
//       dispatch(setShippingAddress(storedShippingAddress));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (cartCleared) {
//       dispatch(setOrderItems([]));  // Ensure Redux is fully cleared
//     }
//   }, [cartCleared, dispatch]);
  
  
//   //COD
//   useEffect(() => {
//     const processOrder = async () => {
//       if (router.query.paymentId || selectedPayment === "cash-on-delivery") {
//         setOrderSuccess(true);
//         dispatch(setOrderItems([]));
//         dispatch(resetCheckout());
//         localStorage.removeItem("cartItems");
//       }
//       setLoading(false);
//     };
  
//     processOrder();
//   }, [router.query.paymentId, selectedPayment, dispatch]);
  
//   useEffect(() => {
//     const verifyPaymentAndCreateOrder = async () => {
//       if (paymentId && PayerID) {
//         try {
//           const { data } = await axios.post("/api/payment/paypal/capture", { 
//             paymentId, 
//             payerId: PayerID 
//           });

//           if (data.success) {
//             const newOrder = {
//               items: orderItems.map((item) => ({
//                 productId: item._id,
//                 name: item.name,
//                 quantity: item.qty,
//                 price: item.discountPrice || item.originalPrice,
//                 vendorId: item.vendorId,
//               })),
//               user: userInfo?._id,
//               shippingAddress: shippingAddress
//                 ? {
//                     fullName: userInfo?.name,
//                     address: shippingAddress.street,
//                     city: shippingAddress.city,
//                     postalCode: shippingAddress.zipCode,
//                     country: shippingAddress.country || "Sweden",
//                   }
//                 : null,
//               totalPrice: orderItems.reduce(
//                 (acc, item) => acc + ((item.discountPrice || item.originalPrice) * item.qty),
//                 0
//               ),
//               status: "processing",
//               paymentInfo: {
//                 method: "PayPal",
//                 status: "Completed",
//                 transactionId: data.transactionId,
//               },
//               vendorId: orderItems[0].vendorId,
//             };

//             // Dispatch createOrder action instead of making the API call directly
//             const resultAction = await dispatch(createOrder(newOrder));
  
//             if (createOrder.fulfilled.match(resultAction)) {
//               setOrderSuccess(true);
//               dispatch(setOrderItems([])); 
//               dispatch(resetCheckout());
//               setCartCleared(true);
//               localStorage.removeItem("cartItems");
//             } else {
//               setErrorMessage(resultAction.payload || "Order creation failed. Please try again.");
//             }
//           } else {
//             setErrorMessage("Payment verification failed. Please try again.");
//           }
//         } catch (error) {
//           console.error("Payment Verification Error:", error);
//           setErrorMessage("Payment capture failed. Please try again.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     verifyPaymentAndCreateOrder();
//   }, [paymentId, PayerID, orderItems, shippingAddress, userInfo, dispatch]);

//   useEffect(() => {
//     if (cartCleared) {
//       dispatch(setOrderItems([])); // Ensure Redux updates
//     }
//   }, [cartCleared, dispatch]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center">
//         <h2 className="text-lg font-semibold text-gray-700">Processing payment...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
//       {orderSuccess ? (
//         <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
//           <AiOutlineCheckCircle className="w-16 h-16 text-green-500 mx-auto" />
//           <h2 className="text-xl font-semibold mt-4 text-gray-800">Order Successfully Placed!</h2>
//           <p className="text-gray-600 mt-2">Thank you for your purchase, {userInfo?.name}.</p>
//           <p className="text-gray-500">A confirmation email has been sent to you.</p>
//           <Link href="/user/orders">
//             <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
//               View My Orders
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
//           <AiOutlineCloseCircle className="w-16 h-16 text-red-500 mx-auto" />
//           <h2 className="text-xl font-semibold mt-4 text-gray-800">Something Went Wrong</h2>
//           <p className="text-gray-600 mt-2">{errorMessage}</p>
//           <Link href="/checkout">
//             <button className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
//               Try Again
//             </button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderSuccess;


import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../public/animations/24151-ecommerce-animation.json'; // Import animation file
import { useRouter } from 'next/router';
import Link from 'next/link';

const OrderSuccess = () => {
  const router = useRouter(); 

  // Lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/user/orders');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]); 


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>

      <div className="text-center max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Your order was placed successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase. You will receive an email with your order details shortly.
        </p>
        <Link href="/" passHref>
          <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
