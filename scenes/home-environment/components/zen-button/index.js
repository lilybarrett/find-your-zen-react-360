import React from "react";
import { BaseButton } from "../../../../components";
import style from "./style";

const ZenButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <BaseButton
      text={text}
      selectedZen={selectedZen}
      buttonClick={buttonClick}
      textStyle={style.text}
    />
  )
}

export default ZenButton;