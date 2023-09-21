import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";

const formFields = [
  { label: "order No", name: "orderNo", defaultValue: "order no" },
  { label: "date", name: "date", defaultValue: "date" },
  { label: "customer", name: "customer", defaultValue: "customer" },
  { label: "trackingNo", name: "trackingNo", defaultValue: "trackingNo" },
  { label: "consignee", name: "consignee", defaultValue: "consignee" },
  { label: "status", name: "status", defaultValue: "status" },
];

interface FormInputProps {
  label: string;
  name: string;
  defaultValue: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, name, defaultValue }) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Input
      size="sm"
      type="text"
      name={name}
      defaultValue={defaultValue}
      variant="filled"
    />
  </FormControl>
);

export default function ShipmentDetails() {
  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
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
  );
}
