import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeaderBottom from "./HeaderBottom";
import HeaderUpper from "./HeaderUpper";

const Header = ({ activeHeading, products, categories }) => {
  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [sidebar] = useState(false);

  useEffect(() => {
    // Filter products when products and searchTerm are both truthy
    const filteredProducts = products?.length && searchTerm ?
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) : null;
    setSearchData(filteredProducts);
  }, [products, searchTerm]);
  
  useEffect(() => {
    // Activate header based on scroll position
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <div className={active === true ? "w-full shadow-sm fixed top-0 left-0 z-10" : null} >
        <HeaderUpper
          categories={categories}
          handleSearchChange={handleSearchChange}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>

      {sidebar && (
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: -500, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 right-0 w-[350px] h-full z-50  bg-[#131921] bg-opacity-50 text-white"
        >
        </motion.div>
      )}

     <HeaderBottom
        categories={categories}
        active={activeHeading}
        setActive={setActive}
        handleSearchChange={handleSearchChange}
        searchData={searchData}
        setSearchData={setSearchData}
      /> 
    </div>
  );
};

export default Header;
