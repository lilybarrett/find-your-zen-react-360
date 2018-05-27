import React from "react";
import { BaseButton } from "../../../components/index.js";

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
        marginTop: 30
      }}
    />
  )
}

export default ZenButton;