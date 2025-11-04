import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='relative flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm overflow-hidden bg-background-footer '>
        <div className='ml-5'>
        <img src={assets.logo} className='mb-5 w-32 ' alt=""/>
        <p className='w-full md:w-2/3 text-gray-200'>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
        </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5  mt-5 text-gray-200'> COMPANY </p>
                <ul className='flex flex-col gap-1 text-gray-200'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
          
        </div>
        <div>
            <p className='text-xl font-medium mb-5 mt-5 text-gray-200'>GET IN TOUCH</p>
            
            <ul className='flex flex-col gap text-gray-200 '>
          
                <li>+1-212-456-7890</li>
                <li>contact@asaeveryou.com</li>
            </ul>
        </div>
        <div>
            <hr/>
            <p className='py-5 text-sm text-center text-gray-200'>Copyright 2025@ asaever.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer;