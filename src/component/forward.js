import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import axios from 'axios';
import Slider from 'react-native-slider';

export default class Forward extends Component {
  state = {
    api: '192.168.43.57',
    port: '8000',
    value: 0,
  };
  onClick = code => {
    console.log('onclick', code);
    const {api, port} = this.state;
    axios
      .post(`http://${api}:${port}/save`, {code})
      .then(res => {
        console.log('res', res);
      })
      .catch(function(error) {
        console.log('error', error);
      });
  };

  onValueOneChange = async value => {
    var speed = value * 250;
    const {api, port} = this.state;
    console.log(speed);
    const controlSpeed = await axios.post(`http://${api}:${port}/save`, {
      speed,
      code: 10,
    });
    // console.log(controlSpeed)
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.onClick(4)}
          title="Start"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Slider
          value={this.state.value}
          onValueChange={value => this.onValueOneChange(value)}
        />
        <Button
          onPress={() => this.onClick(6)}
          title="Stop"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
