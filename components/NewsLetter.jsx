import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14">
      <h1 className="md:text-4xl text-2xl font-medium text-chai-900">
        Subscribe now & get 20% off
      </h1>
      <p className="md:text-base text-chai-500 pb-8">
        Stay updated with the latest deals, fresh arrivals, and exclusive offers — brewed just for you.
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
        <input
          className="border border-chai-300 rounded-l-xl h-full border-r-0 outline-none w-full px-4 text-chai-700 bg-chai-50 focus:border-chai-400 placeholder:text-chai-400 transition"
          type="text"
          placeholder="Enter your email id"
        />
        <button className="md:px-12 px-8 h-full text-white chai-gradient-warm rounded-r-xl font-medium hover:opacity-90 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
