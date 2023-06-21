import { FC, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { formControlStyle } from '../styles/form-control.styles';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Classification } from '../../../types/classification.enum';
import { SkinCareFeature } from '../../../types/skin-care-features.enum';
import { SkinType } from '../../../types/skin-types.enum';
import { Category } from '../../../types/category.enum';
import ControlledTextField from '../../controlled-elements/ControlledTextField';
import ControlledSelect from '../../controlled-elements/ControlledSelect';
import ControlledCheckboxGroup from '../../controlled-elements/ControlledCheckboxGroup';
import ControlledAutocomplete from '../../controlled-elements/ControlledAutocomplete';
import ControlledUniqueValues from '../../controlled-elements/ControlledUniqueValues';
import PrimaryButton from '../../PrimaryButton';
import useIngredientState from '../../../store/hooks/selectors/useIngredient';
import useActions from '../../../store/hooks/useActions';

interface CreateProductFormValues {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  ingredientIds: string[];
  purchaseUrls: string[];
  age: number;
  volume: number;
  skinCareFeatures: SkinCareFeature[];
  skinTypes: SkinType[];
  classification: Classification;
  category: Category;
}

const initialValues = {
  name: '',
  description: '',
  imageUrl: '',
  price: 0,
  ingredientIds: [],
  purchaseUrls: [],
  age: 0,
  volume: 0,
  functions: [],
  skinTypes: [],
  classification: Classification.Dermatocosmetics,
  category: Category.Cleanser
};

const skinCareFeaturesOptions = Object.keys(SkinCareFeature)
  .filter((key) => !isNaN(Number(key))) // Filter out non-numeric keys
  .map((key) => ({
    label: SkinCareFeature[Number(key)],
    value: Number(key)
  }));

const skinTypesOptions = Object.values(SkinType).map((skinType, i) => ({
  value: i + 1,
  label: skinType
}));

const classificationOptions = Object.values(Classification)
  .filter((classification) => !isNaN(Number(classification)))
  .map((key) => ({
    value: Number(key),
    label: Classification[Number(key)]
  }));

const categoryOptions = Object.values(Category)
  .filter((category) => !isNaN(Number(category)))
  .map((key) => ({
    value: Number(key),
    label: Category[Number(key)]
  }));

const CreateProductForm: FC = () => {
  const { t } = useTranslation();
  const { ingredients } = useIngredientState();
  const { getIngredients, createProduct } = useActions();

  const [searchIngredientsValue, setSearchIngredientsValue] = useState<{
    label: string | number;
    value: string | number;
  }>({ label: '', value: '' });

  const validationSchema = Yup.object({
    name: Yup.string().required(
      t('createProductPage.createProductForm.error.name.required') as string
    ),
    description: Yup.string().required(
      t('createProductPage.createProductForm.error.description.required') as string
    ),
    imageUrl: Yup.string().required(
      t('createProductPage.createProductForm.error.imageUrl.required') as string
    ),
    price: Yup.number().required(
      t('createProductPage.createProductForm.error.price.required') as string
    ),
    age: Yup.number().required(
      t('createProductPage.createProductForm.error.age.required') as string
    ),
    volume: Yup.number().required(
      t('createProductPage.createProductForm.error.volume.required') as string
    ),
    skinCareFeatures: Yup.array().required(
      t('createProductPage.createProductForm.error.skinCareFeatures.required') as string
    ),
    skinTypes: Yup.array().required(
      t('createProductPage.createProductForm.error.skinTypes.required') as string
    ),
    classification: Yup.string().required(
      t('createProductPage.createProductForm.error.classification.required') as string
    ),
    category: Yup.string().required(
      t('createProductPage.createProductForm.error.category.required') as string
    ),
    ingredientIds: Yup.array().required(
      t('createProductPage.createProductForm.error.ingredientIds.required') as string
    ),
    purchaseUrls: Yup.array().required(
      t('createProductPage.createProductForm.error.purchaseUrls.required') as string
    )
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateProductFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: CreateProductFormValues) => {
    const newProduct = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: Number(data.price),
      age: Number(data.age),
      volume: Number(data.volume),
      category: Number(data.category),
      classification: Number(data.classification),
      purchaseUrls: data.purchaseUrls,
      skinTypes: data.skinTypes,
      functions: data.skinCareFeatures,
      ingredientIds: data.ingredientIds
    };

    createProduct(newProduct);
  };

  useEffect(() => {
    getIngredients({
      isSearch: true,
      filterField: 'Name',
      filterValue: searchIngredientsValue.value,
      pageNumber: 1,
      pageSize: 100
    });
  }, [searchIngredientsValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={formControlStyle}>
        <ControlledTextField
          name="name"
          label={t('createProductPage.createProductForm.name.label') as string}
          placeholder={t('createProductPage.createProductForm.name.placeholder') as string}
          error={!!errors.name}
          helperText={errors.name?.message}
          control={control}
        />
        <ControlledTextField
          name="description"
          label={t('createProductPage.createProductForm.description.label') as string}
          placeholder={t('createProductPage.createProductForm.description.placeholder') as string}
          error={!!errors.description}
          helperText={errors.description?.message}
          control={control}
          multiline
          rows={4}
        />
        <ControlledTextField
          name="imageUrl"
          label={t('createProductPage.createProductForm.imageUrl.label') as string}
          placeholder={t('createProductPage.createProductForm.imageUrl.placeholder') as string}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl?.message}
          control={control}
        />
        <ControlledTextField
          name="age"
          label={t('createProductPage.createProductForm.age.label') as string}
          placeholder={t('createProductPage.createProductForm.age.placeholder') as string}
          error={!!errors.age}
          helperText={errors.age?.message}
          type="number"
          control={control}
        />
        <ControlledTextField
          name="volume"
          label={t('createProductPage.createProductForm.volume.label') as string}
          placeholder={t('createProductPage.createProductForm.volume.placeholder') as string}
          error={!!errors.volume}
          helperText={errors.volume?.message}
          type="number"
          control={control}
        />
        <ControlledCheckboxGroup
          name="skinCareFeatures"
          label={t('createProductPage.createProductForm.skinCareFeatures.label') as string}
          placeholder={
            t('createProductPage.createProductPage.skinCareFeatures.placeholder') as string
          }
          error={!!errors.skinCareFeatures}
          // helperText={errors.skinCareFeatures?.message}
          control={control}
          options={skinCareFeaturesOptions}
          sx={{ flexDirection: 'row' }}
        />
        <ControlledCheckboxGroup
          name="skinTypes"
          label={t('createProductPage.createProductForm.field.skinTypes') as string}
          control={control}
          error={!!errors.skinTypes}
          options={skinTypesOptions}
          defaultValue={[]}
        />
        <ControlledSelect
          name="classification"
          label={t('createProductPage.createProductForm.classification.label') as string}
          placeholder={
            t('createProductPage.createProductForm.classification.placeholder') as string
          }
          error={!!errors.classification}
          // helperText={errors.classification?.message}
          control={control}
          options={classificationOptions}
          defaultValue={[]}
        />
        <ControlledSelect
          name="category"
          label={t('createProductPage.createProductForm.category.label') as string}
          placeholder={t('createProductPage.createProductForm.category.placeholder') as string}
          error={!!errors.category}
          //helperText={errors.category?.message}
          control={control}
          options={categoryOptions}
          defaultValue={[]}
        />
        <ControlledAutocomplete
          name="ingredientIds"
          label={t('createProductPage.createProductForm.ingredientIds.label') as string}
          // placeholder={t('createProductPage.createProductForm.ingredientIds.placeholder') as string}
          error={!!errors.ingredientIds}
          // helperText={errors.ingredientIds?.message}
          control={control}
          options={
            ingredients?.map((ingredient) => ({
              label: ingredient.name,
              value: ingredient.id
            })) || []
          }
          searchValue={searchIngredientsValue}
          onSearchChange={(value) => {
            if (value) setSearchIngredientsValue(value);
          }}
        />
        <ControlledUniqueValues
          name="purchaseUrls"
          label={t('createProductPage.createProductForm.purchaseUrls.label') as string}
          error={!!errors.purchaseUrls}
          // helperText={errors.purchaseUrls?.message}
          control={control}
          type="url"
        />
        <PrimaryButton type="submit" sx={{ mt: 2 }}>
          {t('productPage.createProductForm.button.submit') as string}
        </PrimaryButton>
      </FormControl>
    </form>
  );
};

export default CreateProductForm;
