import { FC } from 'react';
import { Controller, Control, ControllerProps, FieldValues, Path } from 'react-hook-form';
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

// const ControlledSelect = <T extends FieldValues>({
//   name,
//   label,
//   control,
//   sx,
//   options,
//   ...props
// }: ControlledSelectProps<T>) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <>
//           {label && <InputLabel>{label}</InputLabel>}
//           <Select {...field} variant="outlined" sx={sx} {...props}>
//             {options.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </>
//       )}
//     />
//   );
// };

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
