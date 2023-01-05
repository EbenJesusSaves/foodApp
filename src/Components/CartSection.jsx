import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill} from 'react-icons/ri'
import CartItem from './cartItem'
import { motion } from 'framer-motion'
import EmptyCart from '../assets/img/emptyCart.svg'
import { useState, useEffect } from 'react'

import { useSateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";





const CartSection = () => {
const [{ user,cartShow, cartItems }, dispatch] = useSateValue()
const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const hideCart =()=>{
     dispatch({
      type: actionType.SET_CART_SHOW,
        cartShow: false,
    })
  }

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

     
  return (
    <motion.div
    
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    className=' fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md  flex flex-col z-[200]'>
        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
          
          <motion.div 
          onClick={hideCart}
          whileTap={{scale:0.75}} className="">
                <MdOutlineKeyboardBackspace
                 className='text-textColor text-3xl drop-shadow-md'
                 />
             </motion.div>
             <p className="text-lg font-semibold text-textColor">Cart</p>
             <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      
        </div>
          {/* button section */}
     {cartItems && cartItems.length > 0 ?  <div className="w-full bg-cartColorBg h-full rounded-t-[2rem]">
      <div  className="w-full h-510 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
     {cartItems && cartItems.map((item)=>(
     <CartItem
     key={item.id}
    item={item}
     setFlag={setFlag}
      flag={flag}
     
     />
     
     ))}  
        
      </div>
      {/* cart total */}
       <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
        <div className="w-full flex items-center py-6 justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center py-6  justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>
             <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center py-6  justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>{user ? (
             <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>):(
                
             <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Log In to Check out
              </motion.button>
              )}
       </div>

        </div> : <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>}
    </motion.div>
  )
}

export default CartSection