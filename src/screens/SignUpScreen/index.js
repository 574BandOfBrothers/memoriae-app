import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable';


import { signUpRequest } from '../../actions/auth';
import StyledTextInput from '../../components/StyledTextInput';
import { textStyles, colors } from '../../helpers/styles';
import StyledButton from '../../components/StyledButton';



import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  Picker,
} from 'react-native';


const passwDiffAlert = () => {
  Alert.alert(
    'Passwords are diffrent!'
  )
}

const passwEmptyAlert = () => {
  Alert.alert(
    'Password cannot be empty!'
  )
}

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account:
        Map({
          name: '',
          email: '',
          password1: '',
          password2: '',
        }
      ),
    };
  }



  handleTextChange(field, value) {
    this.setState({
      account: this.state.account.set(field, value),
    });
    //console.warn(this.state.account)
  }

  handleSignUp() {
    const name_ = this.state.account.get('name');
    const email_ = this.state.account.get('email');
    const password1_ = this.state.account.get('password1');
    const password2_ = this.state.account.get('password2');

    // Check Name

    // Check Password
    if (password1_ || password2_) {
      if (password1_ == password2_) {
        console.warn('passwords are OK')
        this.props.signUpRequest();
      }
      else {
        console.warn('passwords are diffrent')
      }
    }
    else {
      console.warn('passwords cannot be null')
    }

    // Check email
    if (email_.indexOf('@') > -1) {
      //@ is found no problem
    }
    else {
      console.warn('Please enter a valid email')
    }

    this.props.signUpRequest({
      name: name_,
      email: email_,
      password: password1_,
    });
  }

  render() {
    const { auth, navigation } = this.props;
    //const { story } = this.state;

    return (
      <View style={styles.container}>
        <StyledTextInput
          wrapperStyle={styles.interactionWrapper}
          style={styles.textInput}
          placeholderTextColor={colors.charcoalGrey(0.3)}
          selectionColor={colors.charcoalGrey()}
          returnKeyType="next"
          placeholder="name"
          onChangeText={this.handleTextChange.bind(this, 'name')}
        />

        <StyledTextInput
          wrapperStyle={styles.interactionWrapper}
          style={styles.textInput}
          placeholderTextColor={colors.charcoalGrey(0.3)}
          selectionColor={colors.charcoalGrey()}
          returnKeyType="next"
          placeholder="e-mail"
          onChangeText={this.handleTextChange.bind(this, 'email')}
        />
        <StyledTextInput
          wrapperStyle={styles.interactionWrapper}
          style={styles.textInput}
          placeholderTextColor={colors.charcoalGrey(0.3)}
          selectionColor={colors.charcoalGrey()}
          returnKeyType="next"
          placeholder="password1"
          onChangeText={this.handleTextChange.bind(this, 'password1')}
        />

        <StyledTextInput
          wrapperStyle={styles.interactionWrapper}
          style={styles.textInput}
          placeholderTextColor={colors.charcoalGrey(0.3)}
          selectionColor={colors.charcoalGrey()}
          returnKeyType="next"
          placeholder="password2"
          onChangeText={this.handleTextChange.bind(this, 'password2')}
        />

        <StyledButton
          style={styles.SignUpButton}
          titleStyle={styles.SignUpButtonText}
          title="Sign Up"
          onPress={this.handleSignUp.bind(this)}
          //rightItem={<Image source={ListArrow} />}
        />

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
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  interactionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.charcoalGrey(0.3),
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    height: 45,
  },

  textInput: {
    color: colors.charcoalGrey(),
  },

  SignUpButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 53,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ocean(),
  },

    SignUpButtonText: {
    textAlign: 'center',
  },

});


export default connect(
  state => ({
    auth: state.auth,
  }), {
    signUpRequest,
  }
)(SignUpScreen);