import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosMenu } from "react-icons/io";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { XIcon, ChevronDownIcon,ChevronUpIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import Cart from "../cart/Cart";
import { CgProfile } from "react-icons/cg";

import styles from "../../styles/styles";
import { navItems } from "../../static/data";


const HeaderBottom = ({ categories, active, handleSearchChange, searchData }) => {
  const ref = useRef();
  const { vendorInfo} = useSelector((state) => state.vendors);
  const { userInfo } = useSelector((state) => state.user);
  const [sidebar, setSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <div className="w-full px-4 h-[46px] bg-slate-700 text-white flex items-center justify-between">
        <ul className="flex items-center gap-2 text-sm tracking-wide">
          <li
            onClick={() => setSidebar(true)}
            className="flex items-center gap-1 cursor-pointer border border-transparent hover:border-white px-3.5 py-1"
          >
            <IoIosMenu size={24} />
            All
          </li>
          {windowWidth >= 768 && (
            <div className={`block ${styles.normalFlex}`}>
              {navItems.map((item, index) => (
                <div className="flex" key={index}>
                  <Link href={item.url} legacyBehavior>
                    <a
                      className={`${
                        active === index + 1
                          ? "text-red-500 border-red-500"
                          : "text-white"
                      }  px-6 cursor-pointer border-b border-transparent hover:border-white font-semibold`}
                    >
                      {item.title}
                    </a>
                  </Link>
                </div>
              ))}

              <Link
                href={vendorInfo ? "/vendor/dashboard" : "/vendor/login"}
                legacyBehavior
              >
                <a className="nav-link">
                  <h1 className="flex items-center text-white">
                    {vendorInfo ? "Dashboard" : "Sell"}
                  </h1>
                </a>
              </Link>
            </div>
          )}
        </ul>
        {windowWidth < 768 && (
          <>
            <Link href="/" legacyBehavior>
              <a>
                <Image
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="w-24 cursor-pointer"
                />
              </a>
            </Link>
            <div className="flex items-center">
              <SearchIcon
                className="h-6 w-6 text-white mr-4 cursor-pointer"
                onClick={handleSearchToggle}
              />
              <ShoppingCartIcon
                onClick={() => setOpenCart(!openCart)}
                className="h-6 w-6 mr-4 text-white cursor-pointer"
              />

              {isClient && (
                <>
                  {userInfo && userInfo.avatar && userInfo.avatar.url ? (
                    <Link href="/profile" legacyBehavior>
                      <Image
                        src={userInfo.avatar.url}
                        className="w-[35px] h-[35px] rounded-full"
                        alt="User Avatar"
                        width={35}
                        height={35}
                      />
                    </Link>
                  ) : (
                    <Link href="/login" legacyBehavior>
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )}
                </>
              )}
            </div>
            {openCart && <Cart setOpenCart={setOpenCart} />}
          </>
        )}
      </div>

      {showSearch && (
        <div className="absolute top-[6px] left-0 right-0 z-50 mx-4">
          <div className="relative bg-white p-0.5 rounded-md shadow-md z-50">
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <XIcon
              className="absolute top-3 right-3 h-6 w-6 text-red-600 cursor-pointer"
              onClick={handleSearchToggle}
            />
          </div>
        </div>
      )}

      {searchData && searchData.length !== 0 && showSearch && (
        <div className="absolute w-full bg-slate-50 shadow-sm z-50 mt-12 p-4">
          {searchData.map((item, index) => (
            <Link href={`/product/${item._id}`} key={index} legacyBehavior>
              <a className="w-full flex items-start py-3">
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] mr-[20px]"
                />
                <h1 className="text-[#000]">{item.name}</h1>
              </a>
            </Link>
          ))}
        </div>
      )}

      <motion.div
        initial={{ x: -500, opacity: 0 }}
        animate={{
          x: sidebar ? 0 : -500,
          opacity: sidebar ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 z-50 w-full h-screen text-black bg-[#131921] bg-opacity-50 ${
          sidebar ? "" : "hidden"
        }`}
      >
        <div className="w-full h-full relative flex justify-between ">
          <div
            ref={ref}
            className="w-[350px] h-full bg-white border border-black "
          >
            <Link href="/login" legacyBehavior>
              <a className="w-full bg-[#232F3E] text-white py-2 pl-2 flex items-center gap-4">
                <CgProfile size={24} color="rgb(255 255 255 / 83%)" />
                <h3 className="font-titleFont font-semibold text-lg tracking-wide">
                  Sign In
                </h3>
              </a>
            </Link>
            <SideNavContent categories={categories} sidebar={sidebar} setSidebar={setSidebar}  />
            <span
              onClick={() => setSidebar(false)}
              className="cursor-pointer absolute top-0 left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"
            >
              <XIcon />
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SideNavContent = ({ categories, sidebar, setSidebar }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategoryClick = (category, event) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedSubcategory(null);
    event.preventDefault();
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(
      selectedSubcategory === subcategory ? null : subcategory
    );
  };

  return (
    <div className={`relative z-20 ${sidebar ? "" : "hidden"}`}>
      <div className={`absolute ${sidebar ? "w-[330px]" : "hidden"}`}>
        <div
          className={`absolute w-[100%] bg-white shadow-sm rounded-md  pr-0  z-50 left-4 mt-2 `}
        >
          {categories?.map((category, index) => (
            <div key={index} className="border-b">
              <div
                onClick={(e) => handleCategoryClick(category, e)}
                className="flex items-center justify-between cursor-pointer hover:bg-zinc-200 px-2 py-3"
              >
                <h3>{category.name}</h3>
                {selectedCategory === category ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
              {selectedCategory === category && (
                <ul>
                  {category.subcategories.map((subcategory, index) => (
                    <li key={index} className="ml-4 mb-2">
                      <div
                        onClick={() => handleSubcategoryClick(subcategory)}
                        className="flex items-center justify-between cursor-pointer my-4"
                      >
                        <h3>{subcategory.name}</h3>
                        {selectedSubcategory === subcategory ? (
                          <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      {selectedSubcategory === subcategory && (
                        <ul className="ml-4">
                          {subcategory.subsubcategories.map(
                            (subsubcategory, index) => (
                              <li
                                key={index}
                                className="my-2 cursor-pointer hover:bg-slate-100 p-2"
                                onClick={() => setSidebar(false)}
                              >
                                <Link href={`/category/${category.slug}/${subcategory.slug}/${subsubcategory.slug}`}legacyBehavior>
                                  <a>{subsubcategory.name}</a>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
