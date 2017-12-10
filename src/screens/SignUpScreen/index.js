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
  Keyboard,
  TouchableWithoutFeedback,
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

const EmptyAlert = () => {
  Alert.alert(
    'Please Fill All the Fields Correctly'
  )
}

const RegSuccessAlert = (email_) => {
  Alert.alert(
    'Hurray! Registration is Sucessfull for ' + email_  
  )
}

const InvalidEmailAlert = () => {
  Alert.alert(
    'Please Enter a Valid Email'
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
  }

  handleSignUp() {
    const name_ = this.state.account.get('name');
    const email_ = this.state.account.get('email');
    const password1_ = this.state.account.get('password1');
    const password2_ = this.state.account.get('password2');

    // Check All Fields
    if (name_ == '' || email_ == '' || password1_ == ''|| password2_ == ''){
      return EmptyAlert()
    }
    // Check email
    if (email_.indexOf('@') > -1 && email_.indexOf('.') > -1) {
    }
    else {
    return InvalidEmailAlert();    
    }

    // Check Password
    if (password1_ == password2_) {
      this.props.signUpRequest();
    }
    else {
      return passwDiffAlert();
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StyledTextInput
            wrapperStyle={styles.interactionWrapper}
            style={styles.textInput}
            placeholderTextColor={colors.charcoalGrey(0.3)}
            selectionColor={colors.charcoalGrey()}
            returnKeyType="next"
            placeholder="User Name"
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
      </TouchableWithoutFeedback>
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