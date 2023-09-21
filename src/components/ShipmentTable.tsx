import { Shipment } from "../store/shipment";
import { RootState } from "../store/store";
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
  TableContainer,
  IconButton,
  Box,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface ShipmentTableProps {
  shipments: Shipment[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = () => {
  const dispatch = useDispatch();
  type FetchShipmentsThunk = ReturnType<typeof fetchShipments>;

  useEffect(() => {
    dispatch(fetchShipments() as FetchShipmentsThunk);
  }, [dispatch]);

  const shipments = useSelector((state: RootState) => state.shipment.shipments);
  const isLoading = useSelector((state: RootState) => state.shipment.isLoading);
  const error = useSelector((state: RootState) => state.shipment.error);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
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
        <Td>
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
          <IconButton aria-label="Delete Shipment" icon={<DeleteIcon />} />
        </Td>
      </Tr>
    ));
  };

  return (
    <Box overflow={"auto"} maxWidth={"100%"}>
      <TableContainer>
        <Table size="sm" variant="striped">
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
    </Box>
  );
};

export default ShipmentTable;
