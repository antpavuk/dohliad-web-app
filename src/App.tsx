import { useEffect } from 'react';
import { PaletteOptions, ThemeProvider, createTheme } from '@mui/material';

import useActions from './store/hooks/useActions';
import Router from './router/Router';
import './App.css';
import './localization/i18n';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4200FF'
    },
    cta: {
      white: '#FFFFFF',
      black: '#000000'
    }
  } as PaletteOptions
});

function App() {
  const { refreshToken } = useActions();

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
