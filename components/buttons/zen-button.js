import React from "react";
import {
  VrButton,
  Text,
  View,
} from "react-360";
import BaseButton from "./base-button.js";

const ZenButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <BaseButton
      text={text}
      selectedZen={selectedZen}
      buttonClick={buttonClick}
      textStyle={{
        backgroundColor: "#29ECCE",
        textAlign: "center",
        color: "white",
        marginTop: 30,
        transform: [{translate: [0, 0, -1]}]
      }}
    />
  )
}

export default ZenButton;