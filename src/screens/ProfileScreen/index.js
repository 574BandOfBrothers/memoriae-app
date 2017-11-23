import React, { Component } from 'react';

import StyledTextInput from '../../components/StyledTextInput';
import StyledButton from '../../components/StyledButton';
import { textStyles, colors } from '../../helpers/styles';


import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>

        <StyledButton
           style={styles.SignOutButton}
           titleStyle={styles.SignOutButtonText}
           title="Sign Out"
           onPress={() => this.props.navigation.navigate('SignIn')}
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

export default ProfileScreen;
