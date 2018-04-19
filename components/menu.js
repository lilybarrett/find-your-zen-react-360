import React from "react";
import { hideIfNotHome } from "../providers/index.js";
import { compose } from "recompose";
import { View } from "react-vr";

export default compose(
    hideIfNotHome(props => props.selectedZen !== 4)
)(({
    children
}) => (
    <View>
        {children}
    </View>
));
