import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Checkout = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user); // Get auth status from Redux

  useEffect(() => {
    if (userInfo) {
      router.replace("/checkout/shipping-address"); 
    } else {
      router.replace("/user/login"); 
    }
  }, [userInfo, router]);

  return null; // No UI needed, it's just a redirect
};

export default Checkout;
