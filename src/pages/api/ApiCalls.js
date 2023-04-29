const { default: axios } = require("axios")

exports.register = async ({ name, email, password, avatar }) => {
   try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, avatar })
      return res.data
   } catch (error) {
      return error.response.data;
   }
}

exports.getAllPosts = async () => {
   try {
      const res = await axios.get('http://localhost:5000/api/posts', {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('accessToken')}`
         }
      })
      return res
   } catch (error) {
      return error.response.data;
   }
}  

