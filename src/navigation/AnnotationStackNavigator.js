import React from 'react';
import { StyleSheet, StatusBar, Platform, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { colors, textStyles } from '../helpers/styles';

import ListAnnotationsScreen from '../screens/ListAnnotationsScreen';
import AddAnnotationScreen from '../screens/AddAnnotationScreen';


const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.whiteThree(),
    ...(Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight, height: 56 + StatusBar.currentHeight } : {}),
  },
  headerTitle: {
    ...textStyles.semiBoldBlack,
  }
});

const AnnotationStackNavigator = StackNavigator({
  AnnotationList: {
    screen: ListAnnotationsScreen,
  },
  AddAnnotation: {
    screen: AddAnnotationScreen,
  },
}, {
  navigationOptions: {
    headerTintColor: colors.ocean(),
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerBackTitle: null,
  },
});

export default AnnotationStackNavigator;