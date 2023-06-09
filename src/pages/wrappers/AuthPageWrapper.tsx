import { ReactNode, FC } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import LogoImage from '../../components/LogoImage';
import { FontWeight } from '../../types/ui/fonts.enum';
import { useNavigate } from 'react-router-dom';
import { AuthRoute } from '../../types/routes.enum';

interface AuthPageWrapperProps {
  title: string;
  children?: ReactNode;
}

const AuthPageWrapper: FC<AuthPageWrapperProps> = ({ title, children }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(AuthRoute.LANDING);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 5
        }}
      >
        <Box onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
          <LogoImage />
        </Box>
        <Typography variant="h4" sx={{ marginTop: 3, fontWeight: FontWeight.SemiBold }}>
          {title}
        </Typography>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          width: '40%',
          margin: '10px auto'
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default AuthPageWrapper;
