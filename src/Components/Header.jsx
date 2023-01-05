import React from "react";
import { motion } from "framer-motion";
import logo from '../assets/img/logo.png'
import avatar from '../assets/img/avatar.png'

import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md'
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'
import { useSateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";

const Header = () => {
  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const [{ user,cartShow ,cartItem ,cartItems}, dispatch] = useSateValue()


  const logOut = () => {
    setIsMenu(false)
    localStorage.clear()
    dispatch({
      type: actionType.SET_USER,
      user: null,
    })

  }
  const showCart =()=>{
     dispatch({
      type: actionType.SET_CART_SHOW,
        cartShow: true,
    })
  }

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    } else {
      setIsMenu(!isMenu)
    }
  }

  const [isMenu, setIsMenu] = useState(false)


  return <div className="bg-blue-400">

    <div className="fixed z-30 w-screen p-6 px-16 bg-slate-50">
      {/* Desktop and tablet mode here */}
      <div className="hidden md:flex w-full h-full justify-between">
        <Link to={'/'} className="flex item-cent gap-2">
          <img src={logo} alt="" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold ">Our Food</p>
        </Link>
        <div className="flex  items-center gap-8">
          <ul className="flex items-center gap-8 ">
            <li className="text-base text-textColor font-semibold hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor font-semibold hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor font-semibold hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor font-semibold hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </ul>
          <motion.div whileTap={{ scale: 0.6 }} 
          onClick={showCart}
          className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
           {cartItems && cartItems.length > 0 && ( <div className="absolute -top-3 -right-0 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">{cartItems.length}</p>
            </div>)}
          </motion.div>
          <div className="relative"><motion.img
            onClick={login}
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar} alt="" className="w-8 shadow-xl cursor-pointer rounded-full" />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}

                className="w-40 bg-gray-50 shadow-xl rounded-lg flex  flex-col absolute top-10 -right-10 ">
                {user && user.email === 'agyekumebenezer2001@gmail.com' && (
                  <Link to='/createItem'>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all ease-in-out text-textColor text-base">New Item <MdAdd /></p>
                  </Link>
                )}
                <p onClick={logOut} className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all ease-in-out text-textColor text-base">Logout <MdLogout /></p>
              </motion.div>)}

          </div>

        </div>

      </div>
      <div className="flex md:hidden w-full h-full"></div>
    </div>


  </div>;
};
export default Header;