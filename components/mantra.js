import React from "react";
import { Text } from "react-360";
import zens from "../consts/zens.js";
import { hideIfHome, usingAppContext } from "../providers/index.js";
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
              color: "lightcyan",
              fontSize: 50,
              fontWeight: "500",
              textAlign: "center",
              transform: [{translate: [0, 0, -3]}],
          }}>
            { text }
        </Text>
    )
});