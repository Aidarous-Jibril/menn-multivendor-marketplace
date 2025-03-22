import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import Image from "next/image";

import AllOrders from "../user/AllOrders";
import PaymentMethod from "../user/PaymentMethod";
import OrderTracker from "../user/OrderTracker";
import { updateUserAvatar, updateUserInformation } from "@/redux/slices/userSlice";
import Address from "../user/Address";


const ProfileContent = ({ active }) => {
  return (
    <div className="w-full">
      {active === 1 && <UserProfile />}
      {active === 2 && <AllOrders />}
      {active === 3 && <OrderTracker />}
      {active === 4 && <AllRefundOrders />}
      {active === 5 && <Inbox />}
      {active === 6 && <ChangePassword />}
      {active === 7 && <Address />}
      {active === 8 && <PaymentMethod />}
    </div>
  );
};

const UserProfile = () => {
  const { userInfo, error } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = userInfo._id;
  
    try {
      const result = await dispatch(
        updateUserInformation({
          name: name,
          email: email,
          phoneNumber: String(phoneNumber),
          password: password,
          id: id,
        })
      );
  
      if (result.type === "user/updateUserInformation/fulfilled") {
        toast.success("User information updated successfully!");
      } else {
        throw new Error(result.payload || "Error updating user information");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };
  
  

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected.");
      return;
    }
  
    const id = userInfo._id;
    try {
      const result = await dispatch(updateUserAvatar({ id, avatar: file }));
  
      if (result.type === "user/updateUserAvatar/fulfilled") {
        toast.success("Avatar updated successfully!");
      } else {
        throw new Error(result.payload || "Error updating avatar");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
   
    <div className="w-full h-full bg-gray-100 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col">
      <div className="flex justify-center w-full mb-6">
        <div className="relative">
        <Image
          src={userInfo?.avatar?.url || ""}
          alt="Profile"
          width={150}
          height={150}
          className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
        />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input type="file" id="user-image" className="hidden" onChange={handleImage} />
            <label htmlFor="user-image">
              <AiOutlineCamera className="text-[#3ad132]" />
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label className="font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md p-2"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="font-semibold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Leave blank to keep the same password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-[#3a24db] text-white py-2 rounded-md text-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
};
export default ProfileContent;
