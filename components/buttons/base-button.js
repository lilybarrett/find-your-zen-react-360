import React from "react";
import {
  VrButton,
  Text,
  View,
} from "react-360";
import { compose } from "recompose";
import { hideIfHome } from "../../providers/index.js";

export default compose(
  hideIfHome,
)((props) => {
  const { text, textStyle } = props;
  return (
    <VrButton
      onClick={props.buttonClick}
      style={{ width: 400 }}>
        <Text
          style={[
            {
              // flexDirection: "column",
              // alignItems: "stretch",
              // justifyContent: "flex-start",
              // textAlign: "center",
              color: "#f0fc",
              fontSize: 30,
              fontWeight: "400",
            },
            textStyle,
          ]}>
            {text}
        </Text>
    </VrButton>
  )
});