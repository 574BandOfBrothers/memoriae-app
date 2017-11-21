import { StyleSheet, Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const SignStackNavigator = StackNavigator({
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },  

});

export default SignStackNavigator;
