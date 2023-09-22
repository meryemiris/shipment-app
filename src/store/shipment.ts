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
  reducers: {},
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
