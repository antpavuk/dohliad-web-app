import { useEffect } from 'react';
import { PaletteOptions, ThemeProvider, createTheme } from '@mui/material';
import { MixinsOptions } from '@mui/material/styles/createMixins';

import useActions from './store/hooks/useActions';
import Router from './router/Router';
import './App.css';
import './localization/i18n';
import useUserState from './store/hooks/selectors/useUserState';
import useBrandState from './store/hooks/selectors/useBrandState';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4200FF'
    },
    secondary: {
      light: '#FFF68F',
      main: '#FFFF00',
      dark: '#B29700'
    },
    cta: {
      white: '#FFFFFF',
      black: '#000000'
    }
  } as PaletteOptions,
  mixins: {
    sidebar: {
      width: '232px'
    }
  } as MixinsOptions
});

function App() {
  const { refreshToken, logout } = useActions();
  const { brandAssigned } = useUserState();
  const { isBrandCreated } = useBrandState();

  // explicitly logout user after brand creation
  // due to the token invalidation on the backend
  useEffect(() => {
    if (brandAssigned || isBrandCreated) {
      localStorage.clear();
      logout();
    }
  }, [brandAssigned, isBrandCreated]);

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
