import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInRequest } from '../../actions/auth';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

class SignInScreen extends Component {
  handleSignIn() {
    this.props.signInRequest();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
            placeholder = 'e-mail adress'
        />
        <TextInput
            placeholder = 'password'
        />     
        <Button title="Touch to Sign In" onPress={this.handleSignIn.bind(this)} />
        <Button title="Touch to Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />
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
