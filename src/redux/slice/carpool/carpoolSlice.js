import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookCarpool as bookCarpoolApi,
  deleteCarpool as deleteCarpoolApi,
  deleteBooking as deleteBookingApi,
  getCarpoolsAvailableForBooking,
  getCarpoolsByDriverId,
  createNewCarpool,
  getBookings,
} from "../../../apiService/coreApi";
import {
  LOADING_STATUS_IDLE,
  LOADING_STATUS_PENDING,
} from "../../model/loadingStatus";
import {
  filterByDropOffLocation,
  filterByPickUpLocation,
} from "./carpoolSliceHelper";

const initialState = {
  all: [],
  loadingStatus: LOADING_STATUS_IDLE,
  error: null,
};
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
    filterCarpool: (state, action) => {
      const { pickUpLocation, dropOffLocation } = action.payload;

      if (!pickUpLocation && !dropOffLocation) {
        return;
      }

      if (pickUpLocation) {
        state.all = state.all.filter((carpool) =>
          pickUpLocation
            .toLowerCase()
            .includes(carpool.pickUpLocation.toLowerCase())
        );
      }

      if (dropOffLocation) {
        state.all = state.all.filter((carpool) =>
          dropOffLocation
            .toLowerCase()
            .includes(carpool.dropOffLocation.toLowerCase())
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      /**
       * loadCarpoolsForBooking
       */
      .addCase(loadCarpoolsForBooking.fulfilled, (state, action) => {
        if (state.loadingStatus === LOADING_STATUS_PENDING) {
          state.loadingStatus = LOADING_STATUS_IDLE;
          state.all = [];
          state.all = state.all.concat(action.payload);
          state.error = null;
        }
      })
      .addCase(loadCarpoolsForBooking.pending, handlePendingCase)
      .addCase(loadCarpoolsForBooking.rejected, handleRejectedCase)
      /**
       * bookCarpool
       */
      .addCase(bookCarpool.fulfilled, (state, action) => {
        state.all = state.all.map((carpool) => {
          if (carpool.carpoolId === action.payload.carpoolId) {
            // return updated carpool from API call
            return action.payload;
          }
          return carpool;
        });
      })
      /**
       * loadCarpoolsByDriverId
       */
      .addCase(loadCarpoolsByDriverId.fulfilled, (state, action) => {
        if (state.loadingStatus === LOADING_STATUS_PENDING) {
          state.loadingStatus = LOADING_STATUS_IDLE;
          state.error = null;

          mergeCarpoolLists(action.payload, state.all);
        }
      })
      .addCase(loadCarpoolsByDriverId.pending, handlePendingCase)
      .addCase(loadCarpoolsByDriverId.rejected, handleRejectedCase)
      /**
       * loadCarpoolsByPassengerId
       */
      .addCase(loadCarpoolsByPassengerId.fulfilled, (state, action) => {
        if (state.loadingStatus === LOADING_STATUS_PENDING) {
          state.loadingStatus = LOADING_STATUS_IDLE;
          state.error = null;

          mergeCarpoolLists(action.payload, state.all);
        }
      })
      .addCase(loadCarpoolsByPassengerId.pending, handlePendingCase)
      .addCase(loadCarpoolsByPassengerId.rejected, handleRejectedCase)
      /**
       * deleteCarpool
       */
      .addCase(deleteCarpool.fulfilled, (state, action) => {
        state.all = state.all.filter(
          (carpool) => carpool.carpoolId !== action.payload
        );
        state.error = null;
      })
      /**
       * deleteBooking
       */
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.all = state.all.map((carpool) => {
          if (carpool.carpoolId === action.payload.carpoolId) {
            // return updated carpool from API call
            return action.payload;
          }
          return carpool;
        });
      })
      /**
       * addCarpool
       */
      .addCase(addCarpool.fulfilled, (state, action) => {
        state.all = [...state.all, action.payload];
        state.error = null;
      });
  },
});

const handleRejectedCase = (state, action) => {
  if (state.loadingStatus === LOADING_STATUS_PENDING) {
    state.loadingStatus = LOADING_STATUS_IDLE;
    state.error = action.error;
  }
};

const handlePendingCase = (state, action) => {
  if (state.loadingStatus === LOADING_STATUS_IDLE) {
    state.loadingStatus = LOADING_STATUS_PENDING;
  }
};

const mergeCarpoolLists = (fromCarpools, toCarpools) => {
  fromCarpools.forEach((carpool) => {
    if (
      !toCarpools.find(
        (carpoolInState) => carpool.carpoolId === carpoolInState.carpoolId
      )
    ) {
      toCarpools.push(carpool);
    }
  });
};

/**
 * ASYNC CALLS
 */
export const loadCarpoolsForBooking = createAsyncThunk(
  "carpool/loadCarpoolsForBooking",
  async ({ userId, pickUpDate }) => {
    const carpools = await getCarpoolsAvailableForBooking(userId, pickUpDate);
    return carpools;
  }
);

export const loadCarpoolsByDriverId = createAsyncThunk(
  "carpool/loadMyCarpools",
  async (userId) => {
    const carpools = await getCarpoolsByDriverId(userId);
    return carpools;
  }
);

export const loadCarpoolsByPassengerId = createAsyncThunk(
  "carpool/loadCarpoolsByPassengerId",
  async (userId) => {
    const carpools = await getBookings(userId);
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

export const deleteCarpool = createAsyncThunk(
  "carpool/deleteCarpool",
  async (carpoolId) => {
    await deleteCarpoolApi(carpoolId);
    return carpoolId;
  }
);

export const deleteBooking = createAsyncThunk(
  "carpool/deleteBooking",
  async ({ carpool, user }) => {
    return await deleteBookingApi(carpool, user);
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
export const selectCarpoolsForBooking = (
  state,
  userId,
  pickUpLocation,
  dropOffLocation
) => {
  console.log(
    `selectCarpoolsForBooking START - Filters: '${pickUpLocation}', '${dropOffLocation}'`
  );
  return state.carpool.all.filter((carpool) => {
    return (
      carpool.status === "Open" &&
      carpool.driverId !== userId &&
      !carpool.registeredPassengers.some(
        (passenger) => passenger.passengerId === userId
      ) &&
      filterByPickUpLocation(carpool, pickUpLocation) &&
      filterByDropOffLocation(carpool, dropOffLocation)
    );
  });
};

export const selectMyCarpools = (state, userId) => {
  return state.carpool.all.filter((carpool) => carpool.driverId === userId);
};

export const selectMyBookedCarpools = (state, userId) => {
  return state.carpool.all.filter((carpool) =>
    carpool.registeredPassengers.some(
      (passenger) => passenger.passengerId === userId
    )
  );
};

export const { updateCarpool, filterCarpool } = carpoolSlice.actions;

export default carpoolSlice.reducer;
