import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";

import { AppDispatch, RootState } from "../store/store";
import { actions, fetchShipments, Shipment } from "../store/shipment";

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Heading,
  Grid,
  GridItem,
  Box,
  Flex,
  Spinner,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";

import FormInput from "./FormInput";

const ShipmentDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { dataStatus: loadingStatus, error: loadingError } = useSelector(
    (state: RootState) => state.shipments
  );

  const { orderNo } = useParams<{ orderNo: string }>();

  const existingShipment = useSelector((state: RootState) =>
    state.shipments.shipments.find((s) => s.orderNo === orderNo)
  );

  const [shipment, setShipment] = useState<Shipment | undefined>(
    existingShipment
  );

  type FetchShipmentsThunk = ReturnType<typeof fetchShipments>;

  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(fetchShipments() as FetchShipmentsThunk);
    }
  }, [loadingStatus, dispatch]);

  if (loadingStatus === "loading") {
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
  if (loadingStatus === "failed") {
    return loadingError;
  } // add error message

  const handleFieldChange = (fieldName: string, value: string) => {
    setShipment((prevShipment) => ({
      ...prevShipment!,
      [fieldName]: value,
    }));
  };

  function handleUpdateShipment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      actions.updateShipment({
        ...shipment,
      })
    );
    navigate("/");
  }

  const selectOptions = [
    { statusName: "'Shipped'", value: "'Shipped'" },
    { statusName: "'Delivered'", value: "'Delivered'" },
    { statusName: "'In Transit'", value: "'In Transit'" },
  ];

  interface FormField {
    label: string;
    name: string;
    isSelect: boolean;
    isReadOnly: boolean;
    selectOptions?: { statusName: string; value: string }[];
  }

  const formFields: FormField[] = [
    { label: "order No", name: "orderNo", isSelect: false, isReadOnly: true },
    { label: "date", name: "date", isSelect: false, isReadOnly: false },
    { label: "customer", name: "customer", isSelect: false, isReadOnly: false },
    {
      label: "trackingNo",
      name: "trackingNo",
      isSelect: false,
      isReadOnly: false,
    },
    {
      label: "consignee",
      name: "consignee",
      isSelect: false,
      isReadOnly: false,
    },
    {
      label: "status",
      name: "status",
      isSelect: true,
      selectOptions,
      isReadOnly: false,
    },
  ];

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
              {formFields.map((field, index) => (
                <GridItem colSpan={1} key={index}>
                  <FormInput
                    label={field.label}
                    name={field.name}
                    value={existingShipment[field.name]}
                    onChange={(e) =>
                      handleFieldChange(field.name, e.target.value)
                    }
                    isSelect={field.isSelect}
                    isReadOnly={field.isReadOnly}
                    selectOptions={field.selectOptions}
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
          //add error message
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
