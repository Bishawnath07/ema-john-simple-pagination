import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './components/Layout/Home';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import cartProductsLoader from './Loaders/CartProductsLoaders';
import CheakOut from './components/CheakOut/CheakOut';
import SignUp from './components/SignUp/SignUp';
import AuthProvider from './components/AuthProvider/AuthProvider';
import PrivetRoutes from './Routes/PrivetRoutes';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children:[
      {
        path: '/',
        element: <Shop></Shop>
      },
      {
        path: 'order',
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: 'inventory',
        element: <PrivetRoutes><Inventory></Inventory></PrivetRoutes>
      },
      {
        path:'login',
        element: <Login></Login>
      },
      {
        path: 'sign-up',
        element: <SignUp></SignUp>
      },
      {
        path: 'cheakout',
        element: <PrivetRoutes><CheakOut></CheakOut></PrivetRoutes>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
  </React.StrictMode>,
)
