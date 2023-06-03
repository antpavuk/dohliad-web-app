import { FC } from 'react';
import { FormControl } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryButton from '../PrimaryButton';
import ControlledTextField from '../controlled-elements/ControlledTextField';
import { formControlStyle, submitButtonStyle } from './styles/auth-form-control.styles';
import { useTranslation } from 'react-i18next';
import useActions from '../../store/hooks/useActions';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const { login } = useActions();

  const initialValues: LoginFormValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('loginPage.error.email.email') as string)
      .required(t('loginPage.error.email.required') as string),
    password: Yup.string().required(t('loginPage.error.password.required') as string)
  });

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<LoginFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={formControlStyle}>
        <ControlledTextField
          name="email"
          label={t('loginPage.field.email') as string}
          control={control}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <ControlledTextField
          name="password"
          label={t('loginPage.field.password') as string}
          type="password"
          control={control}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <PrimaryButton type="submit" color="primary" sx={submitButtonStyle}>
          {t('loginPage.button.submit')}
        </PrimaryButton>
      </FormControl>
    </form>
  );
};

export default LoginForm;
