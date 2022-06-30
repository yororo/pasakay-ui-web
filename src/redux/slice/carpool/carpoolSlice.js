import { createSlice } from "@reduxjs/toolkit";

export const carpoolSlice = createSlice({
  name: "carpool",
  initialState: { all: [], mine: [] },
  reducers: {
    loadCarpools: (state, action) => {
      state.all = action.payload;
    },
    addCarpool: (state, action) => {
      state.all = [...state.all, action.payload];
    },
    // deleteCarpool: (state, action) => {
    //   state.value = state.value.filter(
    //     (carpool) => carpool.carpoolId !== action.payload.carpoolId
    //   );
    // },
    updateCarpool: (state, action) => {
      state.all = state.all.map((carpool) => {
        if (carpool.carpoolId === action.payload.carpoolId) {
          console.log("updating: ", carpool);
          return action.payload;
        }
        return carpool;
      });
    },
  },
});

export const { loadCarpools, addCarpool, deleteCarpool, updateCarpool } =
  carpoolSlice.actions;

export default carpoolSlice.reducer;
