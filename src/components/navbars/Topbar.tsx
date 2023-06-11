import { FC } from 'react';
import { AppBar, Container, Toolbar, Box } from '@mui/material';

import LogoImage from '../LogoImage';

interface TopbarProps {
  toolSection?: React.ReactNode;
}

const Topbar: FC<TopbarProps> = ({ toolSection = <></> }) => {
  // const theme = useTheme();

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ padding: '16px 0' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <LogoImage />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              gap: (theme) => theme.spacing(2)
            }}
          >
            {toolSection}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
