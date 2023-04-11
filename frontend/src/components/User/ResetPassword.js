import React, { useState } from 'react';
import MetaData from '../layout/Header/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/userSlice';

const ResetPassword = ({ match }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { token } = match.params
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = { password, confirmPassword }
        dispatch(resetPassword({ token, userData }))
    }

    return (
        <>
            <MetaData title="Forgot Password" />

            <div className="flex flex-col items-center mt-50">

                <h2 className="text-2xl font-bold ">Reset Password</h2>
                <p className="text-gray-500">Enter your new password for reset</p>

            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="password"
                        >
                            New Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="password"
                            type="text"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="confirmPassword"
                            type="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </div>    
            </form>
        </>
    )

}

export default ResetPassword