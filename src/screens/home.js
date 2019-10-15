import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import Button from "../component/Elements/Button";
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
      <View style={[styles.container, this.props.sceneStyle]}>
        <Button
          text="Go to app"
          buttonStyle={styles.button}
          textStyle={styles.text}
          onPress={() => Actions.Words()}
        />
        <Text style={styles.homeText}>
          Robot controller
        </Text>
      </View>
    );
  }
}
NomeScreen.propTypes = propTypes;
NomeScreen.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    backgroundColor: "#CAD8DE"
  },
  button: {
    backgroundColor: "#384E77",
    borderRadius: 10,
    margin: 50,
    maxHeight: 50,
    alignItems: "center",
    padding: 10,
    bottom: 0
  },
  text: {
    fontSize: 20,
    color: "white"
  },
  homeText: {
    fontSize: 24,
    color: "#2C2C54",
    margin: 20,
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#EEC643",
    borderColor: "#9A031E"
  }
});

export default NomeScreen;
