import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import {
  Select,
  MenuItem,
  SxProps,
  Theme,
  SelectProps,
  InputLabel,
  FormControl
} from '@mui/material';

interface ControlledSelectProps<T extends FieldValues> extends Omit<SelectProps, 'name'> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  sx?: SxProps<Theme>;
  options: Array<{ value: string | number; label: string }>;
}

const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  sx,
  options,
  label,
  ...props
}: ControlledSelectProps<T>) => {
  return (
    <FormControl variant="outlined" sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} {...props} value={field.value || ''}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default ControlledSelect;
