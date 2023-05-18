import React from 'react';
import { Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { getAdminProduct } from '../../redux/productSlice';

const ProductList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAdminProduct())
    }, [dispatch])

    const { loading,
        products, 
        productsCount,
      } = useSelector((state) => state.products
)
    return (
        <div className="bg-gray-100 mt-50">
            <TableContainer component={Paper} className="">
                <Table className="">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Stock</TableCell>
                            <TableCell align="right">Category</TableCell>
                        </TableRow>
                    </TableHead>
                    {products.length ? (
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell align="right">{product.price}</TableCell>
                                    <TableCell align="right">{product.stock}</TableCell>
                                    <TableCell align="right">{product.category}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No products to display. Please add products.
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductList;