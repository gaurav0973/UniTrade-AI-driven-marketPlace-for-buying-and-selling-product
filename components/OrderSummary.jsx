import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems} = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get("/api/user/get-address", {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })
      if(data.success){
        setUserAddresses(data.addresses)
        if(data.addresses.length > 0){
          setSelectedAddress(data.addresses[0])
        }
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if(!selectedAddress){
        toast.error("Please select an address to proceed")
        return;
      }

      let cartItemsArray = Object.keys(cartItems).map( (key) => {
        return {
          product : key,
          quantity : cartItems[key]
        }
      })
      cartItemsArray = cartItemsArray.filter( (item) => item.quantity > 0)

      if(cartItemsArray.length === 0){
        toast.error("Your cart is empty")
        return;
      }

      const token = await getToken()
      const {data} = await axios.post("/api/order/create", {
        addressId : selectedAddress._id,
        items : cartItemsArray
      }, {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })

      if(data.success){
        toast.success(data.message)
        setCartItems({})
        router.push("/order-placed")
      }else{
        toast.error(data.message)
      }



    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user){
      fetchUserAddresses();
    } 
  }, [user])

  return (
    <div className="w-full md:w-96 bg-chai-50 p-5 rounded-2xl border border-chai-200 chai-shadow">
      <h2 className="text-xl md:text-2xl font-medium text-chai-800">
        Order Summary
      </h2>
      <hr className="border-chai-200 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-chai-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border border-chai-300 rounded-lg overflow-hidden">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-chai-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#8B5E3C"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border border-chai-200 chai-shadow-lg mt-1 z-10 py-1.5 rounded-lg">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-chai-50 cursor-pointer text-chai-700"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-chai-50 cursor-pointer text-center text-spice font-medium"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-chai-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-chai-700 border border-chai-300 rounded-lg bg-white focus:border-chai-400 placeholder:text-chai-400 transition"
            />
            <button className="chai-gradient-warm text-white px-9 py-2 rounded-lg hover:opacity-90 transition">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-chai-200 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-chai-600">Items {getCartCount()}</p>
            <p className="text-chai-800">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-chai-500">Shipping Fee</p>
            <p className="font-medium text-cardamom-dark">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-chai-500">Tax (2%)</p>
            <p className="font-medium text-chai-800">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t border-chai-200 pt-3">
            <p className="text-chai-900">Total</p>
            <p className="text-chai-900">{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full chai-gradient text-white py-3 mt-5 rounded-xl hover:opacity-90 transition font-medium text-lg">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;