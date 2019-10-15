import React from "react";
import { Platform, DrawerLayoutAndroid } from "react-native";
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
import Words from "../screens/Words";
import AddNewWord from "../component/Forms/AddNewWord";
import AddNewSentence from "../component/Forms/AddNewSentence";
import Sentences from "../screens/Sentences";
import Settings from "../screens/Settings";
import Word from "../component/word";
import Sentence from "../component/sentence";
import Painting from "../screens/Painting";
const stateHandler = (prevState, newState, action) => {
  // console.log("onStateChange: ACTION:",newState);
};

const getSceneStyle = () => ({
  backgroundColor: "#CAD8DE"
});

const prefix = Platform.OS === "android" ? "mychat://mychat/" : "mychat://";

const Routs = ({}) => (
  <Router
    onStateChange={stateHandler}
    getSceneStyle={getSceneStyle}
    uriPrefix={prefix}
  >
    <Stack key="root" hideNavBar>
      <Drawer
        drawerPosition="right"
        renderNavigationView={() => navigationView}
        hideNavBar={true}
        key="drawer"
        onExit={() => console.log("Drawer closed")}
        onEnter={() => console.log("Drawer opened")}
        contentComponent={DrawerContent}
        drawerImage={MenuIcon}
        drawerWidth={300}
        onLeft={() => Actions.home_screen()}
        leftButtonImage={HomeIcon}
      >
        <Scene title="Home" key="home_screen" component={HomeScreen} />
        <Scene hideNavBar panHandlers={null}>
          <Tabs
            key="tab-bar"
            routeName="tab-bar"
            backToInitial
            swipeEnabled
            showLabel={false}
            activeBackgroundColor="white"
            inactiveBackgroundColor=""
            lazy={false}
            onTabOnPress={() => {
              console.log("Back to initial and also print this");
            }}
          >
            <Stack key="Words" title="Words" icon={TabIcon} component={Words} />
            <Stack
              key="Sentences"
              icon={TabIcon}
              title="Sentences"
              component={Sentences}
            />
            <Stack
              key="Controller"
              icon={TabIcon}
              title="Controller"
              component={Controller}
            />
            <Scene
              key="painting"
              icon={TabIcon}
              component={Painting}
              title="Paint board"
            />
          </Tabs>
        </Scene>
      </Drawer>
      <Scene key="add_new_word" component={AddNewWord} title="Add new word" />
      <Scene
        key="add_new_sentence"
        component={AddNewSentence}
        title="Add new Sentence"
      />
      <Scene key="wordId" component={Word} title="Word" />
      <Scene key="sentenceId" component={Sentence} title="Sentence" />
      <Scene key="settings" component={Settings} title="Settings" />
    </Stack>
  </Router>
);

export default Routs;
