import React from "react";
import {
  VrButton,
  View,
} from "react-360";
import { BaseButton } from "../../../components";
import { usingAppContext } from "../../../providers";
import { zens } from "../../../consts";

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