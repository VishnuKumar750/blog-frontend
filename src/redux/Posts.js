import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { PRODUCTION_URL } from "../../constants";


const initialState = {
      posts: [],
      loading: true,
      error: false,
}

const postSlice = createSlice({
      name: 'posts',
      initialState,
      reducers: {
         fetchPostsStart: (state) => {
               state.loading = true
         },
         fetchPostsSuccess: (state, action) => {
               state.posts = action.payload
               state.loading = false
         },
         fetchPostsFailure: (state) => {
               state.error = true
               state.loading = false
         },
      }
})

export const fetchPosts = (page) => async (dispatch) => {
      dispatch(fetchPostsStart());
      try {
        const res = await axios.get(`${PRODUCTION_URL}/api/posts?page=${page}`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + Cookies.get("accessToken"),
            'cache-control': 'no-cache'
            }  
          });
      //   console.log(res.data);
        if(res.data) {
          dispatch(fetchPostsSuccess(res.data));
        } else {
          dispatch(fetchPostsFailure('Failed to fetch posts'))
        }
      } catch (err) {
        console.log(err);
      } 
}

const trending = createSlice({
      name: 'trending',
      initialState,
      reducers: {
            fetchTrendingStart: (state) => {
                  state.loading = true
            },
            fetchTrendingSuccess: (state, action) => {
                  state.posts = action.payload
                  state.loading = false
            },
            fetchTrendingFailure: (state) => {
                  state.error = true
                  state.loading = false
            },
      }
})

export const fetchTrending = () => async (dispatch) => {
      dispatch(fetchTrendingStart())
      try {
            const res = await axios.get(`${PRODUCTION_URL}/api/posts/trending`, {
                  headers: {
                        'Content-Type': 'application/json',
                        'cache-control': 'no-cache',
                  }
            });

            dispatch(fetchTrendingSuccess(res.data.data))
      } catch (error) {
            dispatch(fetchTrendingFailure())
      }
}


const userPost = createSlice({
      name: 'userPost',
      initialState,
      reducers: {
            fetchUserPostStart: (state) => {
                  state.loading = true
            },
            fetchUserPostSuccess: (state, action) => {
                  state.posts = action.payload
                  state.loading = false
            },
            fetchUserPostFailure: (state) => {
                  state.error = true
                  state.loading = false
            },
      }
})

const userAllPost = createSlice({
      name: 'userAllPost',
      initialState,
      reducers: {
            fetchUserAllPostStart: (state) => {
                  state.loading = true
            },
            fetchUserAllPostSuccess: (state, action) => {
                  state.posts = action.payload
                  state.loading = false
            },
            fetchUserAllPostFailure: (state) => {
                  state.error = true
                  state.loading = false
            },
      }
})



export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postSlice.actions

export const { fetchTrendingStart, fetchTrendingSuccess, fetchTrendingFailure } = trending.actions

export const { fetchUserPostStart, fetchUserPostSuccess, fetchUserPostFailure } = userPost.actions

export const { fetchUserAllPostStart, fetchUserAllPostSuccess, fetchUserAllPostFailure } = userAllPost.actions

export const PostReducer = postSlice.reducer;
export const TrendingReducer = trending.reducer;
export const UserPostReducer = userPost.reducer;
export const UserAllPostReducer = userAllPost.reducer;