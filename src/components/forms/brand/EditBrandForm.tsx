import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { FormControl } from '@mui/material';

import ControlledTextField from '../../controlled-elements/ControlledTextField';
import ControlledSelect from '../../controlled-elements/ControlledSelect';
import useActions from '../../../store/hooks/useActions';
import useCountryState from '../../../store/hooks/selectors/useCountryState';
import PrimaryButton from '../../PrimaryButton';
import { formControlStyle } from '../styles/form-control.styles';
import Brand from '../../../types/entities/brand.entity';

interface EditBrandFormProps {
  brand: Brand;
}

const EditBrandForm: FC<EditBrandFormProps> = ({ brand }) => {
  const { t } = useTranslation();

  const { getCountries, updateBrand } = useActions();
  const { countries } = useCountryState();

  const initialValues: Brand = {
    id: brand.id,
    name: brand.name,
    description: brand.description,
    websiteUrl: brand.websiteUrl,
    countryName: brand.countryName
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(t('brandPage.editBrandForm.error.name.required') as string),
        description: Yup.string().required(
          t('brandPage.editBrandForm.error.description.required') as string
        ),
        websiteUrl: Yup.string()
          .required(t('brandPage.editBrandForm.error.websiteUrl.required') as string)
          .url(t('brandPage.editBrandForm.error.websiteUrl.url') as string),
        countryName: Yup.string().required(
          t('brandPage.editBrandForm.error.countryName.required') as string
        )
      }),
    []
  );

  const onSubmit = (data: Brand) => {
    const changedFields: Partial<Brand> = Object.keys(data).reduce(
      (fields: Partial<Brand>, key) => {
        if (
          key !== 'countryName' &&
          data[key as keyof Brand] !== initialValues[key as keyof Brand]
        ) {
          fields[key as keyof Brand] = data[key as keyof Brand];
        }

        return fields;
      },
      {}
    );

    const country = countries ? countries.find((c) => c.name === data.countryName) : undefined;
    const updatedBrandBody = {
      ...changedFields,
      countryId: country?.id,
      id: brand.id
    };

    // Check if `id` exists before calling `updateBrand`
    if (updatedBrandBody.id !== undefined) {
      updateBrand(updatedBrandBody);
    }
  };

  const countryOptions = useMemo(() => {
    if (!countries) return [];

    return countries.map(({ name }) => ({
      value: name,
      label: name
    }));
  }, [countries]);

  useEffect(() => {
    getCountries();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Brand>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={formControlStyle} error={!!errors.name}>
        <ControlledTextField
          control={control}
          id="name"
          name="name"
          label={t('brandPage.editBrandForm.field.name') as string}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <ControlledTextField
          control={control}
          id="description"
          name="description"
          label={t('brandPage.editBrandForm.field.description') as string}
          error={!!errors.description}
          helperText={errors.description?.message}
          multiline
          rows={4}
        />
        <ControlledTextField
          control={control}
          id="websiteUrl"
          name="websiteUrl"
          label={t('brandPage.editBrandForm.field.websiteUrl') as string}
          error={!!errors.websiteUrl}
          helperText={errors.websiteUrl?.message}
        />
        <ControlledSelect
          control={control}
          id="countryName"
          name="countryName"
          label={t('brandPage.editBrandForm.field.countryName') as string}
          error={!!errors.countryName}
          // helperText={errors.countryName?.message}
          options={countryOptions}
        >
          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ControlledSelect>

        <PrimaryButton type="submit" sx={formControlStyle}>
          {t('brandPage.editBrandForm.button.submit') as string}
        </PrimaryButton>
      </FormControl>
    </form>
  );
};

export default EditBrandForm;
