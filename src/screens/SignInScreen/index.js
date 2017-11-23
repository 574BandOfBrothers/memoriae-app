import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInRequest } from '../../actions/auth';
import { signUpRequest } from '../../actions/auth';

import { textStyles, colors } from '../../helpers/styles';
import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';

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
        <StyledTextInput
            wrapperStyle={styles.interactionWrapper}
            style={styles.textInput}
            placeholderTextColor={colors.charcoalGrey(0.3)}
            selectionColor={colors.charcoalGrey()}
            returnKeyType="next"
            placeholder="e-mail"
            />
        <StyledTextInput
            wrapperStyle={styles.interactionWrapper}
            style={styles.textInput}
            placeholderTextColor={colors.charcoalGrey(0.3)}
            selectionColor={colors.charcoalGrey()}
            returnKeyType="next"
            placeholder="password"
            /> 
        <StyledButton
           style={styles.SignInButton}
           titleStyle={styles.SignInButtonText}
           title="Sign In"
           onPress={this.handleSignIn.bind(this)}
           //onPress={this.handleImageButtonPress.bind(this)}
           //rightItem={<Image source={ListArrow} />} 
        />
        <StyledButton
           style={styles.SignUpButton}
           titleStyle={styles.SignUpButtonText}
           title="Sign Up"
           onPress={() => this.props.navigation.navigate('SignUp')}
           //onPress={this.handleImageButtonPress.bind(this)}
           //rightItem={<Image source={ListArrow} />} 
        />
        <StyledButton
           style={styles.ForgotButton}
           titleStyle={styles.ForgotButtonText}
           title="Forgot Password"
           onPress={() => this.props.navigation.navigate('ForgotPw')}
           //onPress={this.handleImageButtonPress.bind(this)}
           //rightItem={<Image source={ListArrow} />} 
        />

      </View>
    );
  }
}

SignInScreen.navigationOptions = {
  title: 'Memoriae',
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



  SignInButton: {
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

  SignInButtonText: {
    textAlign: 'center', 
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
    backgroundColor: colors.seafoamBlue(),
  },

  SignUpButtonText: {
    textAlign: 'center', 
  },

  ForgotButton: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 53,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.orangeyRed(),
  },

  ForgotButtonText: {
    textAlign: 'center', 
  },


});



export default connect(
  state => ({}),
  {
    signInRequest,
  }
)(SignInScreen);
