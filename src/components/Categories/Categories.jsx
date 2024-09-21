import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../LoadingScreen/Loading';
import { Link } from 'react-router-dom';




export default function Categories() {

  function getcategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  // use query return an object with all info. of the api response
let {data ,isError, error,isLoading, isFetching} = useQuery({
queryKey:['categories'],
queryFn:getcategories,
refetchInterval:120000,
refetchIntervalInBackground:true
})
// console.log(data);

  return <>
    {isLoading ? <Loading/> :
    <>
    <div className='mt-3 recentProductsContainer '>
    <h1>Shop By Category</h1>
    <div className='row'>
        {data?.data.data.map((category) =>
        <div key={category._id} className='col-lg-3 col-md-4 col-sm-6 px-3'>
        <Link to={`/categories/${category.name}`}>
             <div className='category-card cursor-pointer'>
             <img className='w-100 category-img p-1' src={category.image}/>
             <h3 className='text-success mt-3'>{category.name}</h3>
             </div>
             </Link>
         </div>
        )}
     </div>
    </div>
    </>
    }
    </>
}
