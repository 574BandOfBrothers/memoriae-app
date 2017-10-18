import React from 'react';
import { StyleSheet, StatusBar, Platform, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { colors, textStyles } from '../helpers/styles';

import HomeScreen from '../screens/HomeScreen';
import AnnotateText from '../screens/Prototypes/AnnotateText';
import AnnotateImage from '../screens/Prototypes/AnnotateImage';

const HomeStackNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  AnnotateTextPrototype: {
    screen: AnnotateText,
  },
  AnnotateImagePrototype: {
    screen: AnnotateImage,
  }
});

export default HomeStackNavigator;
