import React from "react";
import { hideIf } from "../providers/index.js";
import { compose } from "recompose";
import { View, Text } from "react-vr";

const hideMenu = hideIf((props) => props.selectedZen !== 4);

export default compose(
    hideMenu,
)((props) => {
    return (
        <View>
            {props.children}
        </View>
    )
});
