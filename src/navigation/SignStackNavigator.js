import { StyleSheet, Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPwScreen from '../screens/ForgotPwScreen';

const SignStackNavigator = StackNavigator({
  SignIn: {
    screen: SignInScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },  
  ForgotPw: {
    screen: ForgotPwScreen,
  },    

});

export default SignStackNavigator;
