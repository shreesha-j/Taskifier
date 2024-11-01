import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

/**
 * Slice for managing user state.
 * @name userSlice
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Sets the user state with the provided user data.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new user data as payload.
     */
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
