import { configureStore } from "@reduxjs/toolkit";
import carpoolReducer from "./slice/carpool/carpoolSlice";

const store = configureStore({
  reducer: { carpool: carpoolReducer },
});

export default store;
