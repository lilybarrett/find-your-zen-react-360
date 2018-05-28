import React from "react";
import { View } from "react-360";
import { Title, Menu, Zens } from "./components";

const HomeEnvironment = () => (
    <View>
        <Menu>
            <Title>Choose your zen</Title>
            <Zens />
        </Menu>
    </View>
);

export default HomeEnvironment;