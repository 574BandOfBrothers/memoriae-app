import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default ProfileScreen;
