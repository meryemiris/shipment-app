import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Shipment {
  orderNo: string;
  date: string;
  customer: string;
  trackingNo: string;
  status: string;
  consignee: string;
}

export interface ShipmentState {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ShipmentState = {
  shipments: [],
  selectedShipment: null,
  status: "idle",
  error: null,
};

// https://my.api.mockaroo.com/shipments.json?key=5e0b62d0
// ../../shipment.txt
export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async () => {
    const response = await axios.get("../../shipment.txt");

    return response.data;
  }
);

export const shipmentsSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    removeShipment: (state, action) => {
      const orderNo = action.payload;
      state.shipments = state.shipments.filter(
        (shipment) => shipment.orderNo !== orderNo
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShipments.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShipments.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.shipments = state.shipments.concat(action.payload);
    });
    builder.addCase(fetchShipments.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default shipmentsSlice.reducer;
export const { reducer: shipmentsReducer, actions } = shipmentsSlice;
