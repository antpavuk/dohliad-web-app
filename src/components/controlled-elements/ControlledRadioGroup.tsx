import { FC } from 'react';
import { Controller, Control, ControllerProps, FieldValues, Path } from 'react-hook-form';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  SxProps,
  Theme,
  RadioGroupProps
} from '@mui/material';

interface ControlledRadioGroupProps<T extends FieldValues> extends Omit<RadioGroupProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  options: {
    label: string;
    value: string;
  }[];
  sx?: SxProps<Theme>;
  label?: string;
  error?: boolean;
}

const ControlledRadioGroup = <T extends FieldValues>({
  name,
  control,
  sx,
  label,
  options,
  error
}: ControlledRadioGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={error}>
          {label && <FormLabel>{label}</FormLabel>}
          <RadioGroup {...field} sx={sx}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default ControlledRadioGroup;
