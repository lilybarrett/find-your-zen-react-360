import React from "react";
import { View } from "react-360";
import { Mantra, HomeButton } from "./components/index.js";

const ZenEnvironment = () => (
    <View style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
    }}>
        <HomeButton />
        <Mantra />
    </View>
);

export default ZenEnvironment;