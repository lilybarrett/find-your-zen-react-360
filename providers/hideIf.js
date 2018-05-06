import React from "react";
import { branch, renderNothing } from "recompose";

const hideIf = (callback) =>
    branch(
        callback,
        renderNothing,
    );

export default hideIf;