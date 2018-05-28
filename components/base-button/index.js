import React from "react";
import {
  VrButton,
  Text,
} from "react-360";
import { compose } from "recompose";
import { hideIfHome } from "../../providers";
import style from "./style";

export default compose(
  hideIfHome,
)((props) => {
  const { text, textStyle } = props;
  return (
    <VrButton
      onClick={props.buttonClick}
      style={style.button}>
        <Text
          style={[
            style.textDefault,
            textStyle,
          ]}>
            {text}
        </Text>
    </VrButton>
  )
});