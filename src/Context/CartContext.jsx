import axios from "axios";
import {createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken'),
      } 
      const [cartId, setcartId] = useState(0);
      

    function getLoggedUserCart() {
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{
            headers: headers
        })
        .then((apiResponse) =>{ 
            setcartId(apiResponse.data.data._id)
           return apiResponse 
        })  //return response
        .catch((error) => error)  //return error        
        }
    function addProductToCart(productId) {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId: productId
       } ,{
            headers: headers
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
        }
    function updateCartItemCount(productId,count) {
       return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count: count
       } ,{
            headers: headers
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
        }
    function deleteCartItem(productId,count) {
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers: headers
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
        }
    function checkout(cartId, url, formData) {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress: formData
        }, {
            headers: headers
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
        }

        useEffect(()=> {
            getLoggedUserCart()
        },[])

        return <CartContext.Provider value={{getLoggedUserCart, addProductToCart, updateCartItemCount, deleteCartItem, checkout,cartId}}>
        {props.children}
    </CartContext.Provider>
        }
