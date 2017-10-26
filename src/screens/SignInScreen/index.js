import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInRequest } from '../../actions/auth';

import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

class SignInScreen extends Component {
  handleSignIn() {
    this.props.signInRequest();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Touch to Sign In" onPress={this.handleSignIn.bind(this)} />
      </View>
    );
  }
}

SignInScreen.navigationOptions = {
  title: 'Sign In',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default connect(
  state => ({}),
  {
    signInRequest,
  }
)(SignInScreen);
