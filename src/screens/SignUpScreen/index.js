import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signUpRequest } from '../../actions/auth';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';

class SignUpScreen extends Component {
  handleSignUp() {
    this.props.signUpRequest();
  }

  render() {
    const { auth, navigation } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
            placeholder = 'e-mail adress'
        />
        <TextInput
            placeholder = 'password'
        />
        <TextInput
            placeholder = 'password-again'
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('AnnotateTextPrototype')}/>
      </View>
    );
  }
}

SignUpScreen.navigationOptions = {
  title: 'Memoriae Sign Up',
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
    signUpRequest,
  }
)(SignUpScreen);
