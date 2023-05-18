import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../redux/orderSlice';
import { Link } from "react-router-dom";

const MyOrders = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  const { orders , loading } = useSelector((state) => state.orders);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {loading ? <p>Loading...</p>:
      orders.orders && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Paid</th>
              <th className="px-4 py-2">Delivered</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="border px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td className="border px-4 py-2">{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
