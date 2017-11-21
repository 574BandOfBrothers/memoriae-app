import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';

import StoriesStackNavigator from './StoriesStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

import { colors } from '../helpers/styles';

import MemoriesIcon from '../assets/icons/memories.png';
import ProfileIcon from '../assets/icons/profile.png';

const AppTabNavigator = TabNavigator({
  Stories: {
    screen: StoriesStackNavigator,
    name: 'Memories',
    navigationOptions: {
      tabBarLabel: 'Memories',
      tabBarIcon: ({ tintColor, focused }) => (
        <Image source={MemoriesIcon} style={{ tintColor: tintColor}} />
      ),
    }
  },
  Profile: {
    screen: ProfileStackNavigator,
    name: 'Profile',
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Image source={ProfileIcon} style={{ tintColor: tintColor}} />
      ),
    }
  }
}, {
  initialRouteName: 'Stories',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    inactiveTintColor: colors.ocean(),
    activeTintColor: colors.white(),
    activeBackgroundColor: colors.grapefruit(),
    showLabel: false,
    showIcon: true,
    indicatorStyle: {
      backgroundColor: colors.grapefruit(),
      height: 50,
      borderTopWidth: Platform.OS === 'ios' ? 0 : 1,
      borderColor: Platform.OS === 'ios' ? colors.white() : colors.black(0.12),
    },
    iconStyle: {
      height: 30,
      width: 30,
    },
    style: {
      borderTopWidth: Platform.OS === 'ios' ? 0 : 1,
      borderColor: Platform.OS === 'ios' ? colors.white() : colors.black(0.05),
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
