import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
import { Link, NavLink } from 'react-router-dom';
import googlePlay from '../../assets/googleplay-btn.svg'
import appStore from '../../assets/appstore-btn.svg'

export default function Footer() {
    const [counter, setCounter] = useState(0)
    useEffect(()=>{

    },[])
  return <>
    <div className='row bg-body-tertiary rounded-3 p-4'>
      <div className='about col-md-4'>
        <h3 className='text-success'>About US</h3>
        <p>By powering the future of grocery with our retail partners, we give everyone access to the food they love and more time to enjoy it together.</p>
      </div>
      <div className='links col-md-4'>
        <h3 className='text-success'>Useful Links</h3>
          <ul className='list-unstyled'>
          <li className='footer-list-item'><NavLink className={'text-black text-decoration-none'} to="">Home</NavLink></li>
          <li className='footer-list-item'><NavLink className={'text-black text-decoration-none'} to="products">Products</NavLink></li>
          <li className='footer-list-item'><NavLink className={'text-black text-decoration-none'} to="categories">Categories</NavLink></li>
          <li className='footer-list-item'><NavLink className={'text-black text-decoration-none'} to="brands">Brands</NavLink></li>
          <li className='footer-list-item'><NavLink className={'text-black text-decoration-none'} to="cart">Cart</NavLink></li>
          </ul>
      </div>
      <div className='about col-md-4'>
        <h3 className='text-success'>Get deliveries with FreshCart</h3>
        <Link to={'#'}><img className='p-2' src={googlePlay}></img> </Link>
        <Link to={'#'}><img className='p-2' src={appStore}></img> </Link>
      </div>
      <div className='copyRight w-100 mt-4 py-3 text-black fs-5'>
    ©Copyright 2024 | Fresh Cart | All Rights Reserved.
    </div>
    </div>
    
    </>
}
