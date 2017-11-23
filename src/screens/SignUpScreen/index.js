import React, { Component } from 'react';
import { connect } from 'react-redux';

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
} from 'react-native';

class SignUpScreen extends Component {
  handleSignUp() {
    this.props.signUpRequest();
  }

  render() {
    const { auth, navigation } = this.props;
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
        <StyledTextInput
            wrapperStyle={styles.interactionWrapper}
            style={styles.textInput}
            placeholderTextColor={colors.charcoalGrey(0.3)}
            selectionColor={colors.charcoalGrey()}
            returnKeyType="next"
            placeholder="password check"
            />    
        <StyledButton
           style={styles.SignUpButton}
           titleStyle={styles.SignUpButtonText}
           title="Sign Up"
           //onPress={this.handleImageButtonPress.bind(this)}
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
