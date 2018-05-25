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
              color: "#29ECCE",
              fontSize: 50,
              fontWeight: "500",
              textAlign: "center",
              marginTop: 80,
              width: 600,
          }}>
            { text }
        </Text>
    )
});