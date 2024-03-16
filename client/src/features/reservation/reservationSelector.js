export const selectReservations = (state) => state.reservation.reservations;

export const selectClientReservations = (state) => state.reservation.clientReservations;

export const selectLoading = (state) => state.reservation.loading;

export const selectEditing = (state) => state.reservation.editing;

export const selectEditingReservationId = (state) => state.reservation.editingReservationId;