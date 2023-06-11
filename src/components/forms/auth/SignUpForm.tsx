import { FC, useMemo } from 'react';
import { FormControl } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import PrimaryButton from '../../PrimaryButton';
import ControlledTextField from '../../controlled-elements/ControlledTextField';
import { SkinType } from '../../../types/skin-types.enum';
import { CredentialConstraint } from '../../../types/credential-constraints.enum';
import { formControlStyle, submitButtonStyle } from '../styles/form-control.styles';
import ControlledCheckboxGroup from '../../controlled-elements/ControlledCheckboxGroup';
import useActions from '../../../store/hooks/useActions';
import { RegisterUserCredentials } from '../../../types/models/create-user';
import formatDate from '../../../utils/formatDate';
import CreateUserRole from '../../../types/models/enums/create-user-role';

interface SignUpFormProps {
  role: CreateUserRole;
}

interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  dateOfBirth?: string;
  skinTypes?: SkinType[];
}

const SignUpForm: FC<SignUpFormProps> = ({ role }) => {
  const { t } = useTranslation();

  const isClientSignUp = useMemo(() => role === CreateUserRole.Client, [role]);

  const { register } = useActions();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('loginPage.error.email.email') as string)
      .required(t('loginPage.error.email.required') as string),
    username: Yup.string()
      .required(t('signUpPage.error.username.required') as string)
      .min(
        CredentialConstraint.MIN_USERNAME_LENGTH,
        t('signUpPage.error.username.minLength', {
          minLength: CredentialConstraint.MIN_USERNAME_LENGTH
        }) as string
      )
      .max(
        CredentialConstraint.MAX_USERNAME_LENGTH,
        t('signUpPage.error.username.maxLength', {
          maxLength: CredentialConstraint.MAX_USERNAME_LENGTH
        }) as string
      ),
    password: Yup.string()
      .required('Password is required')
      .min(
        CredentialConstraint.MIN_PASSWORD_LENGTH,
        t('signUpPage.error.password.minLength', {
          minLength: CredentialConstraint.MIN_PASSWORD_LENGTH
        }) as string
      )
      .max(
        CredentialConstraint.MAX_PASSWORD_LENGTH,
        t('signUpPage.error.password.maxLength', {
          maxLength: CredentialConstraint.MAX_PASSWORD_LENGTH
        }) as string
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        t('signUpPage.error.password.pattern') as string
      ),
    confirmPassword: Yup.string()
      .required(t('signUpPage.error.confirmPassword.required') as string)
      .oneOf(
        [Yup.ref('password'), 'password'],
        t('signUpPage.error.confirmPassword.notMatch') as string
      ),
    ...(isClientSignUp && {
      dateOfBirth: Yup.string().required(t('signUpPage.error.dateOfBirth.required') as string),
      skinTypes: Yup.array()
        .min(1, t('signUpPage.error.skinTypes.required') as string)
        .required(t('signUpPage.error.skinTypes.required') as string)
    })
  });

  const {
    handleSubmit,
    control,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch,
    formState: { errors }
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(validationSchema)
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<SignUpFormValues> = ({ confirmPassword, dateOfBirth, ...data }) => {
    register({
      ...data,
      role,
      ...(dateOfBirth && { dateOfBirth: formatDate(dateOfBirth) })
    } as RegisterUserCredentials);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={formControlStyle}>
        <ControlledTextField
          name="email"
          label={t('signUpPage.field.email') as string}
          control={control}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <ControlledTextField
          name="username"
          label={t('signUpPage.field.username') as string}
          control={control}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <ControlledTextField
          name="password"
          label={t('signUpPage.field.password') as string}
          type="password"
          control={control}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <ControlledTextField
          name="confirmPassword"
          label={t('signUpPage.field.confirmPassword') as string}
          type="password"
          control={control}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        {isClientSignUp && (
          <>
            <ControlledTextField
              name="dateOfBirth"
              label={t('signUpPage.field.dateOfBirth') as string}
              type="date"
              control={control}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
              defaultValue={''}
            />
            <ControlledCheckboxGroup
              name="skinTypes"
              label={t('signUpPage.field.skinTypes') as string}
              control={control}
              error={!!errors.skinTypes}
              options={Object.values(SkinType).map((skinType, i) => ({
                value: i + 1,
                label: skinType
              }))}
              defaultValue={[]}
            />
          </>
        )}
      </FormControl>
      <PrimaryButton type="submit" color="primary" sx={submitButtonStyle}>
        {t('signUpPage.button.submit')}
      </PrimaryButton>
    </form>
  );
};

export default SignUpForm;
