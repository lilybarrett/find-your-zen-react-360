import React from "react";
import {
  VrButton,
  View,
} from "react-360";
import { BaseButton } from "../../../../components";
import { usingAppContext } from "../../../../providers";
import { zens } from "../../../../consts";
import style from "./style";

export default usingAppContext(({ selectedZen, zenClicked }) => {
  return (
    <View style={style.view}>
      <BaseButton
        selectedZen={selectedZen}
        buttonClick={() => {
          zenClicked(4);
        }}
        text={zens[3].text}
        textStyle={style.text}
      />
    </View>
  )
});