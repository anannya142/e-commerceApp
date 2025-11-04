import React from 'react'
import {FaStar,FaStarHalfAlt,FaRegStar} from 'react-icons/fa';




const Rating = ({value}) => {
    const starClass = "text-orange-600 hover:text-orange-500 focus:text-orange-500 transition-colors  text-2xl"; // yellow color
  return (
    <>

         <div className='rating flex flex-row '>
        <span className={starClass}>
        
            {value>= 1?<FaStar/>: value>=.5?<FaStarHalfAlt/>:
             <FaRegStar/>}
        </span>
        <span  className={starClass}>
            {value>= 2?<FaStar/>: value>=1.5?<FaStarHalfAlt/>:
            <FaRegStar/>}
        </span>
        <span className={starClass}>
            {value>= 3?<FaStar/>: value>=2.5?<FaStarHalfAlt/>:
            <FaRegStar/>}
        </span>
        <span className={starClass}>
            {value>= 4?<FaStar/>: value>=3.5?<FaStarHalfAlt/>:
            <FaRegStar/>}
        </span>
        <span className={starClass}>
            {value>= 5?<FaStar/>: value>=4.5?<FaStarHalfAlt/>:
            <FaRegStar/>}
        </span>

    </div>
    </>
  )
}

export default Rating