import React, { useContext, useEffect, useState } from 'react'
import Style from './CategoryDetails.module.css'
import axios from 'axios';
import Loading from '../LoadingScreen/Loading';
import { CartContext } from '../../Context/CartContext';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function CategoryDetails() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  let {addProductToCart} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);

  let {category} = useParams()


  async function getCategoryProducts(category){
    await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((reponse)=> {
      let allProducts = reponse.data.data; //all products
     let categoryFilteredProducts = allProducts.filter((product)=> product.category.name == category)  
     setCategoryProducts(categoryFilteredProducts);
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
    getCategoryProducts(category)
  })
    
  return <>
  {isLoading? <Loading/>:<div className='categoryDetailsProducts my-5'>
      <h1 className='text-success'>{category} products</h1>
    <div className='row'>
    {categoryProducts.map((product)=>
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
    </div>}
    </>
}
