import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOutRequest } from '../../actions/auth';

import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';
import { textStyles, colors } from '../../helpers/styles';


import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class ProfileScreen extends Component {

  handleSignOut() {
    this.props.signOutRequest();
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>

        <StyledButton
           style={styles.SignOutButton}
           titleStyle={styles.SignOutButtonText}
           title="Sign Out"
           onPress={this.handleSignOut.bind(this)}
           //rightItem={<Image source={ListArrow} />} 
           />        

      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',  
  },

  SignOutButton: {
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

    SignUpButtonText: {
    textAlign: 'center', 
    color: colors.charcoalGrey(),

  },

});

export default connect(
  state => ({}),
  {
    signOutRequest,
  }
)(ProfileScreen);
