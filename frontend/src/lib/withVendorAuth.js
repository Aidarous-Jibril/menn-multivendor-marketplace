// lib/withVendorAuth.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const withVendorAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { vendorInfo } = useSelector((state) => state.vendors);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!vendorInfo || !vendorInfo.email) {
        router.push("/vendor/login");
      } else if (vendorInfo.isBlocked) {
        toast.error("Your vendor account is deactivated.");
        router.push("/vendor/login");
      }
    }, [vendorInfo, router]);

    if (!isClient) return null;

    return vendorInfo && vendorInfo.email && !vendorInfo.isBlocked ? (
      <WrappedComponent {...props} />
    ) : null;
  };
};

export default withVendorAuth;
