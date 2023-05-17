import axios from "axios";
import { DEVELOPMENT_URL, PRODUCTION_URL } from "../../../constants";
import Cookies from "js-cookie";

// handle post creation
export const createPost = async ( title, content, tags, image ) => {

   return await axios.post(`${PRODUCTION_URL}/api/posts/`, {
      title,
      content,
      tags,
      image
      },
      {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + Cookies.get("accessToken"),
          'cache-control': 'no-cache'
          } 
      })
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
   }

// handle post update 
export const updatePost = async (_id, form) => {
   return await axios.put(`${PRODUCTION_URL}/api/posts/updatePost/${_id}`, form, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Cookies.get('accessToken')
      }}).then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
   }

// handle post deletion
export const deletePost = async (_id) => {
   return await axios.delete(`${PRODUCTION_URL}/api/posts/delete/${_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Cookies.get('accessToken')
      }
    })
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
   }


// like the post
export const likePost = async (_id) => {
   return await axios
      .post(
         `${PRODUCTION_URL}/api/posts/like/${_id}`,
         {},
         {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': "Bearer " + Cookies.get('accessToken'),
               'cache-control': 'no-cache'
             }
         }
      )
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response.data;
      });
   }

// unlike the post
export const unlikePost = async (_id) => {
   return await axios.post(`${PRODUCTION_URL}/api/posts/dislike/${_id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Cookies.get('accessToken'),
        'cache-control': 'no-cache'

      }
    })
      .then((res) => {
         return res.data;
      }
      )
      .catch((err) => {
         return err.response.data;
      }
      );
   }