import React from 'react'
import CheckoutSteps from "./CheckoutSteps.js"
import { useSelector, useDispatch } from 'react-redux'


const ConfirmOrder = ({history}) => {
  
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
//   const { user } = useSelector((state) => state.users)
  console.log('hhhhhhhh')
  // const { user }= useSelector((state) => state.users)
  // console.log(user.user.name)
//   console.log(user.user.name)

  // Calculate total price of all items in cart
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Calculate tax amount
  const taxRate = 0.18 // 18% tax rate  GST
  const taxAmount = itemsPrice * taxRate

  // Shipping Charges
  const shippingCharges = itemsPrice > 1000 ? 0 : 200;

  // Calculate total price including tax
  const totalPrice = itemsPrice + taxAmount + shippingCharges

  const proceedToPayment = () =>{
    const data = {
        shippingInfo,
        itemsPrice,
        shippingCharges,
        taxAmount,
        totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    window.location.href = "/process/payment"
  }
  return (
    <div>
      <CheckoutSteps />

      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Confirm Order</h1>

        {/* Shipping Information */}
        <div className="border border-gray-300 rounded p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Shipping Information</h2>
          {/* <p>{user.user.name}</p> */}
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}</p>
          <p>{shippingInfo.pinCode}</p>
          <p>{shippingInfo.phoneNo}</p>
        </div>

        {/* Cart Items */}
        <div className="border border-gray-300 rounded p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Your Cart Items</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-1 mr-4">
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-gray-500">{item.quantity} x {item.price}</p>
              </div>
              <p className="font-bold">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border border-gray-300 rounded p-4 mb-4">
          <h2 className="text-lg font-bold mb-2">Order Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <p>Items Price:</p>
            <p>${itemsPrice}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p>Tax:</p>
            <p>${taxAmount}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p>Shipping Charges:</p>
            <p>${shippingCharges}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <p className="font-bold">Total Price:</p>
            <p className="font-bold">${totalPrice}</p>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={proceedToPayment}>Proceed to Payment</button>
      </div>
    </div>
  )
}

export default ConfirmOrder
