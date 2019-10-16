import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

class Nav extends Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  static contextTypes = {
    drawer: PropTypes.object
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Controller</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F49F0A",
    minHeight: 30,
    maxHeight: 30,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default Nav;
