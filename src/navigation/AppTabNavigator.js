import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

import { colors } from '../helpers/styles';

const AppTabNavigator = TabNavigator({
  HomeStack: {
    screen: HomeStackNavigator,
    name: 'HomeStack',
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  },
  ProfileStack: {
    screen: ProfileStackNavigator,
    name: 'ProfileStack',
    navigationOptions: {
      tabBarLabel: 'Profile',
    }
  }
}, {
  initialRouteName: 'HomeStack',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    showLabel: true,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: colors.white(),
      height: 50,
      borderTopWidth: Platform.OS === 'ios' ? 0 : 1,
      borderColor: Platform.OS === 'ios' ? colors.white() : colors.black(0.12),
    },
    style: {
      borderTopWidth: Platform.OS === 'ios' ? 0 : 1,
      borderColor: Platform.OS === 'ios' ? colors.white() : colors.black(0.12),
      shadowColor: colors.warmGrey(),
      shadowOpacity: 0.65,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowRadius: 2,
      backgroundColor: colors.whiteThree(),
    },
  }
});

export default AppTabNavigator;
