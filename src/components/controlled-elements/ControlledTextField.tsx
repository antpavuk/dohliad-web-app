import { FC } from 'react';
import { Controller, Control, ControllerProps, FieldValues, Path } from 'react-hook-form';
import { TextField, SxProps, Theme, TextFieldProps } from '@mui/material';

interface ControlledTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  sx?: SxProps<Theme>;
}

const ControlledTextField = <T extends FieldValues>({
  name,
  control,
  sx,
  ...props
}: ControlledTextFieldProps<T>) => {
  // const nameProp = name.toString();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          // id={nameProp} name={nameProp}
          variant="outlined"
          sx={sx}
          {...props}
        />
      )}
    />
  );
};

export default ControlledTextField;
