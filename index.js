/** @format */

import {AppRegistry} from 'react-native';
import App from './src/App';

//屏蔽警告的两行

//这里是用来测试合并git分支的文本

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
