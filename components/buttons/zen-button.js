import React from "react";
import {
  VrButton,
  Text,
  View,
} from "react-vr";
import BaseButton from "./base-button.js";

const ZenButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <BaseButton
      text={text}
      selectedZen={selectedZen}
      buttonClick={buttonClick}
      textStyle={{
        backgroundColor: "#29ECCE",
        color: "white",
        marginTop: 0.03,
        transform: [{translate: [0, 0, -1]}]
      }}
    />
  )
}

export default ZenButton;