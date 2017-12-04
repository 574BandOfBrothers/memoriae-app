import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signInRequest } from '../../actions/auth';

import { textStyles, colors } from '../../helpers/styles';
import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';

import { Map } from 'immutable';


import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
} from 'react-native';

class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account:
        Map(
          {
          email: '',
          password: '',
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


  handleSignIn() {
    this.props.signInRequest();
    console.warn(this.state.account)
    // CONNECT TO API
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          style={styles.iconStyle}
          source={require('../../assets/images/icon.png')}
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
          placeholder="password"
          onChangeText={this.handleTextChange.bind(this, 'password')}
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
    backgroundColor: colors.backGroundBlue(0.3),
    flexDirection: 'column',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  iconStyle: {
    //width: 100,
    //height: 100,
    //borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
