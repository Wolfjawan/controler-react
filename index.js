import { AppRegistry } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';
import WidgetTask from "./widgetTask";

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('WidgetTask', () => WidgetTask);
