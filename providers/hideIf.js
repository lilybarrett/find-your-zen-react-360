import React from "react";
import { branch, renderNothing } from "recompose";

const hideIf = (isConditionTrue) => 
    branch(
        isConditionTrue,
        renderNothing,
    );

export default hideIf;