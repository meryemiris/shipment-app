import { Shipment } from "../store/shipment";
import { setShipments } from "../store/shipment";
import { RootState } from "../store/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface ShipmentTableProps {
  shipments: Shipment[];
}

const ShipmentTable: React.FC<ShipmentTableProps> = () => {
  const dispatch = useDispatch();
  const shipments = useSelector((state: RootState) => state.shipment.shipments);

  useEffect(() => {
    axios
      .get("../../shipment.txt")
      .then((response) => dispatch(setShipments(response.data)))
      .catch((error) => console.error("Error loading shipments:", error));
  }, [dispatch]);

  const mapShipments = () => {
    return shipments.map((shipment) => (
      <Tbody key={shipment.orderNo}>
        <Tr>
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
      </Tbody>
    ));
  };

  return (
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
        {mapShipments()}
      </Table>
    </TableContainer>
  );
};

export default ShipmentTable;
