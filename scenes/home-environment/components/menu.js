import React from "react";
import { hideIf, usingAppContext } from "../../../providers/index.js";
import { compose } from "recompose";
import { View } from "react-360";

const hideMenu = hideIf(({ selectedZen }) => selectedZen !== 4);

export default compose(
    usingAppContext,
    hideMenu,
)(({ selectedZen, children }) => {
    return (
        <View style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            padding: 20}}>
            { children }
        </View>
    )
});
