
import { INITIALIZE_USER } from '@/redux/Auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AccountProfile = ({ handleClick, user }) => {
  const [ name, setName ] = useState(user?.name || '');
  const [ bio, setBio ] = useState(user?.bio || '');
  const [ preview, setPreview ] = useState(user?.avatar || '/user/user.jpg');
  const [ avatar, setAvatar ] = useState(null);
  const dispatch = useDispatch()

  const handleAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
          if(reader.readyState === 2) {
            setPreview(reader.result);
            setAvatar(reader.result);
          }
      }
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {};

    if(name) updateData.name = name;
    if(bio) updateData.bio = bio;
    if(avatar) updateData.avatar = avatar;

    // console.log(updateData);

    try {
      if(updateData.avatar || updateData.name || updateData.bio) {
      const res = await axios.put(`http://localhost:5000/api/user/updateUser/${user._id}`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + Cookies.get("accessToken"),
        }
      });

      if(res.data) {
        const { email, name, avatar, bio, _id, createdAt, followers, following } = res.data.data;

        dispatch(INITIALIZE_USER({ email, name, avatar, bio, _id, createdAt, followers, following }))

        setTimeout(() => {
          toast.success('Profile Updated Successfully');
          handleClick()
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } else {
      toast.error('Please fill in the form');
    }
    } catch (error) {
      
    } finally {
      setTimeout(() => {
        handleClick();
      }, 5000);
    }
  }

  return (
      <div className='w-[28em] h-full  bg-slate-800 px-8 py-4 rounded-md shadow-md' onClick={(e) =>  e.stopPropagation()}>
        <h1 className='text-xl font-bold font-serif py-2 text-white'>Edit Profile</h1>
        <form className='py-2 grid gap-4' onSubmit={handleSubmit}>
          <div className='flex items-center'>
            <Image 
              src={preview}
              width={80}
              height={80}
              alt='avatar'
              className='w-20 h-20 rounded-full object-cover '
            />
            <label htmlFor='file' className='bg-slate-600 w-[80%] cursor-pointer  bg-opacity-50 text-gray-200 text-center px-4 py-4 font-bold mx-4 my-4'>Upload Image</label>
            <input type='file' id="file" className='hidden' onChange={handleAvatar}/>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400'>Name</label>
            <input type='text' className='bg-slate-600 text-gray-400 px-4 py-2 my-4 outline-none bg-opacity-50' value={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-400'>Bio</label>
            <textarea type='text' className=' text-gray-400 bg-slate-600 bg-opacity-50 px-4 py-2 outline-none my-4' value={bio}  onChange={(e) => setBio(e.target.value)}/>
          </div>
          <button type='submit' className='text-gray-100 px-4 py-2 bg-sky-400 rounded-full my-4 font-bold'>Update</button>
        </form>


      </div>
    )
}

export default AccountProfile