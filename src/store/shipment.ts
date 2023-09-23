import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Shipment {
  orderNo: string;
  date: string;
  customer: string;
  trackingNo: string;
  status: "Shipped" | "Delivered" | "In Transit";
  consignee: string;
  [key: string]: string;
}

export interface ShipmentState {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
  dataStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ShipmentState = {
  shipments: [],
  selectedShipment: null,
  dataStatus: "idle",
  error: null,
};

// https://my.api.mockaroo.com/shipments.json?key=5e0b62d0
// ../../shipment.txt
export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async () => {
    const response = await axios.get("/shipment.json");

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
    updateShipment(state, action) {
      const { orderNo, date, customer, trackingNo, status, consignee } =
        action.payload;
      const existingShipment = state.shipments.find(
        (shipment) => shipment.orderNo === orderNo
      );
      if (existingShipment) {
        existingShipment.date = date;
        existingShipment.customer = customer;
        existingShipment.trackingNo = trackingNo;
        existingShipment.status = status;
        existingShipment.consignee = consignee;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShipments.pending, (state) => {
      state.dataStatus = "loading";
    });
    builder.addCase(fetchShipments.fulfilled, (state, action) => {
      state.dataStatus = "succeeded";
      state.shipments = action.payload;
    });
    builder.addCase(fetchShipments.rejected, (state, action) => {
      state.dataStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export default shipmentsSlice.reducer;
export const { reducer: shipmentsReducer, actions } = shipmentsSlice;
