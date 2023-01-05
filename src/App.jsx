import { useState , useEffect } from 'react'
import * as React from "react";

import { CreateContainer, Header, MainContainer,  } from './Components'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import {AnimatePresence} from 'framer-motion'
import { useSateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';


function App() {
  
const [{foodItems}, dispatch] = useSateValue()

const fetchData = async () =>{
  await getAllFoodItems().then((data)=>{
    
    dispatch({
      type : actionType.SET_FOOD_ITEMS,
      foodItems: data
    })
  })
}

useEffect (()=>{
  fetchData();
}, [])

  return ( 
       <AnimatePresence>
    <div className="App w-screen h-auto flex flex-col bg-primary ">
    <Header/>
     
   <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
   
    <Routes>
      <Route path="/*" element={<MainContainer/>} />
      <Route path="/createItem" element={<CreateContainer/>} />
    </Routes>
   </main>
    </div>
   </AnimatePresence>
 
 
  )
}

export default App
