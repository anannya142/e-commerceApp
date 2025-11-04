
import React , {useContext} from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';





const Hero = () => {
  const { navigate} = useContext(ShopContext);

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-between overflow-hidden bg-background">
      
      {/* === Background Shape === */}
      <div className="absolute right-0 top-0 w-[85%] h-full bg-primary/40 clip-hero-shape"></div>

      {/* === Left Side (Text) === */}
      <div className="relative z-10 w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] px-6">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button  onClick = {()=>navigate('/collection')} className="cosmic-button">Order Now</button>
          </div>
        </div>
      </div>

      {/* === Right Side (Image) === */}
      <img
        className="relative z-10 w-full sm:w-1/2"
        src={assets.hero_img}
        alt="Hero"
      />
    </div>
  );
};

export default Hero;



