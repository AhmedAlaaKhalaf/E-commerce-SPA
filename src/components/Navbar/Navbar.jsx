import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';


export default function CollapsibleNavbar() {

let {getCounter} = useContext(CounterContext);
let {userLogin,setUserLogin} = useContext(UserContext);
let navigate = useNavigate();
const [cartLength, setCartLength] = useState(0);


  function logOut () {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  }
  async function getCartLength(){
    let response = await getCounter();
    console.log(response);
    setCartLength(response?.data.data.products.length)
  }

  useEffect(()=>{
    getCartLength() 
  },[cartLength])

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary px-5 py-3 rounded-5">
        <Navbar.Brand href="/"><i className='fa-solid fa-cart-shopping nav-icon mx-1 text-success'></i><span>fresh cart</span></Navbar.Brand>
        <Navbar.Toggle className='border-0 text-success' aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-between gap-4'>
          <Nav className="me-auto gap-3 fs-5">
          {userLogin !== null ? 
          <> <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none'} to="">Home</NavLink></li> 
              <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none'} to="categories">Categories</NavLink></li>
              <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none'} to="brands">Brands</NavLink></li>
              <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none'} to="products">Products</NavLink></li>
           </>:null}
          </Nav>
          <Nav className="gap-3 fs-5 align-items-center"> 
          {userLogin !== null ? <>
            <li onClick={logOut} className='nav-list-item'><span className={'text-secondary text-decoration-none cursor-pointer'}>LogOut</span></li> 
          <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none text-capitalize'} to="cart">Cart</NavLink> <span className='bg-success text-white rounded-circle px-2 py-1'>{cartLength}</span></li> 
          <li className='nav-list-item'><p className={'text-secondary text-decoration-none m-0'}>Hello</p></li> 
          </>: <>
          <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none'} to="login">Login</NavLink></li> 
          <li className='nav-list-item'><NavLink className={'text-secondary text-decoration-none'} to="register">Register</NavLink></li>
          </>}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

