import React , {useContext, useState} from 'react';

import {assets} from '../assets/assets';
import { NavLink,Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible,setVisible] = useState(false);

  const {setShowSearch,getCartCount, navigate, token, setToken,setCartItems} = useContext(ShopContext);
  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token' )
    setToken('')
    setCartItems({})
   

  }
  return (
    <div>

    {/* HOME ,COLLECTION,ABOUT,CONTACT MENU */}
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'> <img src={assets.logo} className='w-36' alt=''/></Link>
       
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p className='font-bold text-xl'>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'hidden/>

            </NavLink>
                  <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p  className='font-bold text-xl'>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'hidden/>

            </NavLink>
                  <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p  className='font-bold text-xl'>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'hidden/>

            </NavLink>
                  <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p  className='font-bold text-xl'>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700'hidden/>

            </NavLink>
            
        </ul>
        <div className='flex items-center gap-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt=""/>
        </div>
        <div className='group relative z-50'>
          <Link to='/login'>
          <img onClick= {()=>{token ? null : navigate('/login')}}src={assets.profile_icon} className='w-5 cursor-pointer' alt=""/></Link>
           {/* dropdown menu MY PROFILE,ORDERS,LOGOUT */}
           {token &&   <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              {/*------- MY PROFILE -------------*/}
              <p onClick = {()=>navigate('/profile')}className='cursor-pointer hover:text-black'>
                My Profile
              </p>

              {/* ORDERS */}
              <p onClick = {()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>


              {/* LOGOUT */}
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>
        <Link to='/cart' className= 'relative'>
           <img src= {assets.cart_icon} className='w-5 min-w-5' alt=""/>
           <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center loading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>
        </Link>
        <img  onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden alt="'/>
    </div>
    {/* sidebar  */}
     {/* <div className={`fixed top-0 right-0 bottom-0 sm-hidden bg-white transition-all z-[9999] ${visible ? 'w-full' : 'w-0'}`}>
       <div className=' flex  flex-col text-gray-600'>
        <div onClick={()=>setVisible(false)} className='flex item-center gap-4 p-3  cursor-pointer'>
          <img className='h-4 rotate-180' src={assets.dropdown_icon}  alt=""/>
          <p>Back</p>
        

        </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/contact'>CONTACT</NavLink>

       </div>
    </div> */}
    <div
      className={`fixed inset-y-0 right-0 z-[9999] pointer-events-none sm:hidden`}
      aria-hidden={!visible}
    > 
    
       <div
        className={`h-full bg-white shadow-lg overflow-auto transition-transform duration-300 ease-in-out
                    ${visible ? 'translate-x-0 pointer-events-auto w-full max-w-xs' : 'translate-x-full pointer-events-none w-0'}`}
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer border-b"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-6 border-b" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div> 
     </div> 
    </div>

  )
}

export default Navbar;