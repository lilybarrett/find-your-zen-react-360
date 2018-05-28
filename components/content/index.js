import React from "react";
import { View } from "react-360";
import { HomeEnvironment, ZenEnvironment } from "../../scenes";
import { withAppContext } from "../../providers";

const AppContent = withAppContext(() => (
   <View>
        <HomeEnvironment />
        <ZenEnvironment />
   </View>
));

export default AppContent;