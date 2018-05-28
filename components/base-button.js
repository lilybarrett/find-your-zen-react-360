import React from "react";
import {
  VrButton,
  Text,
} from "react-360";
import { compose } from "recompose";
import { hideIfHome } from "../providers";

export default compose(
  hideIfHome,
)((props) => {
  const { text, textStyle } = props;
  return (
    <VrButton
      onClick={props.buttonClick}
      style={{
        width: 400
      }}>
        <Text
          style={[
            {
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