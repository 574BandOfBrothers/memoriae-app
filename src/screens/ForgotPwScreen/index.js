import React, { Component } from 'react';
import { connect } from 'react-redux';

import { forgotPwRequest } from '../../actions/forgotPw';


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

class ForgotPwScreen extends Component {
  handleForgotPw() {
    this.props.forgotPwRequest();
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
        <StyledButton
           style={styles.ForgotPwButton}
           titleStyle={styles.ForgotPwButtonText}
           title="Forgot Password"
           //onPress={this.handleImageButtonPress.bind(this)}
           //rightItem={<Image source={ListArrow} />} 
           />
      </View>
    );
  }
}

ForgotPwScreen.navigationOptions = {
  title: 'Forgot Password',
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

  ForgotPwButton: {
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

    ForgotPwButtonText: {
    textAlign: 'center', 
  },

});



export default connect(
  state => ({
    auth: state.auth,
  }), {
    forgotPwRequest,
  }
)(ForgotPwScreen);
