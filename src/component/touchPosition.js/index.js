import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import axios from 'axios'
import { createResponder } from 'react-native-gesture-responder';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      api: "192.168.43.57",
      port: "8000",
      gestureState: {},
      thumbSize: 70,
      thumbSizeColor: 'blue',
      left: 150,
      top: 150,
    }
  }
  ternRiAndLe = (x) => {
    if (x < 0) {
      const ternSpeed = Math.round(x * -1.65)
      if (30 < ternSpeed) return { ternType: "ternRight", ternSpeed }
    }
    if (x > 0) {
      const ternSpeed = Math.round(x * 1.65)
      if (30 < ternSpeed) return { ternType: "ternLeft", ternSpeed }
    }
  }

  moveFoAndBa = (y) => {
    if (y <= 0) {
      const speed = Math.round(y * -1.65)
      if (speed < 250) {
        return { moveType: "forward", speed }
      } return { moveType: "forward", speed: 250 }
    }
    if (y > 0) {
      const speed = Math.round(y * 1.65)
      if (speed < 250) {
        return { moveType: "backward", speed }
      } return { moveType: "backward", speed: 250 }
    }
  }
  componentWillMount() {
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,
      onResponderGrant: (evt, gestureState) => {
        this.setState({
          thumbSizeColor: 'red'
        })
      },
      onResponderMove: async (evt, gestureState) => {
        const { api, port } = this.state;
        var x = gestureState.dx
        var y = gestureState.dy
        const moveData = this.moveFoAndBa(y)
        const ternData = this.ternRiAndLe(x)
        const control = {
          ternType: ternData ? ternData.ternType : 'turnOffM2',
          ternSpeed: ternData ? ternData.ternSpeed : 0,
          speed: moveData.speed,
          moveType: moveData.moveType
        }

        try {
          await axios.post(`http://${api}:${port}/move-control`, control)
        } catch (err) {
          alert('server not connected.')
        }

        let { left, top } = this.state;
        left += (gestureState.moveX - gestureState.previousMoveX)
        top += (gestureState.moveY - gestureState.previousMoveY)

        this.setState({
          gestureState: {
            ...gestureState
          },
          speed: moveData && moveData.speed,
          tern: ternData && ternData.moveType,
          left, top
        })

      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: async (evt, gestureState) => {
        const { api, port } = this.state;
        try {
          await axios.post(`http://${api}:${port}/move-control`,
            { moveType: "stop", speed: 0, ternType: '', ternSpeed: 0 })
        } catch (err) {
          alert('server not connected.')
        }
        this.setState({
          thumbSizeColor: 'blue',
          gestureState: {
            ...gestureState
          },
          left: 150, top: 150,
        })
      },
      onResponderTerminate: (evt, gestureState) => {
      },
      onResponderSingleTapConfirmed: (evt, gestureState) => {
        // console.log('onResponderSingleTapConfirmed...' + JSON.stringify(gestureState));
      },
      // debug: true
    });
  }


  onPress = () => {
    console.log("here")
  }

  render() {
    const { thumbSize, thumbSizeColor } = this.state
    return (
      <View
        style={styles.container}
      >
        <View style={styles.tabBar}>
          <LabelView
            label='Speed'
            value={this.state.speed}
            x="km/h"
          />
          <LabelView
            label='Wheel Control'
            string={this.state.tern} />
        </View>
        <View
          style={{ height: 300, width: 300, backgroundColor: '#fff', margin: 35, borderRadius: 150, }}
          ref="circleControl"
        >
          <View
            {...this.gestureResponder}
            style={{
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              position: 'absolute',
              left: this.state.left - thumbSize / 2,
              top: this.state.top - thumbSize / 2,
              backgroundColor: thumbSizeColor
            }}
          />
        </View>
      </View>
    );
  }
}

class LabelView extends Component {
  render() {
    const number = this.props.value && this.props.value.toFixed()
    return (
      <View
        style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
        <Text >{this.props.label}</Text>
        <Text style={{ marginLeft: 4 }}>{this.props.string}{number}{this.props.x}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66ccff',
  },
  tabBar: {
    backgroundColor: '#9BC53D',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

// this.refs.circleControl.measure((ox, oy, width, height, px, py) => {
//   console.log("here", ox, oy, width, height, px, py)
// })
