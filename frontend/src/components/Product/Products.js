import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/productSlice';
import ProductCard from '../Home/ProductCard';
import Loader from "../layout/Loader/Loader";
import { Pagination } from './Pagination.js';
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import MetaData from '../layout/Header/MetaData';

const categories = [
  "Laptop",
  'Footwear',
  "PersonalCare",
  "Watch",
  "Attire",
  "Camera",
  "SmartPhones",
]

const Products = ({ match }) => {

  const dispatch = useDispatch()
  const { loading,
          error, 
          products, 
          productsCount,
          filteredProductsCount
        } = useSelector((state) => state.products
  )
  const keyword = match.params.keyword;

  // Category
  const [category, setCategory] = useState("");

  // Price Filter
  const [price, setPrice] = useState([0, 25000])

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  // Pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Ratings
  const [rating, setRating] = useState(0)


  useEffect(() => {
    dispatch(fetchAllProducts({ keyword, currentPage, minPrice: price[0], maxPrice: price[1], category, rating }))
  }, [dispatch, keyword, currentPage, price, category, rating])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- Ecommerce" />        
          <div className="pt-32 bg-white">
            <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
            <h1 className="text-center text-l font-bold text-gray-800">Hello my name is gomak</h1>
            <section className="py-10 bg-gray-100">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products && currentProducts.map((product) => <ProductCard key={product._id} product={product} />)}
              </div>
              <div className="mx-auto max-w-6xl flex items-center justify-start space-x-4 py-4">
                <Typography>Price:</Typography> 
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                  sx={{ width: '100%', maxWidth: 400 }}
                />
                <Typography>Category:</Typography> 
                <ul className='categories'>
                  {categories.map((category)=> (
                    <li 
                        className='category-link'
                        key={category}
                        onClick={()=> setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={rating}
                    onChange={(e, newRating) => {
                      setRating(newRating)
                    }}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </fieldset>
              </div>
            </section>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProductsCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

    </>
  )
}

export default Products
