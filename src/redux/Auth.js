import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DEVELOPMENT_URL, PRODUCTION_URL } from '../../constants';

const initialState = {
   user: {},
   loading: false,
   isAuthenticated: false,
   error: null
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginStart(state) {
         state.loading = true;
      },
      loginSuccess(state, action) {
         const { email, name, img, _id, accessToken, createdAt, followers, following, bio } = action.payload;
         state.loading = false;
         state.user = { email, name, img, _id, createdAt, followers, following, bio};
         state.isAuthenticated = true;
         localStorage.setItem('user', JSON.stringify({ email, name, img, _id, createdAt, followers, following, bio }))
         Cookies.set('accessToken', accessToken, { expires: 3 })
      },
      loginFailure(state, action) {
         state.loading = false;
         state.isAuthenticated = false;
         state.error = action.payload;
      },
      INITIALIZE_USER: (state, action) => {
         const { email, name, avatar, _id, createdAt, followers, following, bio } = action.payload;
         state.loading = false;
         state.user = { email, name, avatar, _id, createdAt, followers, following, bio };
         state.isAuthenticated = true;
         localStorage.setItem('user', JSON.stringify({ email, name, avatar, _id, createdAt, followers, following, bio }))
       },
      logoutStart(state) {
         state.loading = true;
      },
      logoutSuccess(state) {
         state.loading = false;
         state.isAuthenticated = false;
         state.user = null;
         localStorage.removeItem('user');
         Cookies.remove('accessToken');
      },
      logoutFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      },
      registerStart(state) {
         state.loading = true;
      },
      registerSuccess(state, action) {
         const { email, name, avatar, _id, accessToken, createdAt, followers, following, bio } = action.payload;
         state.loading = false;
         state.user = { email, name, avatar, _id, createdAt, followers, following, bio };
         state.isAuthenticated = true;
         localStorage.setItem('user', JSON.stringify({ email, name, avatar, _id, createdAt, followers, following, bio }))
         Cookies.set('accessToken', accessToken, { expires: 3 })
      },
      registerFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      },
      resetPassword(state, action) {
         state.loading = true;
      },
      resetPasswordSuccess(state, action) {
         state.loading = false;
         state.isAuthenticated = true;
         state.user = action.payload;
      },
      resetPasswordFailure(state, action) {
         state.loading = false;
         state.error = action.payload;
      }
   }
});


export const getLoggedUser = () => async (dispatch) => {
   try {
      const user = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null;

      const accessToken = Cookies.get('accessToken') ? Cookies.get('accessToken') : null;

      // verify token with backend
      const res = await axios.post(`${PRODUCTION_URL}/api/user/isTokenValid`, {
         "token": accessToken
      })

      // console.log(res);
      if(!res.data.success) {
         dispatch(logoutSuccess());
      }

      if(user) {
         const res = await axios.get(`${PRODUCTION_URL}/api/user/getUser/${user._id}`, {
            headers: {
               'cache-control': 'no-cache'
            }
         })
         // console.log(res.data);
         if(res.data) {
            // console.log('initalize_user');
            dispatch(INITIALIZE_USER(res.data.data));
         } else {
         }
      }
   } catch (error) {
      dispatch(loginFailure(error));
   }
}


export const {
   loginStart,
   loginSuccess,
   loginFailure,
   logoutStart,
   logoutSuccess,
   logoutFailure,
   registerStart,
   INITIALIZE_USER,
   registerSuccess,
   registerFailure,
   resetPassword,
   getLoginUserStart,
   getLoginUserSuccess,
   getLoginUserFailure,
   resetPasswordSuccess,
   resetPasswordFailure
} = authSlice.actions;

export const reducer =  authSlice.reducer;

