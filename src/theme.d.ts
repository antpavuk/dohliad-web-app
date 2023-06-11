import * as React from 'react';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        light: React.CSSProperties['color'];
        main: React.CSSProperties['color'];
        dark: React.CSSProperties['color'];
        contrastText: React.CSSProperties['color'];
      };
      secondary: {
        main: React.CSSProperties['color'];
      };
      cta: {
        white: React.CSSProperties['color'];
        black: React.CSSProperties['color'];
      };
    };
    mixins: {
      sidebar: React.CSSProperties;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: {
      secondary?: {
        main?: string;
      };
      cta?: {
        white?: string;
        black?: string;
      };
    };
    mixins?: {
      sidebar?: React.CSSProperties;
    };
  }

  interface Palette {
    secondary: {
      main: string;
    };
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

  interface Mixins {
    sidebar: React.CSSProperties;
  }

  interface MixinsOptions {
    sidebar?: React.CSSProperties;
  }
}
