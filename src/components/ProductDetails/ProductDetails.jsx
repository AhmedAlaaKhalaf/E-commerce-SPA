import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../LoadingScreen/Loading';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let {addProductToCart} = useContext(CartContext);
  const [cartLoading, setCartLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);


  let {id,category} =useParams();
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  async function getProductDetails(id){
      await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((reponse)=> {
        setProductDetails(reponse.data.data);
        setIsLoading(false);
      }).catch((error)=> {
      })
    } 
    async function addProduct(productId) {
      setCurrentProductId(productId)
      setCartLoading(true);
      let response = await addProductToCart(productId); 
      if(response.data.status ==="success") {
        setCartLoading(false);
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

  async function getRelatedProducts(category){
      await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((reponse)=> {
        let allProducts = reponse.data.data; //all products
       let related= allProducts.filter((product)=> product.category.name == category)  
       setRelatedProducts(related);
       setIsLoading(false);
      }).catch((error)=> {
        // console.log(error.data); 
      })
    }  

    function backTopFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; 
    }

    useEffect(()=>{
      getProductDetails(id);
      getRelatedProducts(category);
      setTimeout(()=> {
        backTopFunction();
      },1000)
    },[id,category])
  return <>
  {isLoading ? <Loading/>:<>
    <div className='row productDetailsInner py-5'>
        <div className='col-md-4 col-sm-12'>
        <Slider {...settings}>
        {productDetails?.images.map((image)=><img key={image} className='w-100' src={image}/> )}
    </Slider>
          
        </div>
        <div className='col-md-8 col-sm-12'>
          <h3 className='w-100 text-success text-start mt-4'>{productDetails?.title}</h3>
          <p className='w-100 text-secondary text-start'>{productDetails?.description}</p>
          <div className='d-flex justify-content-between my-4'>
                <h4 className='price text-black'>{productDetails?.price} EGP</h4>
                <h4 className='rating text-black'><i className='fas fa-star text-warning'></i> {productDetails?.ratingsAverage}</h4>
              </div>
            <button onClick={()=> addProduct(id)} className='w-100 cart-btn btn bg-success text-white rounded-3 my-3'><i className="fa-solid fa-cart-shopping px-2"></i>Add To Cart</button>
        </div>
    </div>
    <h1>Related products</h1>
    <div className='row my-5'>
    {relatedProducts.map((product)=>
      <div key={product.id} className='col-lg-2 col-md-4 col-sm-6 p-3'>
            <div className='product-card'>
            <Link to={`/product-details/${product.category.name}/${product.id}`}>
              <img className='w-100' src={product.imageCover} alt={product.title}/>
              <h6 className='text-success fw-lighter my-2'>{product.category.name}</h6>
              <h4 className='mb-3 text-black'>{product .title.split(" ").slice(0,2).join(" ")}</h4>
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
  </>
}
</>
}
