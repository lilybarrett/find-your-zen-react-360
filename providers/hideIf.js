import React from "react";
import { branch, renderNothing } from "recompose";

const hideIf = (isConditionTrue) => 
    branch(
        isConditonTrue,
        renderNothing,
    );

export default hideIf;