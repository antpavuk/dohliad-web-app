import { Button, styled } from '@mui/material';

const PrimaryButton = styled(Button)(({ theme, variant }) => {
  const isContained = variant === 'contained';

  const colors = {
    primary: isContained ? theme.palette?.cta?.white : theme.palette?.cta?.black,
    secondary: isContained ? theme.palette?.cta?.black : theme.palette?.cta?.white
  };

  return {
    border: 'none',
    borderRadius: '30px',
    boxShadow: 'none',
    backgroundColor: colors.secondary,
    color: colors.primary,
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'capitalize',
    minWidth: '130px',
    '&:hover': {
      borderBlockColor: colors.secondary,
      backgroundColor: colors.primary,
      color: colors.secondary,
      boxShadow: 'none',

      '&.MuiButton-root': {
        borderColor: colors.secondary,
        backgroundColor: colors.primary,
        color: colors.secondary
      }
    },
    '&.MuiButton-root': {
      borderColor: colors.primary,
      borderStyle: 'solid',
      borderWidth: '1px'
    },
    ...(variant === 'text' && {
      border: 'none',
      backgroundColor: 'transparent',
      '&.MuiButton-root': {
        borderColor: 'transparent'
      },
      '&:hover': {
        borderColor: colors.secondary,
        color: colors.secondary,
        boxShadow: theme.shadows[4],
        fontStyle: 'underline',

        '&.MuiButton-root': {
          borderColor: colors.secondary
        }
      }
    })
  };
});

export default PrimaryButton;
