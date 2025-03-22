// import { useRouter } from "next/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { adminInfo } = useSelector((state) => state.admin); // Access admin state

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // Set the state to true once the component has mounted on the client
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (adminInfo && adminInfo.role !== "admin") {
        router.push("/"); // Redirect non-admins to homepage
      }
    }, [adminInfo, router]);

    if (!isClient) return null; 

    return adminInfo && adminInfo.role === "admin" ? (
      <WrappedComponent {...props} />
    ) : null;
  };
};

export default withAdminAuth;
