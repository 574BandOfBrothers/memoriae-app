import { StyleSheet } from 'react-native';

export const colors = {
  blue: (alpha = 1) => `rgba(0, 0, 255, ${alpha})`,
  white: (alpha = 1) => `rgba(255, 255, 255, ${alpha})`,
  whiteThree: (alpha = 1) => `rgba(250, 250, 250, ${alpha})`,
  black: (alpha = 1) => `rgba(0, 0, 0, ${alpha})`,
  warmGrey: (alpha = 1) => `rgba(155, 155, 155, ${alpha})`,
};

export const textStyles = {
  light: {
    fontFamily: 'SourceSansPro-Light'
  },
  regular: {
    fontFamily: 'SourceSansPro-Regular'
  },
  semiBold: {
    fontFamily: 'SourceSansPro-Semibold',
  },
  bold: {
    fontFamily: 'SourceSansPro-Bold',
  },
};
