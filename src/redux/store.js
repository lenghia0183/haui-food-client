import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/features/authSlice.js';
import categoryReducer from '../features/categorySlice';
import userReducer from '../features/userSlice';
import captchaReducer from '../features/captchaSlide';
export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    captcha: captchaReducer,
  },
});
