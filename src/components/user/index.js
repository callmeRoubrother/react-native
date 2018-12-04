import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Com extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>这里是用户中心页面</Text>
        <Button
          title='点击跳转详情页面'
          onPress={() => this.props.navigation.navigate('Details')}
        ></Button>
      </View>
    )
  }
}