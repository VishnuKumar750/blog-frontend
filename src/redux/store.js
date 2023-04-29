// create a store using @reduxjs/tookit
import { configureStore } from '@reduxjs/toolkit';
// import the authSlice reducer
import { reducer as authReducer} from './Auth';
import { PostReducer, TrendingReducer, UserPostReducer,  UserAllPostReducer} from './Posts';


// create a store using @reduxjs/tookit
const store = configureStore({
   reducer: {
      auth: authReducer,
      post: PostReducer,
      trending: TrendingReducer,
      sp: UserPostReducer,
      UAP: UserAllPostReducer,
   },
});

export default store;
