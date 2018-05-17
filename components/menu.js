import React from "react";
import { hideIf, usingAppContext } from "../providers/index.js";
import { compose } from "recompose";
import { View, Text } from "react-360";
import { Zens, Title } from "../components/index.js";

const hideMenu = hideIf(({ selectedZen }) => selectedZen !== 4);

export default compose(
    usingAppContext,
    hideMenu,
)(({ selectedZen, children }) => {
    return (
        <View style={{
            height: 100,
            padding: 20,
            transform: [{translate: [300, 0, -1]}]}}>
            { children }
        </View>
    )
});
