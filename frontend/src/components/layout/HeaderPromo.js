import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md'; // Importing the dropdown icon

const HeaderPromo = () => {
  const [currency, setCurrency] = useState('USD $');
  const [language, setLanguage] = useState('English');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setShowCurrencyDropdown(false); // Close dropdown after selection
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setShowLanguageDropdown(false); // Close dropdown after selection
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-2 border-b border-gray-200 px-16"> 
      <div className="flex items-center mb-2 sm:mb-0">
        <i className="fas fa-phone-alt"></i>
        <span className="ml-2">+00xxxxxxxxxxxx</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* Currency Dropdown */}
        <div className="relative inline-block text-left">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowCurrencyDropdown(!showCurrencyDropdown);
              setShowLanguageDropdown(false); // Close language dropdown when currency dropdown is opened
            }}
          >
            <span>{currency}</span>
            <MdArrowDropDown className="ml-1" />
          </div>
          {showCurrencyDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md py-1 z-10">
              <button
                onClick={() => handleCurrencyChange('USD $')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/us.svg"
                  alt="USD"
                  className="w-5 h-5 mr-2"
                />
                USD $
              </button>
              <button
                onClick={() => handleCurrencyChange('EUR €')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/eu.svg"
                  alt="EUR"
                  className="w-5 h-5 mr-2"
                />
                EUR €
              </button>
              <button
                onClick={() => handleCurrencyChange('GBP £')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/gb.svg"
                  alt="GBP"
                  className="w-5 h-5 mr-2"
                />
                GBP £
              </button>
            </div>
          )}
        </div>

        {/* Language Dropdown */}
        <div className="relative inline-block text-left">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowLanguageDropdown(!showLanguageDropdown);
              setShowCurrencyDropdown(false); // Close currency dropdown when language dropdown is opened
            }}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/us.svg"
              alt="US Flag"
              className="w-5 h-5"
            />
            <span className="ml-1">{language}</span>
            <MdArrowDropDown className="ml-1" />
          </div>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg rounded-md py-1 z-10">
              <button
                onClick={() => handleLanguageChange('English')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/us.svg"
                  alt="English"
                  className="w-5 h-5 mr-2"
                />
                English
              </button>
              <button
                onClick={() => handleLanguageChange('French')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/fr.svg"
                  alt="French"
                  className="w-5 h-5 mr-2"
                />
                French
              </button>
              <button
                onClick={() => handleLanguageChange('Spanish')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags/svg/es.svg"
                  alt="Spanish"
                  className="w-5 h-5 mr-2"
                />
                Spanish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderPromo;
