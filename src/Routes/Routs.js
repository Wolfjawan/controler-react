import React from "react";
import {
  Platform,
  DrawerLayoutAndroid,
  View,
  Text,
  StyleSheet
} from "react-native";
import {
  Scene,
  Router,
  Actions,
  Tabs,
  Drawer,
  Stack
} from "react-native-router-flux";
import Controller from "../component/touchPosition.js";
import DrawerContent from "../component/drawer/DrawerContent";
import TabIcon from "../component/TabIcon";
import MenuIcon from "../images/menu_burger.png";
import HomeIcon from "../images/icon-home.png";
import HomeScreen from "../screens/home";
import Settings from "../screens/Settings";

const stateHandler = (prevState, newState, action) => {
  // console.log("onStateChange: ACTION:",newState);
};

const getSceneStyle = () => ({
  backgroundColor: "#CAD8DE"
});

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

export default ({ closeApp }) => (
  <Router
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}
    navigationBarStyle={styles.navigationBarStyle}
    closeApp={closeApp}
    // onLeft={() => Actions.home_screen()}
    // leftButtonImage={HomeIcon}
  >
    <Stack key="root">
      <Drawer
        drawerPosition="right"
        renderNavigationView={() => navigationView}
        hideNavBar
        key="drawer"
        onExit={() => console.log("Drawer closed")}
        onEnter={() => console.log("Drawer opened")}
        contentComponent={DrawerContent}
        drawerImage={MenuIcon}
        drawerWidth={300}
      >
        <Stack>
          <Scene title="Home" key="home_screen" component={HomeScreen} />
          <Scene title="Settings" key="settings" component={Settings} />
          <Stack title="Controller" key="Controller" component={Controller} />
        </Stack>
      </Drawer>
    </Stack>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66ccff"
  },
  navigationBarStyle: {
    minHeight: 30,
    maxHeight: 30
  }
});
