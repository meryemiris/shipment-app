import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { actions, fetchShipments } from "../store/shipment";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Spinner,
  Flex,
} from "@chakra-ui/react";

import ErrorAlert from "./Error";
import ShipmentItem from "./ShipmentItem";

const shipmentHeadings = [
  "orderNo",
  "date",
  "customer",
  "trackingNo",
  "status",
  "consignee",
];

export default function ShipmentTable() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    dataStatus: loadingStatus,
    error: loadingError,
    shipments,
  } = useSelector((state: RootState) => state.shipmentsSlice);

  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(fetchShipments());
    }
  }, [loadingStatus, dispatch]);

  if (loadingStatus === "loading") {
    return (
      <Flex alignItems={"center"} justifyContent={"center"} mt={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
        />
      </Flex>
    );
  }

  if (loadingStatus === "failed") {
    return (
      <ErrorAlert
        errorMessage={loadingError!}
        errorTitle={"Failed to load shipment data. Please try again later."}
      />
    );
  }

  function handleRemoveShipment(orderNo: string) {
    dispatch(actions.removeShipment(orderNo));
  }

  return (
    <TableContainer whiteSpace="pre-wrap">
      <Table maxWidth="100%" variant="striped">
        <Thead>
          <Tr>
            {shipmentHeadings.map((h, index) => (
              <Th key={index}>{h}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {shipments.map((shipment) => (
            <ShipmentItem
              key={shipment.orderNo}
              shipment={shipment}
              onRemove={handleRemoveShipment}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
