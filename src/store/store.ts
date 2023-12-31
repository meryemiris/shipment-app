import { configureStore } from "@reduxjs/toolkit";
import shipmentsReducer from "./shipment";

const store = configureStore({
  reducer: {
    shipmentsSlice: shipmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
