import React from "react";
import { branch, renderNothing } from "recompose";

const isNotHome = ((zen) => zen !== 4);
const hideIfNotHome = (isNotHome) => {
    return branch(
        isNotHome,
        renderNothing,
    );
}

export default hideIfNotHome;