import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Forward from './component/forward';
import TouchPosition from './component/touchPosition.js/index';
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchPosition />
        {/* <View style={styles.touchPositionStyle}>
      </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BC53D',
  },
  touchPositionStyle: {
    width: 300,
    height: 300,
  },
});
