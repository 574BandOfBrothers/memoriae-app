import React from 'react';
import { StyleSheet, StatusBar, Platform, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { colors, textStyles } from '../helpers/styles';

import ProfileScreen from '../screens/ProfileScreen';

const ProfileStackNavigator = StackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
});

export default ProfileStackNavigator;
