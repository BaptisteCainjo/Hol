import { createSlice } from "@reduxjs/toolkit";
import { createReservation, loadArtisanReservations, loadClientReservations, updateReservationState } from "./reservationAction.js";

const reservationSlice = createSlice({
    name: "reservation",
    initialState: {
        reservations: [],
        clientReservations: [],
        loading: false,
        editing: false,
        editingReservationId: null,
    },
    reducers: {
        startEdit: (state, action) => {
            state.editing = true;
            state.editingReservationId = action.payload;
        },
        stopEdit: (state) => {
            state.editing = false;
            state.editingReservationId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadArtisanReservations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadArtisanReservations.fulfilled, (state, action) => {
                state.reservations = action.payload;
                state.loading = false;
            })
            .addCase(loadArtisanReservations.rejected, (state, action) => {
                console.error(action.error.message);
                state.loading = false;
            })
            .addCase(loadClientReservations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadClientReservations.fulfilled, (state, action) => {
                state.clientReservations = action.payload;
                state.loading = false;
            })
            .addCase(loadClientReservations.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(updateReservationState.fulfilled, (state, action) => {
                const { data, origin } = action.payload;
                if (origin == "artisan") {
                    const index = state.reservations.findIndex((reservation) => reservation._id === data._id);
                    state.reservations[index] = data;
                } else if (origin == "client") {
                    const clientIndex = state.clientReservations.findIndex((reservation) => reservation._id === data._id);
                    state.clientReservations[clientIndex] = data;
                }                
            })
            .addCase(updateReservationState.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(createReservation.fulfilled, (state, action) => {
                state.clientReservations.push(action.payload);
            })
            .addCase(createReservation.rejected, (state, action) => {
                console.error(action.error.message);
            })
    }
});

export default reservationSlice.reducer;