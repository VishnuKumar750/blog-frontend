import { INITIALIZE_USER, getLoggedUser, logoutStart, logoutSuccess } from '@/redux/Auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()


  const router = useRouter()
  const handleAuth = () => {
    router.push(`/Login?redirect=${encodeURIComponent(router.asPath)}`)
  }

  useEffect(() => {
    dispatch(getLoggedUser());   
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutStart())
    try {
      dispatch(logoutSuccess())      
      
    } catch (error) {
      dispatch(logoutSuccess());
    }
  }

  return (
    <header className='max-w-7xl sm:fixed flex min-w-full bg-white z-[999] justify-between items-center px-4 py-2 relative shadow-md'>
      <div className='flex items-center sm:mx-8'>
        <Image src="/logo/logo.svg" width={10} height={10} alt="logo" className='w-6 h-6 '/>
        <h1 className='mx-2 text-[1.4rem] font-bold font-serif'>
          <Link href={'/'} as={'/'}>
            Blog
          </Link>
          </h1>
      </div>

      {
        isAuthenticated ? (
      <div className='flex items-center justify-between w-32 sm:mx-8'>
        <div className='w-8 h-8 cursor-pointer'>
          <Link href={`/create-post/${user?._id}`} as={`/create-post/${user?._id}`}>
          <Image src={"/svg/plus.svg"} width={20} height={20} alt="img" className='w-full  h-full'/>
          </Link>
        </div>

      <div className='w-8 h-8 rounded-full cursor-pointer'>
      <Link href={`/Account/${user?._id}`} as={`/Account/${user?._id}`}>
        <Image src={user?.avatar || "/user/user.jpg"} width={20} height={20} alt="img" className='w-full h-full rounded-full object-cover'/>
        </Link>
      </div>
      <div className='w-8 h-8 rounded-full cursor-pointer' onClick={handleLogout}>
        <Image src="/logo/logout.svg" width={20} height={20} alt="logout-button" className='w-full h-full rounded-full object-cover'/>
      </div>
          </div>
      )
      :
      (
        <div>
           <h1 className='text-[1.2rem] font-semibold cursor-pointer' onClick={handleAuth}>Login / Register</h1> 
        </div>
      )
      }
    </header>
  )
}

export default Navbar