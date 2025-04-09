import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the authentication
const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Actions to update the state
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },

    // logout(state) {
    //   state.token = null; // Clear token in Redux
    //   localStorage.removeItem("token"); // Remove token from localStorage
    // },
  },
});

// Export the actions
export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
