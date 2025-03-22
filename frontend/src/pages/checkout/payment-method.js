//payment method
import { useState } from "react";
import { useRouter } from "next/router";
import { Stepper, Step, StepLabel } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { setPaymentMethod } from "@/redux/slices/checkoutSlice";

const steps = ["User Login", "Shipping Address", "Payment Method", "Place Order"];

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiStepLabel-label": {
    fontWeight: "600",
    color: "#9E9E9E",
  },
  "& .Mui-active .MuiStepLabel-label": {
    color: "#E44343",
  },
  "& .Mui-completed .MuiStepLabel-label": {
    color: "#4CAF50",
  },
}));

const PaymentMethod = ({ categories }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedPayment, setSelectedPayment] = useState("cash-on-delivery"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPaymentMethod(selectedPayment)); 
    router.push("/checkout/place-order");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header categories={categories} />

      <div className="flex justify-center py-4">
        <Stepper activeStep={2} alternativeLabel className="w-full max-w-2xl">
          {steps.map((label) => (
            <Step key={label}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl space-y-4"
        >
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="cash-on-delivery"
              checked={selectedPayment === "cash-on-delivery"}
              readOnly
            />
            <span>Cash On Delivery</span>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Continue →
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  try {
    const categoriesRes = await axios
      .get(`${baseURL}/api/categories`)
      .catch((err) => {
        console.error("Categories Error:", err);
        return null;
      });

    return {
      props: {
        categories: categoriesRes?.data?.categories || [],
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return { props: { categories: [] } };
  }
}

export default PaymentMethod;


//FOR PAYPAL INCLUSION
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { Stepper, Step, StepLabel, MenuItem, Select, Typography } from "@mui/material";
// import { styled } from "@mui/system";
// import axios from "axios";
// import { setPaymentMethod, setOrderItems, setShippingAddress, resetCheckout } from "@/redux/slices/checkoutSlice";
// import { toast } from "react-toastify";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import fallbackImage from "../../../public/images/fallbackImage.jpg";
// import Link from "next/link";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { createOrder } from "@/redux/slices/orderSlice";

// const steps = ["User Login", "Shipping Address", "Payment Method", "Place Order"];

// const CustomStepLabel = styled(StepLabel)({
//   "& .MuiStepLabel-label": { fontWeight: "600", color: "#9E9E9E" },
//   "& .Mui-active .MuiStepLabel-label": { color: "#E44343" },
//   "& .Mui-completed .MuiStepLabel-label": { color: "#4CAF50" },
// });

// const PaymentMethod = ({ categories }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.user);
//   const {  orderItems } = useSelector((state) => state.checkout);

//   const addresses = userInfo?.addresses || [];
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState("");
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);


//   useEffect(() => {
//     if (isClient) {
//       const storedOrderItems = JSON.parse(localStorage.getItem("cartItems")) || [];
//       dispatch(setOrderItems(storedOrderItems));
  
//       const storedShippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
//       if (storedShippingAddress) {
//         dispatch(setShippingAddress(storedShippingAddress));
//         setSelectedAddress(storedShippingAddress);
//       } else if (addresses.length > 0) {
//         const defaultAddress = addresses.find(addr => addr.addressType === "Home") || addresses[0];
//         setSelectedAddress(defaultAddress);
//         dispatch(setShippingAddress(defaultAddress));
//       }
//     }
//   }, [dispatch, addresses, isClient]);
  
//   useEffect(() => {
//     if (selectedAddress) {
//       dispatch(setShippingAddress(selectedAddress));
//       localStorage.setItem("shippingAddress", JSON.stringify(selectedAddress)); // Save only when address changes
//     }
//   }, [selectedAddress]);
  
  

//   const handlePayPalPayment = async () => {
//     try {
//       const { data } = await axios.post("/api/payment/paypal/process", { total: finalTotal });
//       if (data.success) {
//         window.location.href = data.approvalUrl;
//       } else {
//         toast.error("PayPal payment failed!");
//       }
//     } catch (error) {
//       console.error("PayPal Payment Error:", error);
//       toast.error("PayPal payment request failed!");
//     }
//   };


//   const handlePlaceOrder = async () => {
//     if (!selectedPayment) {
//       toast.error("Please select a valid payment method.");
//       return;
//     }
  
//     if (selectedPayment === "cash-on-delivery") {
//       const newOrder = {
//         items: orderItems.map((item) => ({
//           productId: item._id,
//           name: item.name,
//           quantity: item.qty,
//           price: item.discountPrice || item.originalPrice,
//           vendorId: item.vendorId,
//         })),
//         user: userInfo?._id,
//         shippingAddress: selectedAddress
//           ? {
//               fullName: userInfo?.name,
//               address: selectedAddress.street,
//               city: selectedAddress.city,
//               postalCode: selectedAddress.zipCode,
//               country: selectedAddress.country || "Sweden",
//             }
//           : null,
//         totalPrice: finalTotal,
//         status: "processing",
//         paymentInfo: {
//           method: "Cash on Delivery",
//           status: "Pending",
//           transactionId: null,
//         },
//         vendorId: orderItems[0].vendorId,
//       };
  
//       try {
//         const result = await dispatch(createOrder(newOrder));
//   console.log("result:", result)
//         if (createOrder.fulfilled.match(result)) {
//           toast.success(result.payload.message); // Display backend message
          
//           // Clear cart and reset checkout state
//           dispatch(setOrderItems([])); 
//           dispatch(resetCheckout());
//           localStorage.removeItem("cartItems");
  
//           // Navigate to success page
//           router.push("/order-success");
//         } else {
//           const errorMessage = result.payload || "Order creation failed. Please try again.";
//           toast.error(errorMessage);
//         }
//       } catch (error) {
//         console.error("Order placement error:", error);
//         toast.error("An unexpected error occurred. Please try again.");
//       }
//     } else if (selectedPayment === "paypal") {
//       handlePayPalPayment();
//     }
//   };
  
  
//   const totalItemPrice = orderItems.reduce((acc, item) => acc + ((item.discountPrice || item.originalPrice) * item.qty), 0);
//   const shippingCost = totalItemPrice > 50 ? 0 : 4.99;
//   const finalTotal = totalItemPrice + shippingCost;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <Header categories={categories} />
//       <div className="flex justify-center py-6">
//         <Stepper activeStep={2} alternativeLabel className="w-full max-w-2xl">
//           {steps.map((label) => (
//             <Step key={label}>
//               <CustomStepLabel>{label}</CustomStepLabel>
//             </Step>
//           ))}
//         </Stepper>
//       </div>

//       <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
//       {isClient && (
//         <>
//           <div className="flex-1 space-y-6">
//             <Card className="shadow-xl rounded-lg p-6 bg-white">
//               <CardContent>
//                 <h3 className="text-2xl font-semibold mb-4">Shipping Address</h3>
//                 {addresses.length > 1 && (
//                   <Select
//                     fullWidth
//                     value={selectedAddress?.addressType || ""}
//                     onChange={(e) => setSelectedAddress(addresses.find((addr) => addr.addressType === e.target.value))}
//                   >
//                     {addresses.map((addr) => (
//                       <MenuItem key={addr._id} value={addr.addressType}>
//                         {addr.addressType} - {addr.street}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 )}
//                 {selectedAddress && (
//                   <div className="text-lg text-gray-700 mt-4">
//                     <p>{userInfo?.name}</p>
//                     <p>{userInfo?.email}</p>
//                     <p>{selectedAddress.street}, {selectedAddress.zipCode}, {selectedAddress.city}, {selectedAddress.country}</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             <Card className="shadow-xl rounded-lg p-6 bg-white">
//               <CardContent>
//                 <h3 className="text-2xl font-semibold mb-4">Payment Method</h3>
//                 {["credit-card", "paypal", "cash-on-delivery"].map((method) => (
//                   <label key={method} className="flex items-center space-x-2">
//                     <input type="radio" name="payment" value={method} checked={selectedPayment === method} onChange={(e) => setSelectedPayment(e.target.value)} />
//                     <span className="capitalize">{method.replace("-", " ")}</span>
//                   </label>
//                 ))}
//               </CardContent>
//             </Card>

//                       {/* Order Items */}
//                       <Card className="shadow-xl rounded-lg p-6 bg-white">
//               <CardContent>
//                 <h3 className="text-2xl font-semibold mb-4">Order Items</h3>

//                 {/* Table Header */}
//                 <div className="border-b pb-3 flex justify-between text-gray-500 text-lg font-semibold">
//                   <span className="w-1/3 text-left">Item</span>
//                   <span className="w-1/3 text-center">Quantity</span>
//                   <span className="w-1/3 text-right">Price</span>
//                 </div>

//                 {/* Order Items */}
//                 {orderItems?.map((item) => (
//                   <div key={item.id} className="flex items-center justify-between py-4 border-b">
//                     <div className="w-1/3 flex items-center space-x-6">
//                       <Link href={`/product/${item.id}`} passHref>
//                         <Image
//                           src={item.images?.[0]?.url || fallbackImage}
//                           alt={item.name}
//                           width={80}
//                           height={80}
//                           className="rounded-md"
//                         />
//                       </Link>
//                       <span className="text-lg">{item.name}</span>
//                     </div>
//                     <span className="w-1/3 text-center text-lg">{item.qty}</span>
//                     <span className="w-1/3 text-right text-lg font-semibold">
//                       ${item.discountPrice.toFixed(2)}
//                     </span>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>

//           <div className="w-full lg:w-1/3">
//             <Card className="shadow-xl rounded-lg p-6 bg-white">
//               <CardContent>
//                 <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
//                 <div className="text-lg space-y-2">
//                   <div className="flex justify-between"><span>Items</span><span>${totalItemPrice.toFixed(2)}</span></div>
//                   <div className="flex justify-between"><span>Shipping</span><span>${shippingCost}</span></div>
//                   <div className="flex justify-between"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
//                 </div>
//                 <Button onClick={handlePlaceOrder} 
//                 className="w-full bg-black text-white p-3 rounded-lg mt-6 hover:bg-gray-900 text-lg"
//                 >
//                   Complete Payment and Create Order
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </>
//       )}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default PaymentMethod;
