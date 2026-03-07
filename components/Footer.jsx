import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-chai-800">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-chai-700 text-chai-300">
        <div className="w-4/5">
          <Image className="w-28 md:w-32 brightness-200" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm text-chai-400">
            UniTrade is your warm, inviting marketplace for discovering amazing 
            products. Like a perfect cup of chai, we blend quality, comfort, and 
            convenience to create an experience you'll love coming back to.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-chai-50 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:text-spice-light transition" href="#">Home</a>
              </li>
              <li>
                <a className="hover:text-spice-light transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:text-spice-light transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:text-spice-light transition" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-chai-50 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2 text-chai-400">
              <p>+1-234-567-890</p>
              <p>hello@unitrade.dev</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-chai-500">
        Copyright 2025 © UniTrade. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;