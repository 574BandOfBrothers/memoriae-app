import { StyleSheet, Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';

const SignStackNavigator = StackNavigator({
  SignIn: {
    screen: SignInScreen,
  },
});

export default SignStackNavigator;
