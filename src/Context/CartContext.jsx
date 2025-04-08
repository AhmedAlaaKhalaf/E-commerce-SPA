import axios from "axios";
import {createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const { userLogin } = useContext(UserContext);
    const [cartId, setcartId] = useState(0);
    const [numberItems, setNumberItems] = useState(0);
    
    const getHeaders = () => ({
        token: localStorage.getItem('userToken')
    });

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: getHeaders()
        })
        .then((apiResponse) => { 
            setcartId(apiResponse.data.data._id);
            setNumberItems(apiResponse.data.numOfCartItems);
            return apiResponse;
        })
        .catch((error) => {
            if (error?.response?.status === 401) {
                setNumberItems(0);
                setcartId(0);
            }
            throw error;
        });
    }

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId
        }, {
            headers: getHeaders()
        });
    }

    function updateCartItemCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count
        }, {
            headers: getHeaders()
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
    }

    function deleteCartItem(productId, count) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers: getHeaders()
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
    }

    function checkout(cartId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: formData
        }, {
            headers: getHeaders()
        })
        .then((apiResponse) => apiResponse)  //return response
        .catch((error) => error)  //return error        
    }

    useEffect(() => {
        if (userLogin) {
            getLoggedUserCart().catch(() => {});
        }
    }, [userLogin]);

    return <CartContext.Provider value={{
        getLoggedUserCart, 
        addProductToCart, 
        updateCartItemCount, 
        deleteCartItem, 
        checkout,
        cartId,
        setNumberItems,
        numberItems
    }}>
        {props.children}
    </CartContext.Provider>
}
