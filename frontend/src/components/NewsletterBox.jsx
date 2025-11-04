import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        


    }
  return (

    <div className='text-center  bg-primary/40 rounded all mt-20'>
        <p className='text-2xl font-medium text-gray-800 pt-10'>
            Subscribe now @ get 20% off

        </p>
        <p className='text-primary-foreground mt-3'>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:1/2 flex items-center gap-3 mx-auto my-6 border pl-4 pr-4 pb-10'>
            <input className='w-full sm:flex-1 outline-none rounded-all' type="email" placeholder='Enter your email ' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox