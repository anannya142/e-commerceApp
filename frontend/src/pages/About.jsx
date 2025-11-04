import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from  '../components/NewsletterBox';
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2= {'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:mx-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-primary-foreground'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus sollicitudin leo, id vehicula enim. Quisque egestas augue sodales sollicitudin mollis. Integer ac mauris et lectus venenatis rhoncus lacinia finibus tortor. Cras a orci lacus. Morbi bibendum nibh sit amet</p>
            <p>metus pulvinar, sed maximus augue sollicitudin. Phasellus lobortis tellus ac quam pellentesque cursus. Praesent ex velit, tristique non euismod in, pulvinar sed leo. Vestibulum aliquam vestibulum ligula, vulputate facilisis nibh venenatis eu. Integer sed rutrum ipsum, at cursus dolor. Cras vel ligula a enim bibendum cursus at posuere velit.metus pulvinar, sed maximus augue sollicitudin. Phasellus lobortis tellus ac quam pellentesque cursus. Praesent ex velit, tristique non euismod in, pulvinar sed leo. Vestibulum aliquam vestibulum ligula, vulputate facilisis nibh venenatis eu. Integer sed rutrum ipsum, at cursus dolor. Cras vel ligula a enim bibendum cursus at posuere velit.</p>
            <b className='text-gray-900'>Our Misson</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus sollicitudin leo, id vehicula enim. Quisque egestas augue sodales sollicitudin mollis. Integer ac mauris et lectus venenatis rhoncus lacinia finibus tortor. Cras a orci lacus. Morbi bibendum nibh sit ame</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'}  text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-primary-foreground'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus sollicitudin leo, id vehicula enim. Quisque egestas augue sodales sollicitudin mollis. Integer ac mauris et lectus venenatis rhoncus lacinia finibus tortor. Cras a orci lacus. Morbi bibendum nibh sit amet</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Covinience:</b>
          <p className='text-primary-foreground'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus sollicitudin leo, id vehicula enim. Quisque egestas augue sodales sollicitudin mollis. Integer ac mauris et lectus venenatis rhoncus lacinia finibus tortor. Cras a orci lacus. Morbi bibendum nibh sit amet</p>

        </div>
         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-primary-foreground'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempus sollicitudin leo, id vehicula enim. Quisque egestas augue sodales sollicitudin mollis. Integer ac mauris et lectus venenatis rhoncus lacinia finibus tortor. Cras a orci lacus. Morbi bibendum nibh sit amet</p>
        </div>
       
      </div>
       <NewsletterBox/>
    </div>
  )
}

export default About; 