/** @format */

import {AppRegistry} from 'react-native';
import App from './src/App';

//屏蔽警告的两行
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
