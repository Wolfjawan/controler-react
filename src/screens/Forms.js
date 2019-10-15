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

class AddNewWordOrSentences extends React.Component {
  state = { hideNavBar: false, hideTabBar: false };

  render() {
    return (
      <View style={[styles.container, this.props.sceneStyle]}>
        <Text style={{ padding: 20, fontSize: 24, color: "#384E77" }}>
          AddNewWordOrSentences
        </Text>
      </View>
    );
  }
}
AddNewWordOrSentences.propTypes = propTypes;
AddNewWordOrSentences.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAD8DE"
  },
  button: {
    backgroundColor: "#384E77",
    borderRadius: 15,
    margin: 50,
    maxHeight: 100,
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 30,
    color: "white"
  }
});
export default AddNewWordOrSentences;
