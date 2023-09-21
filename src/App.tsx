import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShipments } from "./store/shipment";

import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/shipments.json?key=5e0b62d0")
      .then((response) => {
        dispatch(setShipments(response.data));
      })
      .catch((error) => {
        console.error("Error loading shipments:", error);
      });
  }, [dispatch]);

  return <></>;
}

export default App;
