import {configureFonts, DefaultTheme} from 'react-native-paper';
import {Platform} from 'react-native';
import {deviceSize} from './utils';

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#BADA55',
    primary: '#3375BB',
    secondary: '#49CFED',
    background: '#F2F2F2',
    error: '#F0A69B',
    errorFocus: '#ba000d',
  },
  fonts: {
    superLight: {...DefaultTheme.fonts.regular},
    ...configureFonts({
      default: {
        regular: {
          fontFamily: 'Rowdies-Regular',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'Rowdies-Bold',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'Rowdies-Light',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'Rowdies-Light',
          fontWeight: 'normal',
        },
      },
    }),
  },
  userDefinedThemeProperty: '',
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
  },
};

export const theme = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    secondary: '#49CFED',
    surface: '#FFFFFF',
    background: '#F2F2F2',
    background1: '#4ACEAE',
    background2: '#99A9FF',
    error: '#F0A69B',
    errorFocus: '#ba000d',
    text: '#000000',
    button: '#DC3D3D',
    require: '#F25830',
    active: '#d32f2f',
    inputLabel: '#575757',
    placeholder: '#CACACA',
    background3: '#F2F2F2',
    disabled1: '#A4A4A4',
    disable2: '#BEBEBE',
    bgScreen: '#F9FAFF',
  },
};

export const BANNER_HEIGHT = Platform.select({ios: 325, android: 315});
export const SECTION_RADIUS = 20;

export const TAB_BAR_HEIGHT =
  Platform.OS === 'android' ||
  !(deviceSize === 'large' || deviceSize === 'xlarge')
    ? 70
    : 80;

export const PADDING_HORIZONTAL_CONTAINER = 10;
