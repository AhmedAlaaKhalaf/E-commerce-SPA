import React, { useContext, useEffect, useState } from 'react'
import Style from './Home.module.css'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import RecentProducts from '../RecentProducts/RecentProducts';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
    const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
      setIsLoading(true)
    },[])
  return <>
    <MainSlider/>
    <CategoriesSlider/>
    <RecentProducts/> 
    </>
}
