import { FC } from 'react';
import FormControl from '@mui/material/FormControl';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import useActions from '../../../store/hooks/useActions';
import ControlledTextField from '../../controlled-elements/ControlledTextField';
import PrimaryButton from '../../PrimaryButton';
import { formControlStyle } from '../styles/form-control.styles';
import { SkinCareFeature } from '../../../types/skin-care-features.enum';
import ControlledCheckboxGroup from '../../controlled-elements/ControlledCheckboxGroup';

interface CreateIngredientFormValues {
  name: string;
  skinCareFeatures: string[] | SkinCareFeature[];
}

const skinCareFeatures = Object.keys(SkinCareFeature)
  .filter((key) => !isNaN(Number(key))) // Filter out non-numeric keys
  .map((key) => ({
    label: SkinCareFeature[Number(key)],
    value: Number(key)
  }));

const CreateIngredientForm: FC = () => {
  const { t } = useTranslation();

  const { createIngredient } = useActions();

  const validationSchema = Yup.object({
    name: Yup.string().required(
      t('ingredientPage.createIngredientForm.error.name.required') as string
    )
  });

  const initialValues = { name: '' };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateIngredientFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: CreateIngredientFormValues) => {
    const { name, skinCareFeatures } = data;
    const functions = skinCareFeatures as SkinCareFeature[];

    createIngredient({ name, functions });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={formControlStyle}>
        <ControlledTextField
          name="name"
          label={t('ingredientsPage.createIngredientForm.field.name') as string}
          control={control}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={formControlStyle}
        />
        <ControlledCheckboxGroup
          name="skinCareFeatures"
          label={t('ingredientsPage.createIngredientForm.field.skinCareFeatures') as string}
          control={control}
          error={!!errors.skinCareFeatures}
          options={skinCareFeatures}
          sx={{ flexDirection: 'row' }}
        />
        <PrimaryButton type="submit" color="primary" sx={{ minWidth: '80%', alignSelf: 'center' }}>
          {t('ingredientsPage.createIngredientForm.button.submit') as string}
        </PrimaryButton>
      </FormControl>
    </form>
  );
};

export default CreateIngredientForm;
