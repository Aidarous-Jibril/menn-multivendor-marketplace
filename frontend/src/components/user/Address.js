// Third-party library imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";

// Local imports (Redux slices and styles)
import { addUserAddress, deleteUserAddress } from "@/redux/slices/userSlice";
import styles from "@/styles/styles";


const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [addressType, setAddressType] = useState("");
  const [isClient, setIsClient] = useState(false); // Track if we are on the client-side
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true); 
  }, []);

  const addressTypeData = [{ name: "Home" }, { name: "Office" }];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || state === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      const addressData = {
        country,
        state,
        city,
        street,
        zipCode,
        addressType,
      };
      const result = await dispatch(addUserAddress(addressData));

      if (result.type === "user/addUserAddress/fulfilled") {
        toast.success(result.payload.message);
      } else if (result.type === "user/addUserAddress/rejected") {
        toast.error(result.payload);
      }
      setOpen(false);
      setCountry("");
      setState("");
      setCity("");
      setStreet("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = async (addressId) => {
    const result = await dispatch(deleteUserAddress(addressId));

    if (result.type === "user/deleteUserAddress/fulfilled") {
      toast.success(result.payload.message);
    } else if (result.type === "user/deleteUserAddress/rejected") {
      toast.error(result.payload);
    }
  };

  if (!isClient) {
    return (
      <div> <CircularProgress color="primary" /> </div>
    );
  }

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-6 left-0 flex items-center justify-center">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="">Choose your country</option>
                      {Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">State/Region</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="">Choose your state</option>
                      {State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="">Choose your city</option>
                      {City.getCitiesOfState(country, state).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Street</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">Address Type</label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="">Choose your Address Type</option>
                      {addressTypeData.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                  <button
                    type="submit"
                    className="mt-5 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  >
                    Add Address
                  </button>
                </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 px-4">My Addresses</h1>
        <div className={`${styles.button} !rounded-md px-2`}>
          <span className="text-white" onClick={() => setOpen(true)}>
            Add New
          </span>
        </div>
      </div>
      <br />


      {userInfo && userInfo.addresses.length > 0 ? (
  <div className="mt-4">
    <table className="w-full min-w-full bg-white rounded-md overflow-hidden shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Type</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ZipCode</th>
          <th className="px-4 py-2 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {userInfo.addresses.map((item) => (
          <tr key={item._id}>
            <td className="px-4 py-2 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{item.addressType}</div>
              <div className="text-sm text-gray-500">{item.street}</div>
              <div className="text-sm text-gray-500">{item.city} {" "} {item.country}</div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.zipCode}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              <AiOutlineDelete size={20} className="cursor-pointer text-[red]" onClick={() => handleDelete(item._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <h5 className="text-center mt-4 text-[18px]">You do not have any saved address!</h5>
)}


    </div>
  );
};

export default Address;
