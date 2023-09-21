import { useLocation } from "react-router-dom";

import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Box,
  Flex,
} from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, value }) => (
  <FormControl mb={4}>
    <FormLabel>{label}</FormLabel>
    <Input
      size="sm"
      type="text"
      name={name}
      defaultValue={value}
      variant="filled"
    />
  </FormControl>
);

export default function ShipmentDetails() {
  const location = useLocation();
  const { shipment } = location.state;

  const formFields = [
    { label: "order No", name: "orderNo", value: shipment.orderNo },
    { label: "date", name: "date", value: shipment.date },
    { label: "customer", name: "customer", value: shipment.customer },
    { label: "trackingNo", name: "trackingNo", value: shipment.trackingNo },
    { label: "consignee", name: "consignee", value: shipment.consignee },
    { label: "status", name: "status", value: shipment.status },
  ];
  return (
    <Flex minWidth="80vh" flexDirection={"column"}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        m={6}
        boxShadow="md"
      >
        <Heading color="gray" fontWeight="medium" size="sm" pb="6">
          SHIPMENT DETAILS
        </Heading>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {formFields.map((field, index) => (
            <GridItem colSpan={1} key={index}>
              <FormInput {...field} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}
