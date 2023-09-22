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
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: ShipmentState = {
  shipments: [],
  selectedShipment: null,
  isLoading: false,
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
      state.isLoading = true;
    });
    builder.addCase(fetchShipments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shipments = action.payload;
    });
    builder.addCase(fetchShipments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default shipmentsSlice.reducer;
