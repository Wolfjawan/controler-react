import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
  TouchableOpacity
} from "react-native";
import Button from "../component/Elements/Button";
import controllerIconIliPart from "../images/controller-icon-clipart.png";
import Connection_icon from "../images/Connection_icon.png";
import TestComponents from "../images/test_components.png";
import HelpIcon from '../images/Help-icon.png'
import { Actions } from "react-native-router-flux";
const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  sceneStyle: null
};

class NomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideNavBar: false, hideTabBar: false };
  }

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.Controller()}
        >
          <Image style={{ width: 100, height: 100 }} source={Connection_icon} />
          <Text>Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.Controller()}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={controllerIconIliPart}
          />
          <Text>Controller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.Controller()}
        >
          <Image style={{ width: 100, height: 100 }} source={TestComponents} />
          <Text>Test components</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Actions.Controller()}
        >
          <Image style={{ width: 100, height: 100 }} source={HelpIcon} />
          <Text>Help</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
NomeScreen.propTypes = propTypes;
NomeScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#CAD8DE"
  },
  button: {
    borderRadius: 10,
    maxHeight: 100,
    minHeight: 100,
    minWidth: 150,
    maxWidth: 150,
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: 20,
    bottom: 0
  },
  text: {
    fontSize: 20,
    color: "white"
  }
});

export default NomeScreen;
