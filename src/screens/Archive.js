import React from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  ScrollView
} from "react-native";
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

class Archives extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <ScrollView>
          <Text>Archives</Text>
        </ScrollView>
      </View>
    );
  }
}
Archives.propTypes = propTypes;
Archives.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    backgroundColor: "#CAD8DE"
  },
  text: {
    color: "white",
    fontSize: 24
  },
  button: {
    backgroundColor: "#384E77",
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
    padding: 10
  }
});

export default Archives;
