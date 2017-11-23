import React from 'react';
import { StyleSheet, StatusBar, Platform, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { colors, textStyles } from '../helpers/styles';

import ProfileScreen from '../screens/ProfileScreen';
//import SignInScreen from '../screens/SignInScreen';


const ProfileStackNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
//  SignIn: {
//    screen: SignInScreen,
//  },
});

export default ProfileStackNavigator;
