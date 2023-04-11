import React, { useState, useEffect } from 'react';
import MetaData from '../layout/Header/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlice';
import Loader from '../layout/Loader/Loader';

const UpdateProfile = () => {
  const { user }= useSelector((state) => state.users)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user && user.user) {
      setName(user.user.name || '');
      setEmail(user.user.email || '');
    }
  }, [user]);
  // const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { name, email}
    dispatch(updateUser(userData))
  }

  if (user === null) {
    return <Loader />
  } else {
  
  // profilePic: 'https://via.placeholder.com/150',

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
          <p className="text-gray-500">{user.user.email}</p>

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
            <p className="text-gray-500">MY Orders</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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

          {/* <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="profilePic"
              >
                Profile Picture URL
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="profilePic"
                type="text"
                placeholder="Profile Picture URL"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
              />
            </div>
          </div> */}

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
};

export default UpdateProfile;
