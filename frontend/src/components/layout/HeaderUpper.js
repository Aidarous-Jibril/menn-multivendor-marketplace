import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { SearchIcon } from "@heroicons/react/solid";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/styles";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/WishList";

const HeaderUpper = ({ handleSearchChange, searchData }) => {
  const { userInfo } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const { wishListItems } = useSelector(state => state.wishList);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024); // Default width for server-side rendering
  const [isClient, setIsClient] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);
  
  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isClient && windowWidth >= 768 && (
        <div
          className={`${
            windowWidth >= 768
              ? "w-full bg-[#131921] text-white px-4 py-2 flex justify-between flex-wrap items-center gap-4"
              : "py-0"
          }`}
        >
          {/* Logo */}
          <div className="headerHover">
            <Link href="/" legacyBehavior>
              <Image
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
                width={100}
                height={40}
              />
            </Link>
          </div>

          {/* Search */}
          <div
            className="h-10 rounded-md flex relative mx-4"
            style={{ width: "400px" }}
          >
            <div className="flex items-center justify-center w-full">
              <input
                onChange={handleSearchChange}
                className="h-full text-base text-[#131921] flex-grow outline-none border-none px-2"
                type="text"
                placeholder="Search products..."
              />
              <span className="w-12 h-full flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] duration-300 text-[#131921] cursor-pointer rounded-tr-md rounded-br-md">
                <SearchIcon width={24} />
              </span>
            </div>
            {/* Adjusted here to show searched item perfectly */}
            {searchData && searchData.length !== 0 && (
              <div className="absolute w-full bg-slate-50 shadow-sm z-50 mt-12 p-4">
                {searchData.map((item, index) => (
                  <Link
                    href={`/product/${item._id}`}
                    key={index}
                    legacyBehavior
                  >
                    <a className="w-full flex items-start py-3">
                      <img
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
          </div>
          {/* </div> */}

          {/* Right side Icons */}
          <div className="flex gap-4">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishListItems && wishListItems.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cartItems && cartItems.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isClient && (
                  <>
                    {userInfo && userInfo.avatar && userInfo.avatar.url ? (
                      <Link href="/user/profile" legacyBehavior>
                        <Image
                          src={userInfo.avatar.url}
                          className="w-[35px] h-[35px] rounded-full"
                          alt="User Avatar"
                          width={35}
                          height={35}
                        />
                      </Link>
                    ) : (
                      <Link href="/user/login" legacyBehavior>
                        <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart && <Cart setOpenCart={setOpenCart} />}

            {/* wishlist popup */}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderUpper;
