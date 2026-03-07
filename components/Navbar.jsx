"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const {openSignIn} = useClerk()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-chai-200 bg-cream/80 backdrop-blur-md sticky top-0 z-50">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="text-chai-700 hover:text-chai-900 font-medium transition">
          Home
        </Link>
        <Link href="/all-products" className="text-chai-700 hover:text-chai-900 font-medium transition">
          Shop
        </Link>
        <Link href="/" className="text-chai-700 hover:text-chai-900 font-medium transition">
          About Us
        </Link>
        <Link href="/" className="text-chai-700 hover:text-chai-900 font-medium transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border border-chai-400 text-chai-700 px-4 py-1.5 rounded-full hover:bg-chai-100 transition">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4 opacity-70" src={assets.search_icon} alt="search icon" />
        {user ? 
        <>
          <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
          </UserButton>
        </> :
        <button onClick={openSignIn} className="flex items-center gap-2 text-chai-700 hover:text-chai-900 font-medium transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border border-chai-400 text-chai-700 px-4 py-1.5 rounded-full hover:bg-chai-100 transition">Seller Dashboard</button>}
        {user ? 
        <>
          <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
          </UserButton>
        </> :
        <button onClick={openSignIn} className="flex items-center gap-2 text-chai-700 hover:text-chai-900 font-medium transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;