import React from "react";
import { View } from "react-360";
import { Zens, Mantra, Title, Menu, HomeButton } from "./index.js";
import { HomeEnvironment, ZenEnvironment } from "../scenes/index.js";
import { withAppContext } from "../providers/index.js";

const AppContent = withAppContext(() => (
   <View>
        <HomeEnvironment />
        <ZenEnvironment />
   </View>
));

export default AppContent;