import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import {motion }from 'framer-motion'
import { useRef } from 'react'
import { useEffect } from 'react'
  import notFound from '../assets/img/NotFound.svg'
import { useSateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { useState } from 'react'

const rowContainer = ({flag, data, scrollValue}) => {
  const rowContainer = useRef()

  const [{cartItems }, dispatch] = useSateValue()

const [items, setItems] = useState([])

const addToCart = ()=>{
  dispatch({
    type : actionType.SET_CART_ITEMS,
    cartItems : items
  })
    localStorage.setItem('cartItems', JSON.stringify(items))
}
 
     useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  },[scrollValue]);


  useEffect(()=>{
    addToCart()
  }, [items])


  return (
<div 
ref={rowContainer}
className={`w-full flex items-center gap-3  my-12 scroll-smooth ${flag? 'overflow-x-scroll scrollbar-none ': 'overflow-x-hidden flex-wrap justify-center'}  `} >
  {data &&data.length > 0 ? data.map(data =>(
       <motion.div  key={data.id}
    whileHover={{scale:1.1}}
    // transition={{duration:0.9}}
    className="w-300 md:w-225 my-12 min-w-[275px]  md:min-w-[300px] h-auto  flex flex-col items-center justify-evenly relative shadow-md backdrop-blur-lg p-2 rounded-lg">

 <div className="w-full flex items-center justify-between ">
        <motion.img 
        whileHover={{scale:1.1}}
        transition={{duration:0.8}}
        src={data.imgeURL}
         alt="" className='w-40  h-40 -mt-8' />
         <motion.div 
          onClick={() => setItems([...cartItems, data])}
        //  onClick={()=>addToCart(data)}
         whileTap={{scale:0.7}} className="w-8 h-8 rounded-full bg-red-600 flex justify-center cursor-pointer hover:shadow-lg items-center">
            <MdShoppingBasket className='text-white text-lg'/>
         </motion.div>
    </div>
    <div className="w-full flex items-end justify-end flex-col">
        <p className="md:text-lg text-base text-textColor font-semibold">{data.title}</p>
        <p className='mt-1 text-sm text-gray-500 ' > 
        {data.calories}  calories
        </p>
        <div className="flex gap-8 items-center">
          <p className='text-lg text-textColor font-semibold'><span className='text-sm text-red-500 '>$ </span>{data.price}</p>  
        </div>
    </div>
    </motion.div>
   
 )):
 <div className="w-full items-center flex-col  flex justify-center">
   <img 
      src={notFound}
      className='h-420 mb-10'
      />
      <p className='text-xl text-headingColor font-semibold'>No Data available for this category😒😒😒😒</p>
 </div>
 
     }
    </div>
  )
}

export default rowContainer