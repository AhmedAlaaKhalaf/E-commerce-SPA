import Form from 'react-bootstrap/Form';
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yubObject from 'yup';
import Alert  from 'react-bootstrap/Alert';
import Style from './Login.module.css';
import Register from '../Register/Register';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
  const [apiError ,setApiError] = useState('');
  const [isLoading ,setIsLoading] = useState(false);

  let{setUserLogin} = useContext(UserContext);
  
  let schema = yubObject.object().shape({
    email:yubObject.string().email("invalid email").required("email is required"),
    password:yubObject.string().matches (/^[A-Za-z0-9]{6,10}$/,"password must be at least 6 numbers or characters"),
  })

  let navigate = useNavigate()
   function handleLogin(formValues) {
    setIsLoading(true);
    let response= axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formValues)
     .then((apiResponse) => {
      setIsLoading(false);
      if (apiResponse.data.message === 'success') {
        localStorage.setItem('userToken',apiResponse.data.token);
        setUserLogin(apiResponse.data.token);
        navigate('/')
      }
    }).catch((apiResponse) => {
      setIsLoading(false);
      setApiError(apiResponse?.response?.data?.message);
      console.log(apiResponse?.response?.data?.message);   
    })
    console.log(response);
    
    // if (response.data.message === 'success') {
    //   navigate('/')
    // }
  }
  let formik = useFormik({
    initialValues: {
      email:'',
      password:'',
    },
    validationSchema:schema,
    onSubmit:handleLogin
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
  <h2 className='text-success'>Login Now</h2>
  </div>
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='email'>Email</Form.Label>
        <Form.Control htmlFor='email' onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" value={formik.values.email} name="email" placeholder="Enter Your Email" />
      </Form.Group>
      {formik.errors.email && formik.touched.email ? <Alert className='bg-danger text-white'>
      {formik.errors.email}
        </Alert>:null}
      <Form.Group className="text-start mb-3">
        <Form.Label className='px-2' id='password'>Password</Form.Label>
        <Form.Control htmlFor='password' onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" value={formik.values.password} name="password" placeholder="Enter Your password" />
      </Form.Group>
      {formik.errors.password && formik.touched.password ? <Alert className='bg-danger text-white'>
      {formik.errors.password}
        </Alert>:null}

        <div className='d-flex gap-4 align-items-center'>
        <button type='submit' className='my-3 bg-success rounded'>
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Login'}
        </button>
        <p className='pt-3'>Didn't have an account yet? <span><Link to={'/Register'} className='text-success'>Register Now</Link></span></p>
        </div>
    </Form>
    </>
}

