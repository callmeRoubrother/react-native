import React from 'react';
import { View, Text, Button } from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";

export default class Com extends React.Component {
  static navigationOptions = {
    title: '详情',
  };
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>这里是详情页面</Text>
        <Button
          title='点击返回'
          onPress={() => this.props.navigation.goBack()}
        ></Button>
      </View>
    )
  }
}