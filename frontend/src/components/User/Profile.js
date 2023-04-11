import React from 'react';
import MetaData from '../layout/Header/MetaData';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user }= useSelector((state) => state.users)
  console.log(user.user.name)
  // profilePic: 'https://via.placeholder.com/150',



  return (
    <>
      <MetaData title={`${user.user.name}'s Profile`} />

      <div className="flex flex-col items-center mt-50">
        <img
          src={user.profilePic}
          alt="Profile"
          className="rounded-full w-32 h-32 mb-5"
        />
        <h2 className="text-2xl font-bold">{user.user.name}</h2>
        <p className="text-gray-500">{user.user.email}</p>

        <div className="my-10">
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
            Edit Profile
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
    </>
  );
};

export default Profile;
