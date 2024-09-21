import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from "react-slick";
import sliderImage1 from '../../assets/main-slider-img.jpg';
import sliderImage2 from '../../assets/main-slider-img2.jpg';
import bannerImage1 from '../../assets/slider2.jpg';
import bannerImage2 from '../../assets/slider4.jpg';

export default function MainSlider() {
    const [counter, setCounter] = useState(0);
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };
    useEffect(()=>{

    },[])
  return <>
    <div className='row my-5'>
    <div className='sliderContainer mobileBanner'>
    <Slider {...settings}>
      <img className='w-100 slider-img' src={sliderImage1}/>
      <img className='w-100 slider-img' src={sliderImage2}/>
    </Slider>
    </div>
    <div className='bannersContainer d-flex flex-column gap-3 mobileBanner'>
      <div className='topBanner'>
        <img className='w-100 banner-img' src={bannerImage1}/>
      </div>
      <div className='bottomBanner'>
      <img className='w-100 banner-img' src={bannerImage2}/>
      </div>
    </div>
    </div>
  </>
}
