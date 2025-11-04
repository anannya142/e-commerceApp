import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Profile = () => {
  return (
    <div className='container'>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'MY'} text2={'PROFILE'}/>
     </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] rounded-all border ' src="#" alt=""/>
        <div className='flex flex-col justify-center item-start gap-6'>
           {/* <p className='font-semibold text-x1 text-gray-900'>{user.name}</p> */}
           <p className='text-primary-foreground'>503756375 willms station <br/> Suit 350 ,Washinton,USA </p>
           <p className='text-primary-foreground'>tel : (415) 555-0132 <br/> Email: admin@forever.com</p>
           <p className='font-semibold text-xl text-gray-900'>Careers at Forever</p>
           <p className='text-primary-foreground'>Learn more about our tems and job openings.</p>
         <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white trasition-all duration-500'>Contact Us</button>
         
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Profile