import React from "react";
import {
  VrButton,
  View,
} from "react-360";
import { BaseButton } from "../../../components/index.js";
import { usingAppContext } from "../../../providers/index.js";
import zens from "../../../consts/zens.js";

export default usingAppContext(({ selectedZen, zenClicked }) => {
  return (
    <View style={{
      marginBottom: 30
    }}>
      <BaseButton
        selectedZen={selectedZen}
        buttonClick={() => {
          zenClicked(4);
        }}
        text={zens[3].text}
        textStyle={{
          color: "#29ECCE",
          backgroundColor: "white",
          textAlign: "center"}}
      />
    </View>
  )
});