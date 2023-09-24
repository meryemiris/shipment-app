import {
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  value: string;
  isSelect: boolean;
  isReadOnly: boolean;
  isRequired: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  selectOptions: { statusName: string; value: string }[] | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  isSelect,
  isReadOnly,
  isRequired,
  onChange,
  selectOptions,
}) => {
  const isEmpty = value === "";

  return (
    <FormControl isInvalid={isEmpty} isRequired={isEmpty} mb={4}>
      <FormLabel>{label}</FormLabel>
      {isSelect ? (
        <Select
          size="sm"
          placeholder={value}
          variant="filled"
          onChange={(e) => onChange(e)}
        >
          {selectOptions &&
            selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.statusName}
              </option>
            ))}
        </Select>
      ) : (
        <Input
          size="sm"
          type="text"
          defaultValue={value}
          variant="filled"
          onChange={(e) => onChange(e)}
          readOnly={isReadOnly}
          required={isRequired}
        />
      )}
      {isEmpty && (
        <FormErrorMessage>Please fill in this field.</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormInput;
