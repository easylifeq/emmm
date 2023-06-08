import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});