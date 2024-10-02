import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/user.slice';
import categoryReducer from '../slice/category.slice';
const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
