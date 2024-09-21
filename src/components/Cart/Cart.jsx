import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import {CartContext} from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Loading from '../LoadingScreen/Loading';



export default function Cart() {
  let { getLoggedUserCart ,updateCartItemCount, deleteCartItem} = useContext(CartContext);
  const [cartDetails ,setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function getCartItems(){
    setIsLoading(false)
    let response = await getLoggedUserCart();
    
    if (response.data.status == "success") {
      setIsLoading(true);
    }
    setCartDetails(response.data.data)
  }
  async function updateCartCount(productId, count){
    let response = await updateCartItemCount(productId, count);
    setCartDetails(response.data.data)
    
  }
  async function deleteItem(productId, count){
    let response = await deleteCartItem(productId, count);
    setCartDetails(response.data.data)
  }

    useEffect(()=>{
      getCartItems();
    },[])
  return <>
    
    {isLoading ? <>
      {cartDetails?.products.length >0 ? 
     <>
      <div className='my-4 container mx-auto d-flex justify-content-center align-items-center'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="table-main">
      <tr>
        <th scope="col" className="h4 py-3">
          Image
        </th>
        <th scope="col" className="h4 py-3">
          Product
        </th>
        <th scope="col" className="h4 py-3">
          Qty
        </th>
      </tr>
    </thead>
    <tbody className='my-3'>
    {cartDetails?.products.map((product)=> 
      <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="w-25">
          <img src={product.product.imageCover} className="w-100" alt={product.product.title} />
        </td>
        <td className="w-25 px-6 py-4">
        <h4>{product.product.title}</h4>
        <p className='text-secondary'>{product.price} EGP</p>
        </td>
        <td className="w-50 px-6 py-4">
          <div className="d-flex align-items-center justify-content-center">
            <button onClick={()=>updateCartCount(product.product.id, product.count -1 )} className="cursor-pointer btn quantity-remove border mx-2 rounded-circle d-inline-flex align-items-center justify-content-center p-1 bg-white" type="button">
              <span className="sr-only">Quantity button</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.5" viewBox="0 0 448 512"><path fill="#000000" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
            </button>
            <div>
              <span>{product.count}</span> 
            </div>
            <button onClick={()=>updateCartCount(product.product.id, product.count +1 )} className="cursor-pointer btn quantity-add border mx-2 rounded-circle d-inline-flex align-items-center justify-content-center p-1 bg-white" type="button">
              <span className="sr-only">Quantity button</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.5" viewBox="0 0 448 512"><path fill="#000000" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
            </button>
          </div>
          <div className='remove mt-2'>
          <span onClick={()=> deleteItem(product.product.id, product.count)} className="font-medium text-success cursor-pointer">Remove</span>
          </div>
        </td>
      </tr>
    )}
    </tbody>
  </table>
  <div className="my-3 table-main d-flex justify-content-between align-items-center py-2 px-4">
      <h2 className='m-0'>Total</h2>
      <h3 className='m-0 text-success'><span>{cartDetails?.totalCartPrice} EGP</span></h3>
    </div>
      <Link to={`/checkout`}><button className='checkout-btn btn-success btn w-25 py-3'>Checkout</button></Link>
      </div>
      </div>
     </>: <>
      <div className='cartAlertContainer d-flex justify-content-center align-items-center'>
      <Alert className='bg-danger text-white my-3 w-100'>
      No Products in your cart
        </Alert>
      </div>
     </>}
    </>: <Loading/>}
     
     </>
}
