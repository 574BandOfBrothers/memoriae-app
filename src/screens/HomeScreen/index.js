import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOutRequest } from '../../actions/auth';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

class HomeScreen extends Component {
  handleSignOut() {
    this.props.signOutRequest();
  }

  render() {
    const { auth, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button
          title="Annotate text prototype"
          onPress={() => navigation.navigate('AnnotateTextPrototype')}/>
        <Button
          title="Annotate image prototype"
          onPress={() => navigation.navigate('AnnotateImagePrototype')}/>
        <Button
          title="Touch to Sign Out"
          onPress={() => this.handleSignOut.bind(this)}/>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Home',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  state => ({
    auth: state.auth,
  }), {
    signOutRequest,
  }
)(HomeScreen);
