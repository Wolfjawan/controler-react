import React, { Component } from "react";
import Router from "./src/Routes/index";
import { YellowBox, Animated, Dimensions, Actions } from "react-native";
YellowBox.ignoreWarnings([
  "Setting a timer",
  "componentWillReceiveProps is deprecated",
  "componentWillMount",
  "componentWillReceiveProps has been renamed",
  "Require cycle",
  "DrawerLayoutAndroid drawerPosition"
]);
const { height: deviceHeight } = Dimensions.get("window");
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight)
    };
  }

  UNSAFE_componentWillMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0
    }).start();
  }

  closeApp = () => {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight
    }).start(Actions.pop);
  };

  render() {
    return <Router closeApp={this.closeApp}/>;
  }
}
