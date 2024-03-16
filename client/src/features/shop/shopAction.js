import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_SHOPS, API_USERS } from "../../utils/config";
import axios from "../../utils/net";
import { startWatch, stopEdit } from "./shopSlice";

export const loadShops = createAsyncThunk(
  "shop/loadShops",
  async (_, { dispatch, getState }) => {
    try {
      console.info(`Fetching ${API_SHOPS}`);
      const response = await axios.get(API_SHOPS);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const loadShop = createAsyncThunk(
  "shop/loadShop",
  async (shopSlug, { dispatch, getState }) => {
    try {
      console.info(`Fetching ${API_SHOPS}/${shopSlug}`);
      const response = await axios.get(`${API_SHOPS}/${shopSlug}`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const addShop = createAsyncThunk(
  "shop/addShop",
  async (formData, { dispatch, getState }) => {
    try {
      console.info(`Sending POST request: ${API_SHOPS}`);
      const response = await axios.post(API_SHOPS, { ...formData, email: getState().user.editingUser });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteShop = createAsyncThunk(
  "shop/deleteShop",
  async (shopId, { dispatch, getState }) => {
    try {
      console.info(`Sending DELETE request: ${API_SHOPS}`);
      await axios.delete(API_SHOPS, shopId);
      return shopId;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const loadProducts = createAsyncThunk(
  "shop/loadProducts",
  async (userId, { dispatch, getState }) => {
    try {
      console.info(`Sending GET request: ${API_USERS}/${userId}/shop`);
      const { data } = await axios.get(`${API_USERS}/${userId}/shop`);
      dispatch(startWatch(data.userShop._id))
      return data.shopProducts;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const saveProduct = createAsyncThunk(
  "shop/saveProduct",
  async (values, { dispatch, getState }) => {
    if (getState().shop.editingProductId) {
      dispatch(updateProduct(values));
    } else {
      dispatch(addProduct(values));
    }
  }
);

export const addProduct = createAsyncThunk(
  "shop/addProduct",
  async (values, { dispatch, getState }) => {
    try {
      const { data } = await axios.post(`${API_SHOPS}/${values.shopId}/products`, values)
      dispatch(stopEdit());
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "shop/updateProduct",
  async (values, { dispatch, getState }) => {
    try {
      const { data } = await axios.put(`${API_SHOPS}/${values.shopId}/products/${getState().shop.editingProductId}`, values);
      dispatch(stopEdit());
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "shop/deleteProduct",
  async (data, { dispatch, getState }) => {
    try {
      await axios.delete(`${API_SHOPS}/${data.shopId}/products/${data.productId}`);
      return data.productId;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getUserShop = createAsyncThunk(
  "shop/getUserShop",
  async (userId, { dispatch, getState }) => {
    try {
      console.info(`Fetching ${API_SHOPS}`);
      const response = await axios.get(`${API_USERS}/${userId}/shop`);
      console.log("thomas")
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);