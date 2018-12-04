import React from 'react';
import { createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import HomeScreen from '../home';
import KindScreen from '../kind';
import CartScreen from '../cart';
import UserScreen from '../user';
import DetailsScreen from '../detail';

// export default createBottomTabNavigator({
//   '首页': {
//     screen: HomeScreen,
//     navigationOptions: {
//
//     }
//   },
//   '分类': {
//     screen: KindScreen,
//   },
//   '购物车': {
//     screen: CartScreen,
//   },
//   '我的': {
//     screen: UserScreen,
//   },
// });

export default  Tab = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel: '首页',
      showLabel:false,
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    }
  },
  Kind: {
    screen: KindScreen,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel: '分类',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={focused ? 'ios-keypad' : 'ios-keypad-outline'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      tabBarLabel: '购物车',
      tabBarPosition: 'bottom',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={focused ? 'ios-cart' : 'ios-cart-outline'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    }
  },
  User: {
    screen: UserScreen,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarPosition: 'bottom',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    }
  },
  
}, {
  //是否可以滑动切换
  swipeEnabled: true,
  //切换是否有动画
  animationEnabled: true,
  //进入App的首页面
  initialRouteName: 'Home',
  //对于导航的设置
  tabBarOptions: {
    //android特有下划线的颜色1
    indicatorStyle: {height: 0},
    //文字的样式
    labelStyle: {
      fontSize: 10
    },
    //对于导航的stytles
    style :{
      borderTopColor:'#ebebeb',
      borderTopWidth:1,
      backgroundColor:'white',
      height:Dimensions.get('window').height*0.08,
    }
  }
});