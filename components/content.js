import React from "react";
import { View } from "react-360";
import { Zens, Mantra, Title, Menu, HomeButton, WrappedPano } from "./index.js";
import { withAppContext } from "../providers/index.js";

const AppContent = withAppContext(() => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <HomeButton />
        <Mantra />
        <Menu>
            <Title>Choose your zen</Title>
            <Zens />
        </Menu>
    </View>
));

export default AppContent;