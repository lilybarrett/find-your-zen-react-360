import React from "react";
import { Sound } from "react-vr";
import { branch, renderNothing, compose } from "recompose";
import { hideIf } from "../providers/index.js";

const hideIfNoAudio = hideIf((props) => props.url === null && props.url === undefined && props.url === "");

export default compose(
    hideIfNoAudio,
)(({url}) => {
    return (
        <Sound source={url} />
    )
})