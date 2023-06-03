import * as React from 'react';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      cta: {
        white: React.CSSProperties['color'];
        black: string;
      };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: {
      cta?: {
        white?: string;
        black?: string;
      };
    };
  }

  interface Palette {
    cta: {
      white: string;
      black: string;
    };
  }

  interface PaletteOptions {
    cta?: {
      white?: string;
      black?: string;
    };
  }
}
