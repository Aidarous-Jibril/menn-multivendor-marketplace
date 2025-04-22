import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const withUserAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.user);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true); // Prevent hydration mismatch
    }, []);

    useEffect(() => {
      if (!userInfo || !userInfo.email) {
        router.push("/user/login");
      }
    }, [userInfo, router]);

    if (!isClient) return null;

    return userInfo && userInfo.email ? <WrappedComponent {...props} /> : null;
  };
};

export default withUserAuth;
