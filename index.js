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
import { Zens, Mantra, Title, Menu, HomeButton, WrappedPano, AppContent } from "./components/index.js";
import { withState, withHandlers, compose } from "recompose";
import { withAppContext } from "./providers/index.js";

const MeditationApp = withAppContext(() => (
    <View style={{transform: [
      {translate: [0, 0, -2]}
    ]}}>
      <AppContent />
    </View>
));


AppRegistry.registerComponent("AppContent", () => AppContent);
AppRegistry.registerComponent("MeditationApp", () => MeditationApp);
