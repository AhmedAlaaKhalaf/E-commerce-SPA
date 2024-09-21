import Form from 'react-bootstrap/Form';
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yubObject from 'yup';
import Alert  from 'react-bootstrap/Alert';
import Style from './Register.module.css';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  const [apiError ,setApiError] = useState('');
  const [isLoading ,setIsLoading] = useState(false);
  let {setUserLogin} = useContext(UserContext)

  let schema = yubObject.object().shape({
    name:yubObject.string().min(3,"min length is 3").max(10,"max length is 10").required('name is required'),
    email:yubObject.string().email("invalid email").required("email is required"),
    phone:yubObject.string().matches (/^01[0125][0-9]{8}$/,"phone must be a valid egyptian number"),
    password:yubObject.string().matches (/^[A-Za-z0-9]{6,10}$/,"password must be at least 6 numbers or characters"),
    rePassword:yubObject.string().oneOf([yubObject.ref("password")],"error in password match").required(),
  })
  let navigate = useNavigate()
   function handleRegister(formValues) {
    setIsLoading(true);
    let response= axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formValues)
     .then((apiResponse) => {
      setIsLoading(false);
      if (apiResponse.data.message === 'success') {
        localStorage.setItem('userToken',apiResponse.data.token);
        setUserLogin(apiResponse.data.token);
        navigate('/')
      }
      console.log(apiResponse);
    }).catch((apiResponse) => {
      setIsLoading(false);
      setApiError(apiResponse?.response?.data?.message);
      console.log(apiResponse?.response?.data?.message);   
    })
    console.log(response);
    
   
  }
  let formik = useFormik({
    initialValues: {
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema:schema,
    onSubmit:handleRegister
  })
    useEffect(()=>{
    },[])
  return <>

 <div className='my-5 mx-auto'>
 {apiError? <Alert className='bg-danger text-white'>
      {apiError}
        </Alert>:null}
 </div>

  <div className='formTitle'>
  <h2 className='text-success'>Register Now</h2>
  </div>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='name'>Name</Form.Label>
        <Form.Control htmlFor='name' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.name} name="name" placeholder="Enter Your Name" />
      </Form.Group>
      <div>
      {formik.errors.name && formik.touched.name ? <Alert className='bg-danger text-white'>
      {formik.errors.name}
        </Alert>:null}
      
      </div>
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='email'>Email</Form.Label>
        <Form.Control htmlFor='email' onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" value={formik.values.email} name="email" placeholder="Enter Your Email" />
      </Form.Group>
      {formik.errors.email && formik.touched.email ? <Alert className='bg-danger text-white'>
      {formik.errors.email}
        </Alert>:null}
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='phone'>Phone</Form.Label>
        <Form.Control htmlFor='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" value={formik.values.phone} name="phone" placeholder="Enter Your phone" />
      </Form.Group>
      {formik.errors.phone && formik.touched.phone ? <Alert className='bg-danger text-white'>
      {formik.errors.phone}
        </Alert>:null}
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='password'>Password</Form.Label>
        <Form.Control htmlFor='password' onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.password} name="password" placeholder="Enter Your password" />
      </Form.Group>
      {formik.errors.password && formik.touched.password ? <Alert className='bg-danger text-white'>
      {formik.errors.password}
        </Alert>:null}
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='rePassword'>Re-Password</Form.Label>
        <Form.Control htmlFor='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.rePassword} name="rePassword" placeholder="Enter Your Re-Password" />
      </Form.Group>
      {formik.errors.rePassword && formik.touched.rePassword ? <Alert className='bg-danger text-white'>
      {formik.errors.rePassword}
        </Alert>:null}

    <button type='submit' className='my-3 bg-success rounded'>
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'submit'}
    </button>
    </Form>
    </>
}

