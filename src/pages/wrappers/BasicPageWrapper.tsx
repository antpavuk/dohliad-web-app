import { Box, Container, AppBar, Toolbar, Divider } from '@mui/material';
import LogoImage from '../../components/LogoImage';
import { HomeOutlined, SearchOutlined, LibraryMusicOutlined } from '@mui/icons-material';
import Sidebar from '../../components/navbars/Sidebar';

interface BasicPageWrapperProps {
  children: React.ReactNode;
}

const BasicPageWrapper: React.FC<BasicPageWrapperProps> = ({ children }) => {
  // const theme = useTheme();

  return (
    <Box sx={{ height: '100%', minHeight: '100%' }}>
      {/* <AppBar
        position="fixed"
        sx={{
          width: theme.mixins.sidebar,
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
              marginTop: theme.spacing(2)
            }}>
            <LogoImage />
          </Box>
          <Divider />
          <Box
            sx={{
              gap: theme.spacing(2)
            }}>
            <Container>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <HomeOutlined sx={{ fontSize: 30, color: 'yellow' }} />
                <SearchOutlined sx={{ fontSize: 30 }} />
                <LibraryMusicOutlined sx={{ fontSize: 30 }} />
              </Box>
            </Container>
          </Box>
        </Toolbar>
      </AppBar> */}
      <Sidebar />
      <Box
        sx={{
          marginLeft: (theme) => theme.mixins.sidebar?.width,
          marginTop: 'auto',
          marginBottom: 'auto',
          height: '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BasicPageWrapper;
