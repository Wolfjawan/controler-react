import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Animated,
  Dimensions
} from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";
import Nav from "./nav";
const { height: deviceHeight } = Dimensions.get("window");
class DrawerContent extends React.Component {
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

  closeModal = () => {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight
    }).start(Actions.pop);
  };

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
        <Nav />
        <View style={styles.main}>
          <Button style={styles.button} onPress={() => Actions.Controller()}>
            Controller
          </Button>
          <Button
            style={styles.button}
            onPress={() => {
              Actions.settings();
            }}
          >
            Settings
          </Button>
        </View>
        <Button style={styles.button} onPress={this.closeModal}>
          Exit
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  main: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 4
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#00A6A6"
  },
  footer: {
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
    flex: 1
  }
});
export default DrawerContent;
