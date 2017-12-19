import React from 'react';
import { Provider } from 'react-redux';
import { Text, View, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { fromJS } from 'immutable';

import { STORE_SESSION_TOKEN_KEY } from './helpers/constants';

import SourceSansProLight from './assets/fonts/SourceSansPro-Light.ttf';
import SourceSansProRegular from './assets/fonts/SourceSansPro-Regular.ttf';
import SourceSansProSemibold from './assets/fonts/SourceSansPro-Semibold.ttf';
import SourceSansProBold from './assets/fonts/SourceSansPro-Bold.ttf';

import api from './configs/api';
import configureStore from './store';
import RootNavigation from './navigation/RootNavigation';

let store;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'SourceSansPro-Light': SourceSansProLight,
      'SourceSansPro-Regular': SourceSansProRegular,
      'SourceSansPro-Semibold': SourceSansProSemibold,
      'SourceSansPro-Bold': SourceSansProBold,
    });

    let sessionTokens = await AsyncStorage.getItem(STORE_SESSION_TOKEN_KEY);

    sessionTokens = JSON.parse(sessionTokens);

    store = configureStore({
      auth: fromJS(sessionTokens || {}),
    });

    if (sessionTokens) {
      api.token = sessionTokens.accessToken;
    }

    this.setState({ appReady: true });
  }

  render() {
    return (
      this.state.appReady ? (
        <Provider store={store}><RootNavigation /></Provider>
      ) : (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }} >
          <Text>Yükleniyor</Text>
        </View>
      )
    )
  }
}

