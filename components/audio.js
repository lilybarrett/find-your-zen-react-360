import React from "react";
import { Sound } from "react-vr";
import { compose } from "recompose";
import { asset } from "react-vr";
import { hideIf } from "../providers/index.js";

const hideIfNoUrl = hideIf((props) => props.url === null || props.url === undefined || props.url.length === 0);

export default compose(
    hideIfNoUrl,
)((props) => {
    const { url } = props;
    return (
        <Sound source={asset(url)} />
    )
});
