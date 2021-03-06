import React from 'react';
import { StyleSheet, StatusBar, Platform, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { colors, textStyles } from '../helpers/styles';

import StoriesScreen from '../screens/StoriesScreen';
import SearchScreen from '../screens/SearchScreen';
import AddStoryScreen from '../screens/AddStoryScreen';
import StoryScreen from '../screens/StoryScreen';
import AnnotationDetailScreen from '../screens/AnnotationDetailScreen';
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

const StoriesStackNavigator = StackNavigator({
  StoryList: {
    screen: StoriesScreen,
  },
  AddStory: {
    screen: AddStoryScreen,
  },
  Story: {
    screen: StoryScreen,
  },
  AddAnnotation: {
    screen: AddAnnotationScreen,
  },
  AnnotationDetail: {
    screen: AnnotationDetailScreen,
  },
}, {
  navigationOptions: {
    headerTintColor: colors.ocean(),
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerBackTitle: null,
  },
});

const SearcModalStackNavigator = StackNavigator({
  StoriesStack: {
    screen: StoriesStackNavigator,
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
}, {
  mode: 'modal',
  navigationOptions: {
    header: null
  }
});

export default SearcModalStackNavigator;
