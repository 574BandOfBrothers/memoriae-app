import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppTabNavigator from './AppTabNavigator';
import SignStackNavigator from './SignStackNavigator';

class RootNavigation extends Component {
  render() {
    const { auth } = this.props;
    return (
      !true ?
      <SignStackNavigator onNavigationStateChange={null} />
      :
      <AppTabNavigator onNavigationStateChange={null} />
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  })
)(RootNavigation);
