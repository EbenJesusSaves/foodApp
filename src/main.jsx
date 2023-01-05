import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ErrorPage from './Components/ErrorPage'
import { BrowserRouter } from "react-router-dom";
import {StateProvider} from './context/StateProvider'
import {initialState} from './context/intialState'
import reducer from './context/reducer'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
// } from "react-router-dom";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     errorElement :<ErrorPage/>,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <StateProvider initialState={initialState} reducer ={reducer}>
    <App/>
    </StateProvider>
    </BrowserRouter>
    {/* <RouterProvider router={router} /> */}
    
  </React.StrictMode>
)
