import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Shipment {
  orderNo: string;
  date: string;
  customer: string;
  trackingNo: string;
  status: string;
  consignee: string;
}

interface ShipmentState {
  shipments: Shipment[];
  selectedShipment: Shipment | null;
}

const initialState: ShipmentState = {
  shipments: [],
  selectedShipment: null,
};

const shipment = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipments: (state, action: PayloadAction<Shipment[]>) => {
      state.shipments = action.payload;
    },
    setSelectedShipment: (state, action: PayloadAction<Shipment | null>) => {
      state.selectedShipment = action.payload;
    },
  },
});

export const { setShipments, setSelectedShipment } = shipment.actions;
export default shipment.reducer;
