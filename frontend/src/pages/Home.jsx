import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import PromoVideo from "../components/PromoVideo";

const Home = () => {
  return (
    <>
    <Hero/>
    <LatestCollection/>
    <PromoVideo
    src="https://res.cloudinary.com/prod/video/upload/du_6/fl_splice:transition_(name_fade;du_2),l_video:me:fashion-2/du_6/fl_layer_apply/me/fashion-1.mp4"
 
    />
    <BestSeller/>
    <OurPolicy/>
     
    <NewsletterBox/>
    </>
    
    

  )
}

export default Home;