import React, {useEffect} from 'react';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import MetaData from '../layout/Header/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/productSlice';
import ProductCard from './ProductCard';
import Loader from "../layout/Loader/Loader";

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400';

const Home = () => {

    const dispatch = useDispatch();
    const {loading, error, products } = useSelector(
        (state)=> state.products
    );


    useEffect(() => {        
        dispatch(fetchAllProducts())
    }, [dispatch])
    
    return (
      <>
        {loading ? (
            <Loader />
        ) : (
            <>
                <MetaData title="Ecommerce" />
                <ProductHeroLayout
                    sxBackground={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundColor: "#7fc7d9", // Average color of the background image.
                        backgroundPosition: "center",
                    }}
                >
                    {/* Increase the network loading priority of the background image. */}
                    <img
                        style={{ display: "none" }}
                        src={backgroundImage}
                        alt="increase priority"
                    />
                    <Typography
                        color="inherit"
                        align="center"
                        variant="h2"
                        marked="center"
                    >
                        Upgrade your Sundays
                    </Typography>
                    <Typography
                        color="inherit"
                        align="center"
                        variant="h5"
                        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
                    >
                        Enjoy secret offers up to -70% off the best luxury hotels every
                        Sunday.
                    </Typography>
                    <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        component="a"
                        href="/premium-themes/onepirate/sign-up/"
                        sx={{ minWidth: 200 }}
                    >
                        Register
                    </Button>
                    <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                        Discover the experience
                    </Typography>
                </ProductHeroLayout>
        
        <div className="pt-32 bg-white">
            <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
            <h1 className="text-center text-l font-bold text-gray-800">hello my name is gomak</h1>
            <section className="py-10 bg-gray-100">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products && products.map((product)=> <ProductCard product = {product} />)}      
                    </div>
            </section>
        </div>
        </>
        )}
      </>

    );
}

export default Home;
