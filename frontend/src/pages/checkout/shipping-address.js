import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import fallbackImage from "../../../public/images/fallbackImage.jpg";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { resetCheckout, setOrderItems, setShippingAddress } from "@/redux/slices/checkoutSlice";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Stepper, Step, StepLabel, MenuItem, Select, Typography} from "@mui/material";
import { HiOutlineMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { removeItemFromCart } from "@/redux/slices/cartSlice";

const steps = ["User Login", "Shipping Address", "Payment Method", "Place Order" ];

const ShippingAddress = ({ categories }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { shippingAddress, orderItems } = useSelector(
    (state) => state.checkout
  );

  const addresses = userInfo?.addresses || [];
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    dispatch(setOrderItems(storedCartItems));

    const storedShippingAddress =
      JSON.parse(localStorage.getItem("shippingAddress")) || null;
    if (storedShippingAddress) {
      dispatch(setShippingAddress(storedShippingAddress));
      setSelectedAddress(storedShippingAddress);
    }
    setIsMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const homeAddress =
        addresses.find((addr) => addr.addressType === "Home") || addresses[0];
      setSelectedAddress(homeAddress);
      dispatch(setShippingAddress(homeAddress));
      localStorage.setItem("shippingAddress", JSON.stringify(homeAddress));
    }
  }, [addresses, selectedAddress, dispatch]);

  // Redirect when cart becomes empty
  useEffect(() => {
    if (isMounted && orderItems.length === 0 && !hasRedirected.current) {
      hasRedirected.current = true;
      localStorage.removeItem("shippingAddress");
      dispatch(resetCheckout());
      router.push("/");
    }
  }, [orderItems, isMounted, dispatch, router]);

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    dispatch(setShippingAddress(address));
    localStorage.setItem("shippingAddress", JSON.stringify(address));
  };

  const handleContinueToPayment = () => {
    if (selectedAddress) {
      dispatch(setShippingAddress(selectedAddress));
      localStorage.setItem("shippingAddress", JSON.stringify(selectedAddress));
      router.push("/checkout/payment-method");
    }
  };

  const handleIncrement = (itemId) => {
    const updatedItems = orderItems.map((item) =>
      item._id === itemId ? { ...item, qty: item.qty + 1 } : item
    );
    dispatch(setOrderItems(updatedItems));
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleDecrement = (itemId) => {
    const updatedItems = orderItems.map((item) =>
      item._id === itemId
        ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
        : item
    );
    dispatch(setOrderItems(updatedItems));
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = orderItems.filter((item) => item._id !== itemId);
    dispatch(setOrderItems(updatedItems));
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    // Also update the cart slice for HeaderUpper
    dispatch(removeItemFromCart(itemId));

    if (updatedItems.length === 0 && isMounted && !hasRedirected.current) {
      hasRedirected.current = true;
      dispatch(resetCheckout());
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const totalItemPrice = orderItems.reduce(
    (acc, item) => acc + (item.discountPrice || item.originalPrice) * item.qty,
    0
  );
  const shippingCost = totalItemPrice > 50 ? 0 : 4.99;
  const finalTotal = totalItemPrice + shippingCost;

  if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header categories={categories} />

      {/* Stepper Indicator */}
      <div className="flex justify-center py-6">
        <Stepper activeStep={1} alternativeLabel className="w-full max-w-2xl">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Shipping Address Card */}
          {userInfo && orderItems.length > 0 && (
            <Card className="shadow-xl rounded-lg p-6 bg-white">
              <CardContent>
                <h3 className="text-2xl font-semibold mb-4">
                  Shipping Address
                </h3>
                {addresses.length > 1 && (
                  <div className="mb-4">
                    <Typography className="text-gray-700 font-medium">
                      Select Address
                    </Typography>
                    <Select
                      fullWidth
                      variant="outlined"
                      value={selectedAddress?.addressType || ""}
                      onChange={(e) => {
                        const newAddress = addresses.find(
                          (addr) => addr.addressType === e.target.value
                        );
                        handleAddressSelection(newAddress);
                      }}
                      className="mt-2"
                    >
                      {addresses.map((addr) => (
                        <MenuItem key={addr._id} value={addr.addressType}>
                          {addr.addressType} - {addr.street}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
                {selectedAddress ? (
                  <div className="text-lg text-gray-700">
                    <p>{userInfo?.name}</p>
                    <p>{userInfo?.email}</p>
                    <p>
                      {selectedAddress.street}, {selectedAddress.zipCode},{" "}
                      {selectedAddress.city}, {selectedAddress.country}
                    </p>
                    <Button
                      variant="outline"
                      size="medium"
                      className="mt-6 w-auto px-6 py-2 border-gray-400 text-gray-800 hover:bg-gray-100"
                    >
                      Edit
                    </Button>
                  </div>
                ) : (
                  <Typography className="text-gray-500">
                    No saved addresses. Please add one.
                  </Typography>
                )}
              </CardContent>
            </Card>
          )}

          {/* Order Items Card */}
          {orderItems.length > 0 ? (
            <Card className="shadow-xl rounded-lg p-6 bg-white">
              <CardContent>
                <h3 className="text-2xl font-semibold mb-4">Order Items</h3>
                <div className="border-b pb-3 flex justify-between text-gray-500 text-lg font-semibold">
                  <span className="w-1/4 text-left">Item</span>
                  <span className="w-1/4 text-center">Quantity</span>
                  <span className="w-1/4 text-right">Price</span>
                  <span className="w-1/4 text-right">Action</span>
                </div>
                {orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-4 border-b"
                  >
                    {/* Product Info */}
                    <div className="w-1/4 flex items-center space-x-6">
                      <Link href={`/product/${item._id}`} passHref>
                        <Image
                          src={item.images?.[0]?.url || fallbackImage}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </Link>
                      <span className="text-lg">{item.name}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="w-1/4 flex items-center justify-center gap-3">
                      <div
                        className={`rounded-full w-[25px] h-[25px] flex items-center justify-center ${
                          item.qty > 1
                            ? "bg-[#e44343] cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed opacity-50"
                        }`}
                        onClick={() =>
                          item.qty > 1 && handleDecrement(item._id)
                        }
                      >
                        <HiOutlineMinus size={16} color="#fff" />
                      </div>
                      <span className="text-lg">{item.qty}</span>
                      <div
                        className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => handleIncrement(item._id)}
                      >
                        <HiPlus size={18} color="#000" />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="w-1/4 text-right">
                      <span className="text-lg font-semibold">
                        ${(item.discountPrice * item.qty).toFixed(2)}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <div className="w-1/4 text-right flex justify-end">
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center mt-8">
              <p className="text-xl text-gray-600">
                Your cart is empty. Please add items to your cart.
              </p>
              <Link href="/" passHref>
                <Button className="mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Card */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-xl rounded-lg p-6 bg-white">
            <CardContent>
              <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 text-lg">
                <div className="flex justify-between text-gray-700">
                  <span>Items</span>
                  <span>${totalItemPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>${(totalItemPrice > 50 ? 0 : 4.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              {orderItems.length > 0 && (
                <Button
                  onClick={handleContinueToPayment}
                  className="w-full bg-black text-white p-3 rounded-lg mt-6 hover:bg-gray-900 text-lg"
                >
                  Continue to Payment
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
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

export default ShippingAddress;
