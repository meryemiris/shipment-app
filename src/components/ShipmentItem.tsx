import { Link as ReactRouterLink } from "react-router-dom";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Tr, Td, IconButton } from "@chakra-ui/react";
import { Shipment } from "../store/shipment";

interface ShipmentItemProps {
  onRemove: (orderNo: string) => void;
  shipment: Shipment;
}

const ShipmentItem: React.FC<ShipmentItemProps> = ({ onRemove, shipment }) => {
  return (
    <Tr>
      <Td>{shipment.orderNo}</Td>
      <Td>{shipment.date}</Td>
      <Td>{shipment.customer}</Td>
      <Td>{shipment.trackingNo}</Td>
      <Td>{shipment.status}</Td>
      <Td>{shipment.consignee}</Td>
      <Td pr={1}>
        <ChakraLink as={ReactRouterLink} to={`/details/${shipment.orderNo}`}>
          <IconButton
            size={"lg"}
            background="none"
            aria-label="Show Shipment Details"
            icon={<EditIcon color={"blue.500"} />}
          />
        </ChakraLink>
      </Td>
      <Td pl={1}>
        <IconButton
          size={"lg"}
          onClick={() => onRemove(shipment.orderNo)}
          background="none"
          aria-label="Delete Shipment"
          icon={<DeleteIcon color={"red.500"} />}
        />
      </Td>
    </Tr>
  );
};

export default ShipmentItem;
