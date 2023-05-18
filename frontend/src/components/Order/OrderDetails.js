import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderDetails } from '../../redux/orderSlice';


const OrderDetails = ({ match }) => {
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(orderDetails(match.params.id))
    },[ match.params.id])
    const { order } = useSelector((state) => state.orders);
    // console.log(order.order.shippingInfo)
  

  return (
    <div className="bg-gray-100 min-h-screen py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        {order ?  (
            <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Order ID: {order._id}</h2>
                <div className="text-gray-500">Order Date: {new Date(order.order.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Shipping Information</h3>
                <div>{order.order.shippingInfo.address}</div>
                <div>{order.order.shippingInfo.city}, {order.order.shippingInfo.state} {order.order.shippingInfo.pinCode}</div>
                <div>{order.order.shippingInfo.country}</div>
                <div>{order.order.shippingInfo.phoneNo}</div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Payment Information</h3>
                <div>Payment ID: {order.order.paymentInfo.id}</div>
                <div>Payment Status: {order.order.paymentInfo.status}</div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Order Items</h3>
                {order.order.orderItems.map((item) => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div>{item.name}</div>
                    <div>${item.price} x {item.quantity} = ${item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">Total Price:</div>
                <div className="text-lg font-bold">${order.order.totalPrice}</div>
              </div>
            </div>
          
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">No orders found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
