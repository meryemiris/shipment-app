import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  errorMessage: string | null | undefined;
  errorTitle: string | null | undefined;
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
