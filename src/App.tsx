import ShipmentDetails from "./components/ShipmentDetails";
import ShipmentTable from "./components/ShipmentTable";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShipmentTable shipments={[]} />,
  },
  {
    path: "/details/:orderNo",
    element: <ShipmentDetails />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
