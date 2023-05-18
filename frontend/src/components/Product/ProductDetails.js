import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import productImage1 from "../images/product1.jpg";
import  Cart  from "../Cart/Cart.js";
import { fetchProductDetails } from '../../redux/productSlice';
import { addItem } from '../../redux/cartSlice';
import MetaData from '../layout/Header/MetaData';
import Rating  from "@mui/material/Rating"
import { Dialog, DialogActions, DialogContent, DialogTitle, Button
 } from '@mui/material'
import { newReview } from '../../redux/reviewSlice';


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  
  useEffect(() => {
    dispatch(fetchProductDetails(match.params.id));

  }, [dispatch, match.params.id]);

  const { loading, error, productDetails: { product } } = useSelector(
    (state) => state.products,
  );
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    if (1 >= quantity) return 
    setQuantity(quantity - 1)
  }
  function handleAddToCart(){
    dispatch(addItem({product, quantity}))
  }
  const submitReviewToggel = () => {
    open ? setOpen(false): setOpen(true)
  }
  const submitReviewHandler = () => {
    const reviewData = {
      productId: match.params.id,
      comment: comment,
      rating: rating
    }
    dispatch(newReview((reviewData)))
    console.log(`this is inside productDetails ${match.params.id},${comment},${rating}`)
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
              <div className="flex items-center">
                  <FaStar
                    className={`text-yellow-500 ${product.ratings >= 1 ? "fill-current" : "hidden"
                      }`} 
                  />
                  <FaStar
                    className={`text-yellow-500 ${product.ratings >= 2 ? "fill-current" : "hidden"
                      }`} 
                  />
                  <FaStar
                    className={`text-yellow-500 ${product.ratings >= 3 ? "fill-current" : "hidden"
                      }`} 
                  />
                  <FaStar
                    className={`text-yellow-500 ${product.ratings >= 4 ? "fill-current" : "hidden"
                      }`} 
                  />
                  <FaStar
                    className={`text-yellow-500 ${product.ratings >= 5 ? "fill-current" : "hidden"
                      }`} 
                  />
                </div>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="mt-4">{product.description}</p>
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Reviews</h2>
                {product.reviews.map((review) => (
                  <div key={review._id} className="mb-4">
                    <div className="flex items-center">
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 1 ? "fill-current" : "hidden"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 2 ? "fill-current" : "hidden"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 3 ? "fill-current" : "hidden"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 4 ? "fill-current" : "hidden"
                          }`}
                      />
                      <FaStar
                        className={`text-yellow-500 ${review.rating >= 5 ? "fill-current" : "hidden"
                          }`}
                      />
                      <span className="ml-2">{review.name}</span>
                    </div>
                    <p className="mt-2">{review.comment}</p>
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
              <Button onClick={submitReviewToggel} variant="contained" color="primary"> Review </Button>
              <Dialog open={open} onClose = {submitReviewToggel}>
                <DialogTitle> Submit Review </DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating 
                    onChange={(e)=> setRating(e.target.value)}
                    value= {rating}
                    size="large"
                  />
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggel}>Cancel</Button>
                  <Button onClick={submitReviewHandler}>Submit</Button>
                </DialogActions>
              </Dialog>
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
