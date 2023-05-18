import React, { useEffect, useRef } from 'react'
import CheckoutSteps from "./CheckoutSteps.js"
import { useDispatch, useSelector } from "react-redux";
import MetaData from '../layout/Header/MetaData.js';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import axios from 'axios';
import Typography from '../Home/Typography.js';
import { createOrder } from '../../redux/orderSlice.js';





const Payment = ({ history }) => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.users);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.itemsPrice,
        taxPrice: orderInfo.taxAmount,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            )
            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.user.name,
                        email: user.user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }

                }
            })
            if (result.error) {
                payBtn.current.disabled = false;
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    console.log(result)
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))
                    history.push('/success')

                } else {
                    console.log("ther is some issue")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
        }
    }
    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="flex flex-col items-center mt-50">
                <form onSubmit={(e) => submitHandler(e)} className="w-full max-w-md">
                    <Typography className="text-xl font-bold mb-4">Card Info</Typography>
                    <div className="flex items-center mb-4">
                        {/* <CreditCardIcon className="h-6 w-6 mr-2 text-gray-400" /> */}
                        <CardNumberElement className="flex-1 bg-white rounded shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex items-center mb-4">
                        {/* <EventIcon className="h-6 w-6 mr-2 text-gray-400" /> */}
                        <CardExpiryElement className="flex-1 bg-white rounded shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex items-center mb-4">
                        {/* <VpnKeyIcon className="h-6 w-6 mr-2 text-gray-400" /> */}
                        <CardCvcElement className="flex-1 bg-white rounded shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <input
                        type="submit"
                        value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </form>
            </div>

        </>
    )
}

export default Payment