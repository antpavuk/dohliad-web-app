import { FC, useMemo, useEffect } from 'react';
import { FormControl, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import ControlledTextField from '../../controlled-elements/ControlledTextField';
import ControlledSelect from '../../controlled-elements/ControlledSelect';
import useActions from '../../../store/hooks/useActions';
import useCountryState from '../../../store/hooks/selectors/useCountryState';
import PrimaryButton from '../../PrimaryButton';
import { formControlStyle } from '../styles/form-control.styles';

interface CreateBrandFormValues {
  name: string;
  description: string;
  websiteUrl: string;
  countryId: string;
}

const CreateBrandForm: FC = () => {
  const { t } = useTranslation();

  const { getCountries, createBrand } = useActions();
  const { countries } = useCountryState();

  const initialValues: CreateBrandFormValues = {
    name: '',
    description: '',
    websiteUrl: '',
    countryId: ''
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(t('brandPage.createBrandForm.error.name.required') as string),
        description: Yup.string().required(
          t('brandPage.createBrandForm.error.description.required') as string
        ),
        websiteUrl: Yup.string()
          .required(t('brandPage.createBrandForm.error.websiteUrl.required') as string)
          .url(t('brandPage.createBrandForm.error.websiteUrl.url') as string),
        countryId: Yup.string().required(
          t('brandPage.createBrandForm.error.countryId.required') as string
        )
      }),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateBrandFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    getCountries();
  }, []);

  const countryOptions = useMemo(() => {
    if (!countries) return [];

    return countries.map((country) => ({
      value: country.id,
      label: country.name
    }));
  }, [countries]);

  return (
    <form
      onSubmit={handleSubmit((values: CreateBrandFormValues) => {
        createBrand(values);
      })}>
      <FormControl fullWidth sx={formControlStyle}>
        <ControlledTextField
          id="name"
          name="name"
          label={t('brandPage.createBrandForm.field.name') as string}
          type="text"
          control={control}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <ControlledTextField
          id="description"
          name="description"
          label={t('brandPage.createBrandForm.field.description') as string}
          type="text"
          multiline
          rows={4}
          control={control}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <ControlledTextField
          id="websiteUrl"
          name="websiteUrl"
          label={t('brandPage.createBrandForm.field.websiteUrl') as string}
          type="text"
          control={control}
          error={!!errors.websiteUrl}
          helperText={errors.websiteUrl?.message}
        />
        <ControlledSelect
          id="countryId"
          name="countryId"
          label={t('brandPage.createBrandForm.field.countryId') as string}
          control={control}
          error={!!errors.countryId}
          options={countryOptions}
        />
        <PrimaryButton type="submit" color="primary" sx={{ minWidth: '80%', alignSelf: 'center' }}>
          {t('brandPage.createBrandForm.button.submit') as string}
        </PrimaryButton>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            // mui color warning
            color: 'warning.main'
          }}>
          {t('brandPage.createBrandForm.warning')}
        </Typography>
      </FormControl>
    </form>
  );
};

export default CreateBrandForm;
