import React from 'react';
import { View } from 'react-native';
import Router from './components/router';
import { Provider } from 'react-redux';
import store from './components/store';

export default class App extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <View style={{ flex: 1 }}>
          <Router></Router>
        </View>
      </Provider>
    )
  }
}