"use client";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";

const OrderPlaced = () => {
  const { router } = useAppContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
    setTimeout(() => {
      router.push("/my-orders");
    }, 5000);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center overflow-hidden bg-cream relative">
      {/* Floating money emojis */}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute text-3xl md:text-5xl animate-float-money pointer-events-none select-none"
          style={{
            top: `${10 + Math.random() * 70}%`,
            left: `-60px`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 3}s`,
            opacity: 0.7 + Math.random() * 0.3,
          }}
        >
          {["💰", "💵", "🪙", "💸", "🤑"][i % 5]}
        </span>
      ))}

      {/* Confetti burst */}
      {[...Array(20)].map((_, i) => (
        <span
          key={`confetti-${i}`}
          className="absolute w-2 h-2 rounded-full animate-confetti pointer-events-none"
          style={{
            backgroundColor: [
              "#D4763B",
              "#7B8B6F",
              "#E8924A",
              "#8B5E3C",
              "#B8651A",
              "#FFD700",
            ][i % 6],
            left: "50%",
            top: "40%",
            animationDelay: `${i * 0.08}s`,
            ["--confetti-x"]: `${(Math.random() - 0.5) * 400}px`,
            ["--confetti-y"]: `${-200 - Math.random() * 200}px`,
          }}
        />
      ))}

      {/* Main content */}
      <div
        className={`flex flex-col items-center gap-6 z-10 transition-all duration-700 ${show ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"}`}
      >
        {/* Animated checkmark circle */}
        <div className="relative flex items-center justify-center">
          <div className="absolute animate-ping-slow rounded-full h-28 w-28 bg-cardamom/20"></div>
          <div className="relative h-24 w-24 rounded-full bg-cardamom flex items-center justify-center shadow-lg animate-bounce-in">
            <svg
              className="w-12 h-12 text-white animate-draw-check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" className="check-path" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div
          className={`text-center transition-all duration-700 delay-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-chai-800 mb-2">
            Order Placed! 🎉
          </h1>
          <p className="text-chai-500 text-base md:text-lg">
            Your order is confirmed and on its way
          </p>
        </div>

        {/* Animated progress bar */}
        <div
          className={`w-64 h-1.5 bg-chai-100 rounded-full overflow-hidden mt-2 transition-all duration-700 delay-500 ${show ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full bg-gradient-to-r from-spice to-cardamom rounded-full animate-progress-bar"></div>
        </div>

        <p
          className={`text-chai-400 text-sm transition-all duration-700 delay-700 ${show ? "opacity-100" : "opacity-0"}`}
        >
          Redirecting to your orders...
        </p>
      </div>
    </div>
  );
};

export default OrderPlaced;
