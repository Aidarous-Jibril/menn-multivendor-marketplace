import React from 'react';
import { FaApple, FaGooglePlay, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">DOWNLOAD OUR APP</h3>
          <div className="flex space-x-4">
            <a href="#">
              <FaApple className="w-8 h-8" />
            </a>
            <a href="#">
              <FaGooglePlay className="w-8 h-8" />
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">SPECIAL</h3>
          <ul>
            <li>Flash Deal</li>
            <li>Featured Products</li>
            <li>Latest Products</li>
            <li>Best Selling Products</li>
            <li>Top Rated Products</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">ACCOUNT & SHIPPING INFO</h3>
          <ul>
            <li>Profile Info</li>
            <li>Wish List</li>
            <li>Track Order</li>
            <li>Refund Policy</li>
            <li>Return Policy</li>
            <li>Cancellation Policy</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">NEWSLETTER</h3>
          <p>Subscribe to our new channel to get the latest updates</p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="p-2 rounded-md w-full text-black"
            />
            <button className="mt-2 w-full bg-blue-700 text-white p-2 rounded-md">Subscribe</button>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-bold mb-4">Start A Conversation</h3>
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2" /> <span>+00xxxxxxxxxxxx</span>
          </div>
          <div className="flex items-center mt-2">
            <FaEnvelope className="mr-2" /> <span>c**********@6amtech.com</span>
          </div>
          <div className="flex items-center mt-2">
            <FaMapMarkerAlt className="mr-2" /> <span>Kingston, New York 12401, United States</span>
          </div>
          <div className="flex items-center mt-2">
            <FaWhatsapp className="mr-2" /> <span>Support Ticket</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">© 6amTech@2021</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <AiFillTwitterCircle className="w-6 h-6" />
          <AiFillLinkedin className="w-6 h-6" />
          <AiFillGithub className="w-6 h-6" />
          <AiFillInstagram className="w-6 h-6" />
          <AiFillFacebook className="w-6 h-6" />
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a>
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
