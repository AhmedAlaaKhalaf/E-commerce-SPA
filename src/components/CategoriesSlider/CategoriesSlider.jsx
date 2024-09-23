import React, { useEffect, useState } from 'react'
import Style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';



export default function CategoriesSlider() {

    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow:6,
      slidesToScroll: 3,
      autoplay:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
    function getcategories(){
      return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    // use query return an object with all info. of the api response
  let {data ,isError, error,isLoading, isFetching} = useQuery({
  queryKey:['categories'],
  queryFn:getcategories,
  refetchInterval:60000,
  refetchIntervalInBackground:true
})
console.log(data);


  return <>
      <div className='mb-5 categoriesContainer'>
    <h1>Shop By Category</h1>
    <Slider {...settings}>
        {data?.data.data.map((category)=>
          <Link to={`/categories/${category.name}`}>
        <div key={category?._id} className='categoryContainer'>
        <img className='w-100 category-img p-1' src={category.image}/>
        <h3 className='text-success pb-4'>{category.name}</h3>
        </div>
        </Link>
         )}
    </Slider>
    </div>
  </>
}
