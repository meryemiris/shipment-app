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
  Select,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  isSelect: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  isSelect,
  onChange,
}) => (
  <FormControl mb={4}>
    <FormLabel>{label}</FormLabel>
    {isSelect ? (
      <Select
        size="sm"
        name={name}
        placeholder={value}
        variant="filled"
        onChange={(e) => onChange(e)}
      >
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.statusName}
          </option>
        ))}
      </Select>
    ) : (
      <Input
        size="sm"
        type="text"
        name={name}
        defaultValue={value}
        variant="filled"
        onChange={(e) => onChange(e)}
      />
    )}
  </FormControl>
);

const selectOptions = [
  { statusName: "'Shipped'", value: "'Shipped'" },
  { statusName: "'Delivered'", value: "'Delivered'" },
  { statusName: "'In Transit'", value: "'In Transit'" },
];

const ShipmentDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  type FetchShipmentsThunk = ReturnType<typeof fetchShipments>;

  const shipmentStatus = useSelector(
    (state: RootState) => state.shipments.dataStatus
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
        p={5}
        m={3}
        boxShadow="sm"
      >
        <Heading as="h2" color="gray.600" fontWeight="medium" size="sm" pb="6">
          SHIPMENT DETAILS
        </Heading>

        {existingShipment ? (
          <form onSubmit={handleUpdateShipment}>
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
                  isSelect: true,
                  selectOptions: selectOptions,
                },
              ].map((field, index) => (
                <GridItem colSpan={1} key={index}>
                  <FormInput
                    {...field}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                    ) => handleFieldChange(field.name, e.target.value)}
                    isSelect={field.name === "status"}
                  />
                </GridItem>
              ))}
            </Grid>
            <Flex mt={5} justifyContent={"flex-end"}>
              <Button colorScheme="teal" type="submit">
                Save Changes
              </Button>
            </Flex>
          </form>
        ) : (
          <p>some error message</p>
        )}

        <ChakraLink as={ReactRouterLink} to={`/`}>
          <Button
            size={"sm"}
            color={"gray.500"}
            leftIcon={<ArrowBackIcon />}
            variant="outline"
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
