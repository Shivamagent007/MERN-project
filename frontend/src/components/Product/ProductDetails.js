import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import productImage1 from "../images/product1.jpg";
import  Cart  from "../Product/Cart.js";
import { fetchProductDetails } from '../../redux/productSlice';
import { addItem } from '../../redux/cartSlice';
import MetaData from '../layout/Header/MetaData';


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  

  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));

  }, [dispatch, match.params.id]);

  const { loading, error, productDetails: { product } } = useSelector(
    (state) => state.products,
  );

  const increaseQuantity = () => {
    // if (product.Stock <= quantity) return 
    console.log(product)

    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    if (1 >= quantity) return 
    console.log(product)
    setQuantity(quantity - 1)
  }
  function handleAddToCart(){
      dispatch(addItem({product, quantity}))
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : product ? (
      <>
        <MetaData title={`${product.name} -- Ecommerce`}/>        
        <div className="container mx-auto mt-4 py-10">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-2/3">
              <Carousel showThumbs={false} showStatus={false}>
                <div>
                  <img src={productImage1} alt="Product Image 1" />
                </div>
                <div>
                  <img src={productImage1} alt="Product Image 2" />
                </div>
                <div>
                  <img src={productImage1} alt="Product Image 3" />
                </div>
                <div>
                  <img src={productImage1} alt="Product Image 4" />
                </div>
              </Carousel>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-4">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="mt-4">{product.description}</p>
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Reviews</h2>
                {product.reviews.map((review) => (
                  <div key={review.id} className="mb-4">
                    <div className="flex items-center">
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 1 ? "fill-current" : "stroke-current"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 2 ? "fill-current" : "stroke-current"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 3 ? "fill-current" : "stroke-current"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 4 ? "fill-current" : "stroke-current"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 5 ? "fill-current" : "stroke-current"
                          }`}
                      />
                      <span className="ml-2">{review.author}</span>
                    </div>
                    <p className="mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-left items-center mt-4 mb-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={decreaseQuantity}>
                  -
                </button>
                <input className="form-input border border-gray-300 rounded-md shadow-sm mx-2 w-16 text-center" type="text" value={quantity} readOnly></input>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add to Cart
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                        Buy Now
              </button>
              
            </div>
          </div>
          < Cart />
        </div>
      </>  
      ) : null}
    </>
  );
};


export default ProductDetails;
