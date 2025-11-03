import React from 'react';
import HeroImage from './images/Heroimage.jpeg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Fullscreen Hero Image */}
      <img
        src={HeroImage}
        alt="hero"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay for text */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center justify-start p-8 sm:p-16">
        <div className="text-white max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-[2px] bg-green-500"></div>
            <p className="font-medium text-sm sm:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-snug mb-6">
            Latest Arrivals
          </h1>

          <p className="text-sm sm:text-base mb-6">
            Explore our latest collection of fresh products and shop the best quality items directly from our farm to your doorstep.
          </p>

          <Link 
            to="/collection" 
            className="bg-green-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-800 transition"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
