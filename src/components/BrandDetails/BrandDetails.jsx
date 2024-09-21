import React, { useContext, useEffect, useState } from 'react'
import Style from './BrandDetails.module.css'
import axios from 'axios';
import Loading from '../LoadingScreen/Loading';
import { CartContext } from '../../Context/CartContext';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Alert } from 'react-bootstrap';


export default function BrandDetails() {
  const [brandProducts, setBrandProducts] = useState([]);
  let {addProductToCart} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);

  let {brand} = useParams()


  async function getBrandProducts(brand){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((reponse)=> {
      let allProducts = reponse.data.data; //all products
     let brandFilteredProducts = allProducts.filter((product)=> product.brand.name == brand)  
     setBrandProducts(brandFilteredProducts);
     setIsLoading(false);
     
    }).catch((error)=> {
      // console.log(error.data); 
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

  useEffect(()=> {
    getBrandProducts(brand)
  })
    
  return <>
  {isLoading? <Loading/>: <>
  {brandProducts.length >0 ? 
  <>
  <div className='brandDetailsProducts my-5'>
      <h1 className='text-success'>{brand} products</h1>
    <div className='row'>
    {brandProducts.map((product)=>
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
    </div>
    </>
    :<>
      <div className='emptyAlertContainer d-flex justify-content-center align-items-center'>
      <Alert className='bg-danger text-white my-3 w-100'>
      No Products in this category
        </Alert>
      </div>
     </>}
     </>
  }
  </>
}