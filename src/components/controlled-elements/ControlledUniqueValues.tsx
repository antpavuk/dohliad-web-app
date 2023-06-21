// import { HTMLInputTypeAttribute, useState } from 'react';
// import { Controller, Control, FieldValues, Path } from 'react-hook-form';
// import { Chip, FormControl, FormGroup, FormLabel, SxProps, Theme, TextField } from '@mui/material';

// interface ControlledUniqueValuesProps<T extends FieldValues, V> {
//   name: Path<T>;
//   control: Control<T>;
//   sx?: SxProps<Theme>;
//   label?: string;
//   error?: boolean;
//   type?: HTMLInputTypeAttribute | undefined;
// }

// const ControlledUniqueValues = <T extends FieldValues, V>({
//   name,
//   control,
//   sx,
//   label,
//   error,
//   type
// }: ControlledUniqueValuesProps<T, V>) => {
//   const [inputValue, setInputValue] = useState<V | ''>('');
//   const [selectedValues, setSelectedValues] = useState<V[]>([]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value as V);
//   };

//   const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter' && inputValue !== '') {
//       const valueToAdd = inputValue;
//       if (!selectedValues.includes(valueToAdd)) {
//         setSelectedValues([...selectedValues, valueToAdd]);
//       }
//       setInputValue('' as V);
//     }
//   };

//   const handleValueDelete = (value: V) => {
//     const updatedValues = selectedValues.filter((selectedValue) => selectedValue !== value);
//     setSelectedValues(updatedValues);
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <FormControl error={error}>
//           {label && <FormLabel>{label}</FormLabel>}
//           <TextField
//             value={inputValue}
//             onChange={handleInputChange}
//             onKeyDown={handleInputKeyDown}
//             label="Type a value and press Enter"
//             margin="dense"
//             sx={sx}
//             type={type}
//           />
//           <FormGroup
//             sx={{
//               flexDirection: 'row',
//               flexWrap: 'wrap',
//               ...(sx as any)
//             }}>
//             {selectedValues.map((value) => (
//               <Chip
//                 key={String(value)}
//                 label={String(value)}
//                 onDelete={() => handleValueDelete(value)}
//                 sx={{ m: 0.5 }}
//               />
//             ))}
//           </FormGroup>
//           <input type="hidden" {...field} value={selectedValues.map((value) => String(value))} />
//         </FormControl>
//       )}
//     />
//   );
// };

// export default ControlledUniqueValues;

import { HTMLInputTypeAttribute, useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import {
  Chip,
  FormControl,
  FormGroup,
  FormLabel,
  IconButton,
  SxProps,
  Theme,
  TextField,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ControlledUniqueValuesProps<T extends FieldValues, V> {
  name: Path<T>;
  control: Control<T>;
  sx?: SxProps<Theme>;
  label?: string;
  error?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
}

const ControlledUniqueValues = <T extends FieldValues, V>({
  name,
  control,
  sx,
  label,
  error,
  type
}: ControlledUniqueValuesProps<T, V>) => {
  const [inputValue, setInputValue] = useState<V | ''>('');
  const [selectedValues, setSelectedValues] = useState<V[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value as V);
  };

  const handleValueAdd = () => {
    if (inputValue !== '' && !selectedValues.includes(inputValue)) {
      setSelectedValues([...selectedValues, inputValue]);
      setInputValue('' as V);
    }
  };

  const handleValueDelete = (value: V) => {
    const updatedValues = selectedValues.filter((selectedValue) => selectedValue !== value);
    setSelectedValues(updatedValues);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={error}>
          {label && <FormLabel>{label}</FormLabel>}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
              value={inputValue}
              onChange={handleInputChange}
              label="Type a value"
              margin="dense"
              sx={sx}
              type={type}
            />
            <IconButton
              onClick={() => {
                if (inputValue !== '' && !selectedValues.includes(inputValue)) {
                  const updatedValues = [...selectedValues, inputValue];
                  setSelectedValues(updatedValues);
                  setInputValue('' as V);
                  field.onChange(updatedValues);
                }
              }}
              disabled={inputValue === ''}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <FormGroup
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              ...(sx as any)
            }}
          >
            {selectedValues.map((value) => (
              <Chip
                key={String(value)}
                label={String(value)}
                onDelete={() => handleValueDelete(value)}
                sx={{ m: 0.5 }}
              />
            ))}
          </FormGroup>
          <input type="hidden" {...field} value={selectedValues.map((value) => String(value))} />
        </FormControl>
      )}
    />
  );
};

export default ControlledUniqueValues;
