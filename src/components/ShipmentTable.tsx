import { Shipment } from "../store/shipment";
import { AppDispatch, RootState } from "../store/store";
import { fetchShipments } from "../store/shipment";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  TableContainer,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface ShipmentTableProps {
  shipments: Shipment[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  type FetchShipmentsThunk = ReturnType<typeof fetchShipments>;

  const shipmentStatus = useSelector(
    (state: RootState) => state.shipments.status
  );
  const error = useSelector((state: RootState) => state.shipments.error);

  useEffect(() => {
    if (shipmentStatus === "idle") {
      dispatch(fetchShipments() as FetchShipmentsThunk);
    }
  }, [shipmentStatus, dispatch]);

  const shipments = useSelector(
    (state: RootState) => state.shipments.shipments
  );

  if (shipmentStatus === "loading") {
    return "loading...";
  }

  if (shipmentStatus === "failed") {
    return error;
  }

  const mapShipments = () => {
    return shipments.map((shipment) => (
      <Tr key={shipment.orderNo}>
        <Td>{shipment.orderNo}</Td>
        <Td>{shipment.date}</Td>
        <Td>{shipment.customer}</Td>
        <Td>{shipment.trackingNo}</Td>
        <Td>{shipment.status}</Td>
        <Td>{shipment.consignee}</Td>
        <Td pr={1}>
          <ChakraLink
            as={ReactRouterLink}
            to={`/details/${shipment.orderNo}`}
            state={{ shipment }}
          >
            <IconButton
              aria-label="Show Shipment Details"
              icon={<EditIcon />}
            />
          </ChakraLink>
        </Td>
        <Td pl={1}>
          <IconButton aria-label="Delete Shipment" icon={<DeleteIcon />} />
        </Td>
      </Tr>
    ));
  };

  return (
    <TableContainer whiteSpace="pre-wrap">
      <Table maxWidth="100%" variant="striped">
        <Thead>
          <Tr>
            <Th>orderNo</Th>
            <Th>date</Th>
            <Th>customer</Th>
            <Th>trackingNo</Th>
            <Th>status</Th>
            <Th>consignee</Th>
          </Tr>
        </Thead>
        <Tbody>{mapShipments()}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentTable;
