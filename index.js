import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  VrButton,
  Text,
  View,
  Sound,
  Image,
} from "react-360";
import zens from "./consts/zens.js";
import { Zens, Mantra, Title, Menu, HomeButton, WrappedPano } from "./components/index.js";
import { withState, withHandlers, compose } from "recompose";
import { withAppContext } from "./providers/index.js";

const MeditationApp = withAppContext(() => (
    <View>
      <HomeButton />
      <Mantra />
      <Menu>
          <Title>Choose your zen</Title>
          <Zens />
      </Menu>
  </View>
));

AppRegistry.registerComponent("MeditationApp", () => MeditationApp);
