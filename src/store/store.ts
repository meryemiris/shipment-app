import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./shipment";

const store = configureStore({
  reducer: {
    shipment: shipmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
