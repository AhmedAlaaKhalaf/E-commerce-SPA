import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert  from 'react-bootstrap/Alert';
import Register from '../Register/Register';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';


export default function checkout() {

  let {checkout}= useContext(CartContext)
  let {cartId}= useContext(CartContext)

  let formik = useFormik({
    initialValues: {
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:()=> handleCheckout(cartId, `http://localhost:5173`)
  }); 

 async function handleCheckout(cartId, url) {
   let {data} =await checkout(cartId, url , formik.values);
   
   console.log(data.session.url);
   window.location = data.session.url;
   
  }
    
  return <>

  <div className='formTitle my-3'>
  <h2 className='text-success'>Checkout Now</h2>
  </div>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='details'>details</Form.Label>
        <Form.Control htmlFor='details' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.details} name="details" placeholder="Enter Your details" />
      </Form.Group>

      {/* {formik.errors.details && formik.touched.details ? <Alert className='bg-danger text-white'>
      {formik.errors.details}
        </Alert>:null} */}

      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='phone'>phone</Form.Label>
        <Form.Control htmlFor='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" value={formik.values.phone} name="phone" placeholder="Enter Your phone" />
      </Form.Group>

      {/* {formik.errors.phone && formik.touched.phone ? <Alert className='bg-danger text-white'>
      {formik.errors.phone}
        </Alert>:null} */}

        <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='city'>city</Form.Label>
        <Form.Control htmlFor='city' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.city} name="city" placeholder="Enter Your city" />
      </Form.Group>

        <div className='d-flex gap-4 align-items-center'>
        <button type='submit' className='my-3 bg-success rounded'>
           Checkout
        </button>
        </div>
    </Form>
    </>
}

