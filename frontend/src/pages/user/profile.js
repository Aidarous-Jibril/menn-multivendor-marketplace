import React from 'react';
import Header from '@/components/layout/Header';
import ProfileSideBar from '@/components/user/layout/ProfileSideBar';
import ProfileContent from '@/components/user/profile/ProfileContent';
import withUserAuth from '@/lib/withUserAuth';

const ProfilePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <div className="w-[100px] 800px:w-[330px] bg-white">
          <ProfileSideBar active={1}  />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <ProfileContent  />
        </div>
      </div>
    </div>
  );
};

export default withUserAuth(ProfilePage);


// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import Loader from "@/components/vendor/layout/Loader";
// import ProfileContent from "@/components/user/profile/ProfileContent";
// import Header from "@/components/layout/Header";
// import ProfileSideBar from "@/components/user/layout/ProfileSideBar";

// const ProfilePage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.replace("/user/login");
//     }
//   }, [status, router]);

//   if (status === "loading") return <Loader />;

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex flex-1 bg-gray-100">
//         <div className="w-[100px] 800px:w-[330px] bg-white">
//           <ProfileSideBar active={1} />
//         </div>
//         <div className="flex-1 overflow-y-auto p-4">
//           <ProfileContent />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
