import React from 'react'
import { Country, State } from "country-state-city"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import CheckoutSteps from "./CheckoutSteps"
import { useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../redux/cartSlice.js'

const Shipping = ({ history }) => {
  const dispatch = useDispatch()

  const { shippingInfo } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setState("");
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const shippingData = {
      address,
      city,
      state,
      country,
      pinCode,
      phoneNo,
    };
    dispatch(saveShippingInfo(shippingData));
    history.push('/order/confirm');
  };

  console.log(localStorage.getItem('shippingInfo'))
  return (
    <>
      <CheckoutSteps />

      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Shipping Information</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 font-bold mb-2"
            >
              Country
            </label>
            <select
              id="country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={country}
              onChange={handleCountryChange}
              required
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 font-bold mb-2"
            >
              State
            </label>

            <select
              id="state"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={state}
              onChange={handleStateChange}
              required
            >
              <option value="">Select State</option>
              {country &&
                State.getStatesOfCountry(country).map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
            </select>

          </div>
          <div className="mb-4">
            <label htmlFor="pinCode" className="block text-gray-700 font-bold mb-2">
              PIN Code
            </label>
            <input
              type="text"
              id="pinCode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNo" className="block text-gray-700 font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              pattern="[0-9]{10}" // Use pattern attribute to specify phone number format
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </>
  );
}

export default Shipping