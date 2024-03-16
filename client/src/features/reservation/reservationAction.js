import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/net";
import { API_RESERVATIONS } from "../../utils/config.js";

export const loadArtisanReservations = createAsyncThunk(
    "reservation/loadArtisanReservations",
    async (artisanId, { dispatch, getState}) => {
        try {
            const { data } = await axios.get(`${API_RESERVATIONS}/artisan/${artisanId}`);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const loadClientReservations = createAsyncThunk(
    "reservation/loadClientReservations",
    async (clientId, { dispatch, getState }) => {
        try {
            const { data } = await axios.get(`${API_RESERVATIONS}/client/${clientId}`);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const updateReservationState = createAsyncThunk(
    "reservation/updateReservationState",
    async ({ reservationId, state, origin }, { dispatch, getState}) => {
        try {
            const { data } = await axios.patch(API_RESERVATIONS, { reservationId, state });
            return { data, origin };
        } catch (error) {
            throw new Error(error);
        }
    }
);

export const createReservation = createAsyncThunk(
    "reservation/createReservation",
    async ({ userId, productId }, { dispatch, getState }) => {
        try {
            const { data } = await axios.post(API_RESERVATIONS, { userId, productId });
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
)