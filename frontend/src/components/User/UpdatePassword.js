import React, { useState } from 'react';
import MetaData from '../layout/Header/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/userSlice';
import Loader from '../layout/Loader/Loader';


const UpdatePassword = () => {
    const { user }= useSelector((state) => state.users)
    console.log(user)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const userData = { oldPassword, newPassword, confirmPassword}
      dispatch(updatePassword(userData))
    }
  
    if (user === null) {
      return <Loader />
    } else {
      
      return (
        <>
          <MetaData title={`${user.user.name}'s Profile`} />
  
          <div className="flex flex-col items-center mt-50">
            <img
              src={user.user.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 mb-5"
            />
            <h2 className="text-2xl font-bold">{user.user.name}</h2>
            <p className="text-gray-500">{user.user.password}</p>
  
            <div className="my-10">
              <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                Save
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                Change Password
              </button>
            </div>
  
            <div className="text-center">
              <p className="text-gray-500">Joined on {user.user.createdAt}</p>
              <p className="text-gray-500">Reset Password</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="oldPassword"
                >
                  Old Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="oldPassword"
                  type="oldPassword"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="newPassword"
                  type="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
            </div>
  
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </div>
          </form>
        </>
      );
    }
}

export default UpdatePassword