import { Shipment } from "../store/shipment";

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

const ShipmentTable: React.FC<ShipmentTableProps> = ({ shipments }) => {
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
        {shipments.map((shipment) => (
          <Tbody key={shipment.orderNo}>
            <Tr>
              <Td>{shipment.orderNo}</Td>
              <Td>{shipment.date}</Td>
              <Td>{shipment.customer}</Td>
              <Td>{shipment.trackingNo}</Td>
              <Td>{shipment.status}</Td>
              <Td>{shipment.consignee}</Td>
              <Td>
                <IconButton
                  aria-label="Show Shipment Details"
                  icon={<EditIcon />}
                />
                <IconButton
                  aria-label="Show Shipment Details"
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </TableContainer>
  );
};

export default ShipmentTable;
