// LogoImage component
import Logo from '../app-logo.svg';
import { Box } from '@mui/material';

const LogoImage = () => {
  return (
    <Box className="logo" sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={Logo} style={{ width: '70%' }} />
    </Box>
  );
};

export default LogoImage;
