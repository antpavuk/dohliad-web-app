import { Container, ToggleButtonGroup, ToggleButton } from '@mui/material';
import BrandEnvoysTable from '../components/tables/BrandEnvoysTable';
import { useState } from 'react';

const UsersPage = () => {
  const [brandEnvoyAuthStatus, setBrandEnvoyAuthStatus] = useState<
    'authorized' | 'pending' | 'all'
  >('all');

  const handleBrandEnvoyAuthStatusChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: 'authorized' | 'pending' | 'all'
  ) => {
    setBrandEnvoyAuthStatus(newValue);
  };

  return (
    <Container
      sx={{
        mt: '2rem'
      }}
    >
      <ToggleButtonGroup
        color="primary"
        value={brandEnvoyAuthStatus}
        onChange={handleBrandEnvoyAuthStatusChange}
        exclusive
        sx={{ mb: '2rem' }}
      >
        <ToggleButton
          value={'pending'}
          aria-label="left aligned"
          sx={{ borderRadius: '0.5rem 0 0 0.5rem' }}
        >
          Pending
        </ToggleButton>
        <ToggleButton
          value={'authorized'}
          aria-label="centered"
          sx={{ borderRadius: '0 0.5rem 0.5rem 0' }}
        >
          Authorized
        </ToggleButton>
        <ToggleButton
          value={'all'}
          aria-label="right aligned"
          sx={{ borderRadius: '0 0.5rem 0.5rem 0' }}
        >
          All
        </ToggleButton>
      </ToggleButtonGroup>
      <BrandEnvoysTable filter={brandEnvoyAuthStatus} />
    </Container>
  );
};

export default UsersPage;
