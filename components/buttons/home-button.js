import React from "react";
import {
  VrButton,
  Text,
  View,
  Environment,
  asset,
} from "react-360";
import BaseButton from "./base-button.js";
import { usingAppContext } from "../../providers/index.js";
import zens from "../../consts/zens.js";

export default usingAppContext(({ selectedZen, zenClicked }) => {
  return (
    <View style={{marginBottom: 0.2}}>
      <BaseButton
        selectedZen={selectedZen}
        buttonClick={() => {
          Environment.setBackgroundImage(asset(zens[3].image));
          zenClicked(4)
        }}
        text={zens[3].text}
        textStyle={{
          backgroundColor: "white",
          color: "#29ECCE",
          marginTop: 0.05,
          transform: [{translate: [0, 0, -3]}]}}
      />
    </View>
  )
});