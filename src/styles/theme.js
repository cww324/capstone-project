// src/styles/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#0066ff',
    secondary: '#ff6600',
    background: '#f0f0f0',
    text: '#333333',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'primary',
          color: 'white',
          _hover: {
            bg: 'secondary',
          },
        },
      },
    },
  },
});

export default theme;
