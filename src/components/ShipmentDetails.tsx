import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
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
import { useSelector } from "react-redux";

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

const ShipmentDetails: React.FC = () => {
  useEffect(() => {
    dispatch(fetchShipmentByOrderNo(orderNo));
  }, [dispatch, orderNo]);

  const { orderNo } = useParams<{ orderNo: string }>();
  const shipment = useSelector((state: RootState) =>
    state.shipments.shipments.find((s) => s.orderNo === orderNo)
  );

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

        {shipment ? (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {[
              { label: "order No", name: "orderNo", value: shipment.orderNo },
              { label: "date", name: "date", value: shipment.date },
              { label: "customer", name: "customer", value: shipment.customer },
              {
                label: "trackingNo",
                name: "trackingNo",
                value: shipment.trackingNo,
              },
              {
                label: "consignee",
                name: "consignee",
                value: shipment.consignee,
              },
              { label: "status", name: "status", value: shipment.status },
            ].map((field, index) => (
              <GridItem colSpan={1} key={index}>
                <FormInput {...field} />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </Flex>
  );
};

export default ShipmentDetails;
