import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import TouchPosition from './TouchPosition';
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchPosition />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BC53D',
  }
});
