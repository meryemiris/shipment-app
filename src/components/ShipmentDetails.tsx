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
import ErrorAlert from "./Error";

const selectOptions = [
  { statusName: "'Shipped'", value: "'Shipped'" },
  { statusName: "'Delivered'", value: "'Delivered'" },
  { statusName: "'In Transit'", value: "'In Transit'" },
];

interface FormField {
  label: string;
  name: keyof Shipment;
  isSelect: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  selectOptions?: { statusName: string; value: string }[];
}

const formFields: FormField[] = [
  {
    label: "Order No",
    name: "orderNo",
    isSelect: false,
    isReadOnly: true,
    isRequired: false,
  },
  {
    label: "Date",
    name: "date",
    isSelect: false,
    isReadOnly: false,
    isRequired: true,
  },
  {
    label: "Customer",
    name: "customer",
    isSelect: false,
    isReadOnly: false,
    isRequired: true,
  },
  {
    label: "Tracking No",
    name: "trackingNo",
    isSelect: false,
    isReadOnly: false,
    isRequired: true,
  },
  {
    label: "Consignee",
    name: "consignee",
    isSelect: false,
    isReadOnly: false,
    isRequired: true,
  },
  {
    label: "Status",
    name: "status",
    isSelect: true,
    isReadOnly: false,
    isRequired: false,
    selectOptions,
  },
];

const ShipmentDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { dataStatus: loadingStatus, error: loadingError } = useSelector(
    (state: RootState) => state.shipmentsSlice
  );

  const { orderNo } = useParams<{ orderNo: string }>();

  const existingShipment = useSelector((state: RootState) =>
    state.shipmentsSlice.shipments.find((s) => s.orderNo === orderNo)
  );

  const [shipment, setShipment] = useState<Shipment | undefined>(
    existingShipment
  );

  useEffect(() => {
    if (existingShipment) {
      setShipment(existingShipment);
    }
  }, [existingShipment]);

  useEffect(() => {
    if (loadingStatus === "idle") {
      dispatch(fetchShipments());
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
    return (
      <ErrorAlert
        errorMessage={loadingError!}
        errorTitle={"Failed to load shipment data. Please try again later."}
      />
    );
  }

  const handleFieldChange = (fieldName: string, value: string) => {
    setShipment((prevShipment) => ({
      ...prevShipment!,
      [fieldName]: value,
    }));
  };

  function handleUpdateShipment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(actions.updateShipment(shipment));
    navigate("/");
  }

  return (
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

      {shipment ? (
        <form onSubmit={handleUpdateShipment}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {formFields.map((field, index) => (
              <GridItem colSpan={1} key={index}>
                <FormInput
                  label={field.label}
                  value={shipment[field.name]}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  isSelect={field.isSelect}
                  isReadOnly={field.isReadOnly}
                  isRequired={field.isRequired}
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
        <ErrorAlert
          errorMessage={"Please check the order number."}
          errorTitle={"Shipment not found."}
        />
      )}

      <ChakraLink as={ReactRouterLink} to={`/`}>
        <Button
          mt={5}
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
  );
};

export default ShipmentDetails;
