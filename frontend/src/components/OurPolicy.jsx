import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 bg-background  '>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt=''/>
            <p className='font-semibold'>Easy Exchange policy</p>
            <p className='text-primary-foreground'>We offer hassle free exchange policy </p>

        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt=''/>
            <p className='font-semibold'>7 Days Return policy</p>
            <p className='text-primary-foreground'>We provide 7 days free return policy </p>

        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt=''/>
            <p className='font-semibold'>Best cutomer support</p>
            <p className='text-primary-foreground'>We provide 24/7 customer </p>

        </div>
    </div>
  )
}

export default OurPolicy