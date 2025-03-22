import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import SingleWishListCard from "./SingleWishListCard";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishListItems } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    // Dispatch action to add item to cart
  };

  const removeFromWishListHandler = (data) => {
    // Dispatch action to remove item from wishlist
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-10 flex justify-center items-center">
      <div className="fixed top-0 right-0 h-full w-[40%] 800px:w-[12%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {wishListItems && wishListItems.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 text-black">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-gray-700 font-normal">Wishlist items are empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5 text-black">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500] text-black">
                  {wishListItems && wishListItems.length} items
                </h5>
              </div>
              <br />
              <div className="w-full border-t">
                {wishListItems &&
                  wishListItems.map((item, index) => (
                    <SingleWishListCard
                      key={index}
                      data={item}
                      addToCartHandler={addToCartHandler}
                      removeFromWishListHandler={removeFromWishListHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
