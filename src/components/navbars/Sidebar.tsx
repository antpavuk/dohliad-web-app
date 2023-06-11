import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Divider,
  Container,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { HomeOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

import LogoImage from '../LogoImage';
import useActions from '../../store/hooks/useActions';

interface SidebarProps {
  toolSection?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ toolSection = <></> }) => {
  // const theme = useTheme();
  const { logout } = useActions();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: (theme) => theme.mixins.sidebar?.width,
        height: '100%',
        left: 0,
        right: 'auto'
      }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          height: '100%'
        }}>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(2)
          }}>
          <LogoImage />
        </Box>
        <Divider />
        <Box
          sx={{
            gap: (theme) => theme.spacing(2)
          }}>
          <Container>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <nav>
                {/* <HomeOutlined sx={{ fontSize: 30, color: 'yellow' }} />
                <SearchOutlined sx={{ fontSize: 30 }} /> */}
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        borderRadius: '0.5rem'
                      }}>
                      <ListItemIcon>
                        <HomeOutlined
                          sx={{ fontSize: 30, color: (theme) => theme.palette.secondary.main }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary="Home"
                        sx={{ color: (theme) => theme.palette.secondary.main }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Container>
        </Box>
      </Toolbar>
      <Button variant="contained" onClick={() => logout()}>
        <LogoutIcon />
      </Button>
    </AppBar>
  );
};

export default Sidebar;
