import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess } from '@/redux/Auth';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch()

  const SignIn = async ({ email, password }) => {
    dispatch(loginStart());

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      // console.log(res.data);

      if(res.data) {
         const { user, token } = res.data;
        console.log(user);
        dispatch(loginSuccess({ ...user, "accessToken": token  }));
        toast.success('Login Successfull')
        setIsAuth(!isAuth);
      } else {
        dispatch(loginFailure(error));
        toast.error('Login Failed');
      }
    } catch (error) {
      toast.error('Login Failed');
    }
    }

  const Signup = async ({ name, email, password, avatar }) => {
    console.log('signup');
    dispatch(registerStart());
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name, email, password, avatar
      });

      console.log(res.data);
      if(res.data) {
        const { user, token } = res.data;
  
        dispatch(registerSuccess(
          { ...user, "accessToken": token }
        ));
        
    toast.success('Signup Successfull');

    setTimeout(() => {
      setIsAuth(!isAuth);
    }, 3000);
      } else {
        dispatch(registerFailure('Something went wrong'));
      }

    } catch(err) {
      console.log(err.message);
    }

    // console.log(name, email, password, avatar);

  }

  const router = useRouter()
  if(isAuth) {
    router.replace('/');
    return null;
  }

  const handleClick = () => {
    setIsLogin(!isLogin);
  }

  return (
    <>
    <Head>
      <title>Login</title>
      <meta name="description" content="login" />
    </Head>
    <div className='w-full max-h-full min-h-screen flex items-center justify-center bg-black '>
      <div className='w-[25em] my-10 mx-2 px-4 bg-gray-900 bg-opacity-80 transition-all z-[99]'>
        {isLogin ? <Login handleClick={handleClick} handleSubmit={SignIn}/> : <Register handleClick={handleClick} handleSubmit={Signup} />}
      </div>
    </div>
    </>
  )
}

export default UserAuth


// Register Component
const Register = ({handleClick, handleSubmit}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [preview, setPreview] = useState('/user/user.jpg');
  const [errors, setErrors] = useState({})

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

  const handleRegister = (e) => {
    e.preventDefault();

    const error = {};

    if(!name) {
      error.name = 'Name is required';
    } else if(name.length < 3) {
      error.name = 'Name must be at least 3 characters';
    } else {
      error.name = '';
    }

    // email validation
    if (!email) {
      error.email = 'Email is required';
    } else if(!/\S+@\S+\.\S+/.test(email)) {
      error.email = 'Email is Invalid';
    } else {
      error.email = '';
    }


    if (!password) {
      error.password = 'Password is required';
    } else if(password.length < 6) {
      error.password = 'Password must be at least 6 characters';
    } else {
      error.password = '';
    }

    if(!confirmPassword) {
      error.confirmPassword = 'Confirm Password is required';
    } else if(confirmPassword !== password) {
        error.confirmPassword = 'Confirm Password does not match';
    } else {
      error.confirmPassword = '';
    }

    if (error.name || error.email || error.password || error.confirmPassword) {
      console.log('error', error);
      setErrors(error);
      return;
    }

    handleSubmit({ name, email, password, avatar });
  }

  const handleNameFocus = () => {
    if(errors.name) {
      setErrors({ ...errors, name: '' });
    }
  }

  const handleEmailFocus = () => {
    if (errors.email) {
      setErrors({...errors, email: ''});
    }
  }

  const handlePasswordFocus = () => {
    if (errors.password) {
      setErrors({...errors, password: ''});
    }
  }

  const handleConfirmPasswordFocus = () => {
    if (errors.confirmPassword) {
      setErrors({...errors, confirmPassword: ''});
    }
  }



  return (
    <div className='py-10'>
      <h1 className='text-3xl font-bold text-center my-2 text-white'>Register</h1>
      <form className='px-2 py-2 grid gap-4' onSubmit={handleRegister}>
      <label className='text-white font-bold'>Profile Pic</label>
        <div className="my-1 flex items-center">
          <Image src={preview}
          width={80} height={80}
          alt="avatar" className='w-20 h-20 rounded-full object-cover'/>
          <label htmlFor="avatar" className='w-full py-2 mx-4 text-white border-2 bg-slate-700 cursor-pointer bg-opacity-80 font-bold text-center'>Upload Image</label>
        <input type='file' accept='image/*' className='w-full px-4 bg-transparent p-1 hidden my-2 text-white outline-none' id='avatar' onChange={handleAvatar}/>
       </div>
        <div>
      <label className='text-white font-bold'>Name</label>
        <input type='text' placeholder='Name' className='w-full bg-transparent  border-b-2 p-1 my-2 text-white outline-none'
        onFocus={handleNameFocus} onChange={(e) => setName(e.target.value)} value={name}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className=''>
        <label className='text-white font-bold'>Email</label>
        <input type='email' placeholder='Email' className='w-full bg-transparent border-b-2 p-1 my-2 text-white outline-none'
        onFocus={handleEmailFocus} onChange={(e) => setEmail(e.target.value)} value={email}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
        <label className='text-white font-bold'>Password</label>
        <input type='password' placeholder='Password' className='w-full bg-transparent border-b-2 outline-none p-1 my-2' onFocus={handlePasswordFocus} value={password}  
        onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
        <label className='text-white font-bold'>Confirm Password</label>
        <input type='password' placeholder='Confirm Password' className='w-full bg-transparent border-b-2 p-1 my-2 outline-none' onFocus={handleConfirmPasswordFocus} value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        <div>
        <button type='submit' className='w-full bg-blue-500 text-white p-2 my-2'>Register</button>
        </div>
      </form>
      <p className='text-white px-2'>Already Have an Account? <span className='text-sky-500 cursor-pointer' onClick={handleClick}>Login</span></p>
    </div>
  )
}

// Login Component
const Login = ({handleClick, handleSubmit}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleLogin = (e) => {
      e.preventDefault();
  
      const errors = {}
      // Validate email and password
      if (!email) {
        errors.email = 'Email is required';
      } else if(!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is Invalid';
      } else {
        errors.email = '';
      }


      if (!password) {
        errors.password = 'Password is required';
      } else if(password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      } else {
        errors.password = '';
      }

      if (errors.email || errors.password) {
        setErrors(errors);
        return;
      }
  
      // Submit the form
      handleSubmit({email, password});
    }
  
    const handleEmailFocus = () => {
      if (errors.email) {
        setErrors({...errors, email: ''});
      }
    }
  
    const handlePasswordFocus = () => {
      if (errors.password) {
        setErrors({...errors, password: ''});
      }
    }

  return (
    <div className='my-10'>
      <h1 className='text-3xl font-bold text-center my-2 text-white'>Login</h1>
      <form className='px-2 py-2 grid gap-4' onSubmit={handleLogin}>
        <div>
        <label className='text-white font-medium'>Email</label>
        <input placeholder='Email' className='w-full bg-transparent focus-visible border-b-2 p-1 my-2 text-white outline-none' value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleEmailFocus}/>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
        <label className='text-white font-medium '>Password</label>
        <input type='password' placeholder='Password' className='w-full bg-transparent focus-visible outline-none border-b-2 p-1 my-2' value={password} onChange={(e) => setPassword(e.target.value)} onFocus={handlePasswordFocus}/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
        <button type="submit" className='w-full bg-blue-500 text-white p-2 my-2 font-bold'>Login</button>
        </div>
      </form>

      <p className='text-white px-2'>Does not have an Account? <span className='text-sky-500 cursor-pointer' onClick={handleClick}>Register</span></p>
    </div>
  )
}
