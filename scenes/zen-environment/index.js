import React from "react";
import { View } from "react-360";
import { Mantra, HomeButton } from "./components";

const ZenEnvironment = () => (
    <View style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: [{translate: [150, 0, -100]}],
        marginTop: 80,
    }}>
        <HomeButton />
        <Mantra />
    </View>
);

export default ZenEnvironment;