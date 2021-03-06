import React, { Component } from "react";
window.navigator.userAgent = "react-native";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
  YellowBox
} from "react-native";
import axios from "axios";
import { createResponder } from "react-native-gesture-responder";
import io from "react-native-socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: "192.168.0.29",
      port: "8080",
      gestureState: {},
      thumbSize: 70,
      thumbSizeColor: "blue",
      left: 150,
      top: 150,
      socketIsConnected: false,
      control: {
        moveType: "stop",
        speed: 0,
        ternType: "",
        ternSpeed: 0
      }
    };

    this.socket = io("http://192.168.0.29:8080");
    this.socketEvents = [];
  }

  //clear socket events

  componentWillUnmount() {
    this.deinitialize();
  }

  deinitialize = () => {
    this.removeSocketEvents(this.socket, this.socketEvents);
  };

  removeSocketEvents = (socket, events) => {
    if (events.length > 0) {
      socket.off(events[0]);
      this.removeSocketEvents(socket, events.slice(1));
    }
  };

  ternRiAndLe = x => {
    if (x < 0) {
      const ternSpeed = Math.round(x * -1.65);
      if (30 < ternSpeed) return { ternType: "ternRight", ternSpeed };
    }
    if (x > 0) {
      const ternSpeed = Math.round(x * 1.65);
      if (30 < ternSpeed) return { ternType: "ternLeft", ternSpeed };
    }
  };

  moveFoAndBa = y => {
    if (y <= 0) {
      const speed = Math.round(y * -1.65);
      if (speed < 250) {
        return { moveType: "forward", speed };
      }
      return { moveType: "forward", speed: 250 };
    }
    if (y > 0) {
      const speed = Math.round(y * 1.65);
      if (speed < 250) {
        return { moveType: "backward", speed };
      }
      return { moveType: "backward", speed: 250 };
    }
  };

  UNSAFE_componentWillMount() {
    try {
      this.socket.on("connect", () => {
        this.setState({ socketIsConnected: true });
      });
      this.socket.emit("connected", "connected");
      this.socket.on("message", message => {
        console.log(message);
      });
      this.socket.on("disconnect", () => {
        this.setState({ socketIsConnected: false });
      });
      this.gestureResponder = createResponder({
        onStartShouldSetResponder: (evt, gestureState) => true,
        onStartShouldSetResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetResponder: (evt, gestureState) => true,
        onMoveShouldSetResponderCapture: (evt, gestureState) => true,
        onResponderGrant: (evt, gestureState) => {
          this.setState({
            thumbSizeColor: "red"
          });
        },
        onResponderMove: async (evt, gestureState) => {
          const { api, port } = this.state;
          var x = gestureState.dx;
          var y = gestureState.dy;
          const moveData = this.moveFoAndBa(y);
          const ternData = this.ternRiAndLe(x);
          const control = {
            ternType: ternData ? ternData.ternType : "turnOffM2",
            ternSpeed: ternData ? ternData.ternSpeed : 0,
            speed: moveData.speed,
            moveType: moveData.moveType
          };

          this.socket.emit("controller", control);
          let { left, top } = this.state;
          left += gestureState.moveX - gestureState.previousMoveX;
          top += gestureState.moveY - gestureState.previousMoveY;
          this.setState({
            gestureState: {
              ...gestureState
            },
            control,
            left,
            top
          });
        },
        onResponderTerminationRequest: (evt, gestureState) => true,
        onResponderRelease: async (evt, gestureState) => {
          const control = {
            moveType: "stop",
            speed: 0,
            ternType: "",
            ternSpeed: 0
          };
          this.socket.emit("controller", control);
          this.setState({
            thumbSizeColor: "blue",
            gestureState: {
              ...gestureState
            },
            control,
            left: 150,
            top: 150
          });
        },
        onResponderTerminate: (evt, gestureState) => {},
        onResponderSingleTapConfirmed: (evt, gestureState) => {}
      });
    } catch (err) {
      console.log({ ...err });
    }
  }

  render() {
    const {
      thumbSize,
      thumbSizeColor,
      socketIsConnected,
      control
    } = this.state;
    // if (!socketIsConnected) {
    //   return (
    //     <View style={styles.container}>
    //       <Text
    //         style={{
    //           textAlign: "center",
    //           marginTop: 40,
    //           fontSize: 40
    //         }}
    //       >
    //         Not connected
    //       </Text>
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <LabelView
            label="Server status:"
            string={socketIsConnected && "Connected"}
          />
          <LabelView label="Speed:" value={control.speed} />
          <LabelView label="Wheel:" value={control.moveType} />
          <LabelView label="Direction:" value={control.ternType} />
        </View>
        <View>
          <View
            style={{
              height: 300,
              width: 300,
              backgroundColor: "#fff",
              margin: 35,
              borderRadius: 150
            }}
            ref="circleControl"
          >
            <View
              {...this.gestureResponder}
              style={{
                width: thumbSize,
                height: thumbSize,
                borderRadius: thumbSize / 2,
                position: "absolute",
                left: this.state.left - thumbSize / 2,
                top: this.state.top - thumbSize / 2,
                backgroundColor: thumbSizeColor
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

class LabelView extends Component {
  render() {
    const { value, string, label } = this.props;
    return (
      <View style={{ flexDirection: "row", alignSelf: "stretch" }}>
        <Text>{label}</Text>
        <Text style={{ marginLeft: 4 }}>
          {string}
          {value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66ccff"
  },
  tabBar: {
    backgroundColor: "#9BC53D",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
