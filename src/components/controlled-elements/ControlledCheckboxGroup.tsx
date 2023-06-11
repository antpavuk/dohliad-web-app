import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  SxProps,
  Theme,
  FormGroupProps
} from '@mui/material';

interface ControlledCheckboxGroupProps<T extends FieldValues> extends Omit<FormGroupProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  options: {
    label: string | number;
    value: string | number;
  }[];
  sx?: SxProps<Theme>;
  label?: string;
  error?: boolean;
}

const ControlledCheckboxGroup = <T extends FieldValues>({
  name,
  control,
  sx,
  label,
  options,
  error,
  ...props
}: ControlledCheckboxGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={error}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormGroup sx={sx} {...props}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value ? field.value.includes(option.value) : false} // Check if option value is included in the array value
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      let updatedValue: unknown[];

                      if (isChecked) {
                        updatedValue = field.value
                          ? [...field.value, option.value]
                          : [option.value];
                      } else {
                        updatedValue = field.value
                          ? field.value.filter((val: unknown) => val !== option.value)
                          : [];
                      }

                      field.onChange(updatedValue);
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    />
  );
};

export default ControlledCheckboxGroup;
