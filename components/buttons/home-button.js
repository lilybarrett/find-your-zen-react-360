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
    <View style={{marginBottom: 30}}>
      <BaseButton
        selectedZen={selectedZen}
        buttonClick={() => {
          zenClicked(4);
        }}
        text={zens[3].text}
        textStyle={{
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 100,
          color: "#29ECCE",
          backgroundColor: "white",
          width: 200,
          transform: [{translate: [400, 0, -3]}],
          textAlign: "center"}}
      />
    </View>
  )
});