import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookCarpool as bookCarpoolApi,
  deleteCarpool as deleteCarpoolApi,
  getCarpoolsAvailableForBooking,
  getCarpoolsByDriverId,
  createNewCarpool,
} from "../../../apiService/coreApi";

const initialState = { all: [] };
export const carpoolSlice = createSlice({
  name: "carpool",
  initialState,
  reducers: {
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
  extraReducers(builder) {
    builder
      .addCase(loadCarpoolsForBooking.fulfilled, (state, action) => {
        state.all = [];
        state.all = state.all.concat(action.payload);
      })
      .addCase(bookCarpool.fulfilled, (state, action) => {
        state.all = state.all.map((carpool) => {
          if (carpool.carpoolId === action.payload.carpoolId) {
            // return updated carpool from API call
            return action.payload;
          }
          return carpool;
        });
      })
      .addCase(loadCarpoolsByDriverId.fulfilled, (state, action) => {
        action.payload.forEach((carpool) => {
          if (
            !state.all.find(
              (carpoolInState) => carpool.carpoolId === carpoolInState.carpoolId
            )
          ) {
            state.all.push(carpool);
          }
        });
      })
      .addCase(deleteCarpool.fulfilled, (state, action) => {
        state.all = state.all.filter(
          (carpool) => carpool.carpoolId !== action.payload
        );
      })
      .addCase(addCarpool.fulfilled, (state, action) => {
        state.all = [...state.all, action.payload];
      });
  },
});

/**
 * ASYNC CALLS
 */
export const loadCarpoolsForBooking = createAsyncThunk(
  "carpool/loadCarpoolsForBooking",
  async (userId) => {
    const carpools = await getCarpoolsAvailableForBooking(userId);
    return carpools;
  }
);

export const bookCarpool = createAsyncThunk(
  "carpool/bookCarpool",
  async ({ carpool, user }) => {
    const bookedCarpool = await bookCarpoolApi(carpool, user);
    return bookedCarpool;
  }
);

export const loadCarpoolsByDriverId = createAsyncThunk(
  "carpool/loadMyCarpools",
  async (userId) => {
    const carpools = await getCarpoolsByDriverId(userId);
    return carpools;
  }
);

export const deleteCarpool = createAsyncThunk(
  "carpool/deleteCarpool",
  async (carpoolId) => {
    await deleteCarpoolApi(carpoolId);
    return carpoolId;
  }
);

export const addCarpool = createAsyncThunk(
  "carpool/addCarpool",
  async ({ carpool, user }) => {
    const newCarpool = await createNewCarpool(carpool, user);
    return newCarpool;
  }
);

/**
 * SELECTORS
 */
export const selectCarpoolsForBooking = (state, userId) =>
  state.carpool.all.filter((carpool) => {
    return (
      carpool.status === "Open" &&
      carpool.driverId !== userId &&
      !carpool.registeredPassengers.some(
        (passenger) => passenger.passengerId === userId
      )
    );
  });

export const selectMyCarpools = (state, userId) => {
  return state.carpool.all.filter((carpool) => carpool.driverId === userId);
};

export const { updateCarpool } = carpoolSlice.actions;

export default carpoolSlice.reducer;
