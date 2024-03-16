import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, loadUsers, updateArtisan } from "./userAction.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    editingUser: null,
  },
  reducers: {
    startEdit(state, action) {
      if (action.payload) {
        state.editingUser = action.payload;
      }
    },
    stopEdit(state, action) {
      state.editingUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        console.error(action.error.message);
        state.loading = false;
      })
      .addCase(updateArtisan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArtisan.fulfilled, (state, action) => {
        state.users = state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
        state.loading = false;
      })
      .addCase(updateArtisan.rejected, (state, action) => {
        console.error(action.error.message);
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (action, state) => {
        console.error(action.error.message);
      });
  },
});

export const { startEdit, stopEdit } = userSlice.actions;
export default userSlice.reducer;
