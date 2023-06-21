import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import {
  Chip,
  FormControl,
  FormGroup,
  FormLabel,
  SxProps,
  Theme,
  TextField,
  Autocomplete,
  AutocompleteInputChangeReason
} from '@mui/material';

interface Option {
  label: string | number;
  value: string | number;
}

interface ControlledAutocompleteProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  sx?: SxProps<Theme>;
  label?: string;
  error?: boolean;
  searchValue: Option | null; // Add searchValue prop
  onSearchChange: (value: Option | null) => void;
  defaultValue?: string[];
  // Add onSearchChange prop
}

const ControlledAutocomplete = <T extends FieldValues>({
  name,
  control,
  options,
  sx,
  label,
  error,
  searchValue,
  onSearchChange
}: ControlledAutocompleteProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleInputChange = (
    _event: React.SyntheticEvent<Element, Event>,
    _value: string,
    _reason: AutocompleteInputChangeReason
  ) => {
    onSearchChange(null);
  };

  const handleOptionDelete = (option: Option) => {
    const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
    setSelectedOptions(updatedOptions);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl error={error}>
          {label && <FormLabel>{label}</FormLabel>}
          <Autocomplete
            value={searchValue}
            options={
              options.filter(
                (option) =>
                  !selectedOptions.some((selectedOption) => selectedOption.value === option.value)
              ) || []
            }
            getOptionLabel={(option) => option.label.toString()}
            onChange={(_event: any, value: Option | null) => {
              if (value) {
                if (!selectedOptions.find((option) => option.value === value.value)) {
                  const updatedOptions = [...selectedOptions, value];
                  field.onChange(updatedOptions.map((option) => option.value));
                  setSelectedOptions(updatedOptions);
                }
                onSearchChange(null);
              }
              onSearchChange(null);
            }}
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label="Search" margin="dense" />}
            sx={sx}
          />
          <FormGroup
            sx={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              ...(sx as any)
            }}>
            {selectedOptions.map((option) => (
              <Chip
                key={option.value}
                label={option.label.toString()}
                onDelete={() => handleOptionDelete(option)}
                sx={{ m: 0.5 }}
              />
            ))}
          </FormGroup>
          <input
            // defaultValue={defaultValue}
            type="hidden"
            {...field}
            //value={selectedOptions.map((option) => option.value).join(',')}
          />
        </FormControl>
      )}
    />
  );
};

export default ControlledAutocomplete;
