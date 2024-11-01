import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice'
import favouriteSlice from './features/favouriteSlice';

/**
 * Configures the Redux store with user slice as a reducer.
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    favourites: favouriteSlice
  },
});
