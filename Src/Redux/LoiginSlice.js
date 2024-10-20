import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginState: false,
  userData: [],  // Initialize as an empty array
  isAdmin: false,
  initialUser: null,
};

const LoiginSlice = createSlice({
  name: "login_state",
  initialState,  
  reducers: {
    setLogin: (state, action) => {
      state.loginState = action.payload.loginState;
      state.userData = action.payload.userData || [];  // Ensure it's an array
      state.isAdmin = action.payload.isAdmin;
      state.initialUser = action.payload.initialUser; 
    },
    setInitialUser: (state, action) => {
      state.initialUser = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;  // Assumes payload is an array
    },
  },
});

export const { setLogin, setInitialUser, setUserData } = LoiginSlice.actions;
export const loginSelector = (state) => state.auth.loginState;
export const loggedInUserSelector = (state) => state.auth.userData;
export const isAdminSelector = (state) => state.auth.isAdmin;
export const initialUserSelector = (state) => state.auth.initialUser;
export default LoiginSlice.reducer;
