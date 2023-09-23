import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { actions, fetchShipments } from "../store/shipment";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Shipment } from "../store/shipment";

import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Box,
  Flex,
  Spinner,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,

  onChange,
}) => (
  <FormControl mb={4}>
    <FormLabel>{label}</FormLabel>
    <Input
      size="sm"
      type="text"
      name={name}
      defaultValue={value}
      variant="filled"
      onChange={onChange}
    />
  </FormControl>
);

const ShipmentDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  type FetchShipmentsThunk = ReturnType<typeof fetchShipments>;

  const shipmentStatus = useSelector(
    (state: RootState) => state.shipments.status
  );

  const error = useSelector((state: RootState) => state.shipments.error);

  const { orderNo } = useParams<{ orderNo: string }>();

  const existingShipment = useSelector((state: RootState) =>
    state.shipments.shipments.find((s) => s.orderNo === orderNo)
  );

  const [shipment, setShipment] = useState<Shipment | undefined>(
    existingShipment
  );

  const handleFieldChange = (fieldName: string, value: string) => {
    setShipment((prevShipment) => ({
      ...prevShipment!,
      [fieldName]: value,
    }));
    console.log(shipment);
  };

  useEffect(() => {
    if (shipmentStatus === "idle") {
      dispatch(fetchShipments() as FetchShipmentsThunk);
    }
  }, [shipmentStatus, dispatch]);

  if (shipmentStatus === "loading") {
    return (
      <Flex alignItems={"center"} justifyContent={"center"} mb={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
        />
      </Flex>
    );
  }

  if (shipmentStatus === "failed") {
    return error;
  }

  function handleUpdateShipment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      actions.updateShipment({
        ...shipment,
      })
    );
    navigate("/");
  }

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

        {existingShipment ? (
          <form onSubmit={handleUpdateShipment}>
            {" "}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {[
                {
                  label: "order No",
                  name: "orderNo",
                  value: existingShipment.orderNo,
                },
                { label: "date", name: "date", value: existingShipment.date },
                {
                  label: "customer",
                  name: "customer",
                  value: existingShipment.customer,
                },
                {
                  label: "trackingNo",
                  name: "trackingNo",
                  value: existingShipment.trackingNo,
                },
                {
                  label: "consignee",
                  name: "consignee",
                  value: existingShipment.consignee,
                },
                {
                  label: "status",
                  name: "status",
                  value: existingShipment.status,
                },
              ].map((field, index) => (
                <GridItem colSpan={1} key={index}>
                  <FormInput
                    {...field}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                  />
                </GridItem>
              ))}
              <Button type="submit">Save</Button>
            </Grid>
          </form>
        ) : (
          <p>some error message</p>
        )}

        <ChakraLink as={ReactRouterLink} to={`/`}>
          <Button
            mt={10}
            size={"sm"}
            color={"gray.500"}
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            aria-label="Back to All Shipments"
          >
            Back to All
          </Button>
        </ChakraLink>
      </Box>
    </Flex>
  );
};

export default ShipmentDetails;
