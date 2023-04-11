import React, { useState } from 'react';
import MetaData from '../layout/Header/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/userSlice';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = { email }
        dispatch(forgotPassword(userData))
    }

        return (
            <>
                <MetaData title="Forgot Password" />

                <div className="flex flex-col items-center mt-50">
                   
                    <h2 className="text-2xl font-bold ">Forgot Password</h2>
                    <p className="text-gray-500">Enter your email below to reset password link</p>

                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </>
        )
    
}

export default ForgotPassword