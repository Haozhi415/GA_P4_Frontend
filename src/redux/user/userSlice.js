import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      // payload here will be the user details in "rest" passed from auth.controller.js
      // "rest" contains all the user info except the password.
      // when sign in is successful, the user details in "rest" is set as the state of currentUser
      state.currentUser = action.payload;
      state.error = null;
    },

    signInFailure: (state, action) => {
      // when sign in is unsuccessful due to invalid email or password,
      // payload here will be the error message passed from auth.controller.js
      // the error message is "Invalid email or password"
      // the error message is set as the state of error
      // otherwise the payload would be the error object sent out by the error handling middleware in server.js
      state.error = action.payload;
    },

    updateUserSuccess: (state, action) => {
      // payload here will be the updated user details in "rest" passed from user.controller.js
      // "rest" contains all the updated user info except the password.
      // when update user is successful, the updated user details in "rest" is set as the state of currentUser
      state.currentUser = action.payload;
      state.error = null;
    },

    updateUserFailure: (state, action) => {
      // when update user is unsuccessful due to user trying to update other user's account,
      // payload here will be the error message passed from user.controller.js
      // the error message is "You can only update your own account."
      // the error message is set as the state of error
      // otherwise the payload would be the error object sent out by the error handling middleware in server.js
      state.error = action.payload;
    },

    deleteUserSuccess: (state) => {
      // when delete user is successful, the state of currentUser is set to null
      state.currentUser = null;
      state.error = null;
    },

    deleteUserFailure: (state, action) => {
      // when delete user is unsuccessful due to user trying to delete other user's account,
      // payload here will be the error message passed from user.controller.js
      // the error message is "You can only delete your own account."
      // the error message is set as the state of error
      // otherwise the payload would be the error object sent out by the error handling middleware in server.js
      state.error = action.payload;
    },

    signOutUserSuccess: (state) => {
      // when sign out is successful, the state of currentUser is set to null
      state.currentUser = null;
      state.error = null;
    },

    signOutUserFailure: (state, action) => {
      // when sign out is unsuccessful,
      // payload will be be the error object sent out by the error handling middleware in server.js
      state.error = action.payload;
    },
  },
});

export const {
  signInSuccess,
  signInFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
