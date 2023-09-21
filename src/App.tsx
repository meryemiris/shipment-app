import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setShipments } from "./store/shipment";
import { RootState } from "./store/store";

import axios from "axios";
import ShipmentsTable from "./components/ShipmentTable";

function App() {
  const dispatch = useDispatch();
  const shipments = useSelector((state: RootState) => state.shipment.shipments);

  useEffect(() => {
    axios
      .get("../../shipment.txt")
      .then((response) => {
        dispatch(setShipments(response.data));
      })
      .catch((error) => {
        console.error("Error loading shipments:", error);
      });
  }, [dispatch]);

  return <ShipmentsTable shipments={shipments} />;
}

export default App;
