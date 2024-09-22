import React, { useContext, useEffect, useState } from 'react'
import Style from './RecentProducts.module.css'
import axios from 'axios'
import Products from '../Products/Products';
import { Link } from 'react-router-dom';
import Loading from '../LoadingScreen/Loading';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
 

export default function RecentProducts() {
  const [cartLoading, setCartLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);
  let {setNumberItems,numberItems} = useContext(CartContext);

  function getRecent(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    async function addProduct(productId) {
      setCurrentProductId(productId)
      setCartLoading(true);
      let response = await addProductToCart(productId);       
      if(response.data.status ==="success") {
        setCartLoading(false);
        setNumberItems(numberItems+1);
        toast.success(response.data.message ,{
          style:{padding:20}
        })
      }
      else {
        toast.error(response.data.message ,{
          style:{padding:20}
        })
      }
    }

    let {addProductToCart} = useContext(CartContext);
    // use query return an object with all info. of the api response
let {data ,isError, error,isLoading, isFetching} = useQuery({
  queryKey:['recentProducts'],
  queryFn:getRecent,
  refetchInterval:120000,
  refetchIntervalInBackground:true
})


  if (isLoading) {
  return <Loading/>
  }

  return <>
   <div className='mt-3 recentProductsContainer '>
   <h1>Shop All Products</h1>
    <div className='row'>
       {data?.data.data.map((product) =>
        <div key={product.id} className='col-lg-2 col-md-4 col-sm-6 px-3'>
            <div className='product-card'>
            <Link to={`/product-details/${product.category.name}/${product.id}`}>
              <img className='w-100' src={product.imageCover} alt={product.title}/>
              <h6 className='text-success fw-lighter my-2'>{product.category.name}</h6>
              <h4 className='mb-3 text-black'>{product?.title?.split(" ").slice(0,2).join(" ")}</h4>
              <div className='d-flex justify-content-between'>
                <span className='price text-black'>{product.price} EGP</span>
                <span className='rating text-black'><i className='fas fa-star text-warning'></i> {product.ratingsAverage}</span>
              </div>
              </Link>
            <button onClick={()=> addProduct(product.id)} className='w-100 cart-btn btn bg-success text-white rounded-3 my-3'>
            {currentProductId == product.id && cartLoading ? <i className='fas fa-spinner fa-spin'></i>: <><i className="fa-solid fa-cart-shopping px-2"></i> Add To Cart</>}
           </button>
            </div>
        </div>
       )}
    </div>
   </div>
   </>
}
