import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import ProfileContent from "@/components/profile/ProfileContent";
import Loader from "@/components/vendor/layout/Loader";

const ProfilePage = () => {
  const { data: session, status } = useSession(); // Get user session
  const { userInfo } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/user/login"); // Redirect if not authenticated
  //   }
  // }, [status, router]);

  if (status === "loading") {
    return <Loader />; // Show loader while session is being checked
  }

  if (!session && (!userInfo || !userInfo.email)) {
    return null; // Prevent UI from rendering if authentication check is still in progress
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="flex flex-row">
          <div className="w-[100px] 800px:w-[300px]">
            <ProfileSideBar active={active} setActive={setActive} />
          </div>
          <div className="flex-1 p-6">
            <ProfileContent active={active} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
