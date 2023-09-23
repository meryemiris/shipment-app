import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  isSelect: boolean;
  isReadOnly: boolean;
  onChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  selectOptions: { statusName: string; value: string }[] | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  isSelect,
  isReadOnly,
  onChange,
  selectOptions,
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
        name={name}
        defaultValue={value}
        variant="filled"
        onChange={(e) => onChange(e)}
        readOnly={isReadOnly}
      />
    )}
  </FormControl>
);

export default FormInput;
