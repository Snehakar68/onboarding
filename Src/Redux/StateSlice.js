// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   users: [], // List of all users
// };

// const StateSlice = createSlice({
//   name: "state",
//   initialState,
//   reducers: {
//     setUserData: (state, action) => {
//       if (Array.isArray(action.payload)) {
//         state.users = action.payload;
//       } else if (
//         typeof action.payload === "object" &&
//         action.payload !== null
//       ) {
//         state.users = [action.payload];
//       } else {
//         console.error("setUserData received invalid payload:", action.payload);
//       }
//     },
  
//     updateUser: (state, action) => {
//       const { email, updatedUser } = action.payload;
//       const index = state.users.findIndex((user) => user.email === email);
//       if (index > -1) {
//         state.users[index] = updatedUser;
//       }
//     },
//     deleteUser: (state, action) => {
//       state.users = state.users.filter((user) => user.email !== action.payload);
//     },
//   },
// });

// export const {
//   setUserData,
//   updateUser,
//   deleteUser,
// } = StateSlice.actions;
// export const userDataSelector = (state) => state.users.users;
// export const selectedUserSelector = (state) => state.users.selectedUser;
// export default StateSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // List of all users
};

const StateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.users = action.payload;
      } else if (
        typeof action.payload === "object" &&
        action.payload !== null
      ) {
        state.users = [action.payload];
      } else {
        console.error("setUserData received invalid payload:", action.payload);
      }
    },
  
    updateUser: (state, action) => {
      const { email, updatedUser } = action.payload;
      const index = state.users.findIndex((user) => user.email === email);
      if (index > -1) {
        // Ensure the updatedUser includes imgPosition
        const currentUser = state.users[index];
        state.users[index] = {
          ...currentUser, // Retain other user properties
          ...updatedUser, // Override with updatedUser properties
        };
      }
    },
    
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.email !== action.payload);
    },
  },
});

export const {
  setUserData,
  updateUser,
  deleteUser,
} = StateSlice.actions;
export const userDataSelector = (state) => state.users.users; // Ensure this points to the right slice
export const selectedUserSelector = (state) => state.state.selectedUser; // Adjust based on your state structure
export default StateSlice.reducer;
