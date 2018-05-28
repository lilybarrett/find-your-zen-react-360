import React from "react";
import { View,Text } from "react-360";
import { zens } from "../../../consts";
import { hideIfHome, usingAppContext } from "../../../providers";
import { compose } from "recompose";

export default compose(
    usingAppContext,
    hideIfHome,
)(({ selectedZen }) => {
    const text = zens[selectedZen - 1].mantra;
    return (
        <Text
            style={{
              backgroundColor: "transparent",
              color: "#29ECCE",
              fontSize: 50,
              fontWeight: "500",
              textAlign: "center",
            }}>
            { text }
        </Text>
    )
});