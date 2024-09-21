import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import {CounterContextProvider}  from './Context/CounterContext';
import CartContextProvider  from './Context/CartContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Loading from './components/LoadingScreen/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import BrandDetails from './components/BrandDetails/BrandDetails';



let query = new QueryClient();


let x= createBrowserRouter([
  {
    path:'',element:<Layout/> ,children:[
      {index:true ,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'categories' ,element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'brands' ,element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'about' ,element:<ProtectedRoute><About/></ProtectedRoute>},
      {path:'cart' ,element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'products' ,element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'product-details/:category/:id' ,element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'categories/:category/' ,element:<ProtectedRoute><CategoryDetails/></ProtectedRoute>},
      {path:'brands/:brand/' ,element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
      {path:'login' ,element:<Login/>},
      {path:'register' ,element:<Register/>},
      {path:'checkout' ,element:<Checkout/>},
      {path:'allorders' ,element:<Allorders/>},
      {path:'*' ,element:<Notfound/>}
    ]
  }
])

function App() {
  const [count, setCount] = useState(0);

  return <>
  <QueryClientProvider client={query}>
  <UserContextProvider>
      <CounterContextProvider>
        <CartContextProvider>
           <RouterProvider router={x}></RouterProvider>
           <Toaster/>
        </CartContextProvider>
      </CounterContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
  </>
}

export default App
