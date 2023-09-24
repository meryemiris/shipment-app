import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  errorMessage: string;
  errorTitle: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  errorMessage,
  errorTitle,
}) => {
  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      <AlertTitle>{errorTitle}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
