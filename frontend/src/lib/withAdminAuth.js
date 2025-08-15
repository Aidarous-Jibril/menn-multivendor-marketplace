// lib/withAdminAuth.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { adminInfo } = useSelector((state) => state.admin);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!adminInfo || !adminInfo.email) {
        router.push("/admin/login");
      }
    }, [adminInfo, router]);

    if (!isClient) return null;

    return adminInfo && adminInfo.email ? <WrappedComponent {...props} /> : null;
  };
};

export default withAdminAuth;
