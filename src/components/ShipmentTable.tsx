import { useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { fetchShipments, actions } from "../store/shipment";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
  Spinner,
  Flex,
} from "@chakra-ui/react";

export default function ShipmentTable() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    dataStatus: loadingStatus,
    error: loadingError,
    shipments: shipments,
  } = useSelector((state: RootState) => state.shipments);

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
    return loadingError;
    //add error message
  }

  function handleRemoveShipment(orderNo: string) {
    dispatch(actions.removeShipment(orderNo));
  }

  const mapShipments = () => {
    return shipments.map((shipment, index) => (
      <Tr key={index}>
        <Td>{shipment.orderNo}</Td>
        <Td>{shipment.date}</Td>
        <Td>{shipment.customer}</Td>
        <Td>{shipment.trackingNo}</Td>
        <Td>{shipment.status}</Td>
        <Td>{shipment.consignee}</Td>
        <Td pr={1}>
          <ChakraLink as={ReactRouterLink} to={`/details/${shipment.orderNo}`}>
            <IconButton
              background="none"
              aria-label="Show Shipment Details"
              icon={<EditIcon color={"blue.500"} />}
            />
          </ChakraLink>
        </Td>
        <Td pl={1}>
          <IconButton
            onClick={() => handleRemoveShipment(shipment.orderNo)}
            background="none"
            aria-label="Delete Shipment"
            icon={<DeleteIcon color={"red.500"} />}
          />
        </Td>
      </Tr>
    ));
  };

  const shipmentHeadings = [
    "orderNo",
    "date",
    "customer",
    "trackingNo",
    "status",
    "consignee",
  ];

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
        <Tbody>{mapShipments()}</Tbody>
      </Table>
    </TableContainer>
  );
}
