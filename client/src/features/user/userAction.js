import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_USERS } from "../../utils/config";
import axios from "../../utils/net";

export const loadUsers = createAsyncThunk(
  "shop/loadUsers",
  async (_, { dispatch, getState }) => {
    try {
      console.info(`Fetching ${API_USERS}`);
      const response = await axios.get(API_USERS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
  async (formData, { dispatch, getState }) => {
    try {
      console.info(`Sending POST request: ${API_USERS}`);
      const response = await axios.post(API_USERS, formData);
      return response.data;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw new Error(error);
    }
  }
);


export const updateArtisan = createAsyncThunk(
  "user/updateArtisan",
  async (values, { dispatch, getState }) => {
    try {
      console.info(`Sending PUT request: ${API_USERS}/${getState().user.editingUser}`);
      const response = await axios.put(`${API_USERS}/${getState().user.editingUser}`, values);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);


export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { dispatch, getState }) => {
    try {
      console.info(`Sending DELETE request: ${API_USERS}`);
      await axios.delete(API_USERS, userId);
      return userId;
    } catch (error) {
      throw new Error(error);
    }
  }
);


export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { dispatch, getState, rejectWithValue }) => {
    try {
      console.info(`Sending POST request: ${API_USERS}/login`);
      const response = await axios.post(`${API_USERS}/login`, formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: 'Aucune réponse du serveur' });
      } else {
        return rejectWithValue({ message: "Une erreur s'est produite lors de la configuration de la demande" });
      }
  }
}
);