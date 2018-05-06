import React from "react";
import { Pano } from "react-vr";
import { usingAppContext } from "../providers/index.js";
import { Audio } from "../components/index.js";
import zens from "../consts/zens.js";
import { asset } from "react-vr";

export default usingAppContext(({ selectedZen }) => {
    return (
        <Pano source={asset(zens[selectedZen - 1].image)} >
            <Audio />
        </Pano>
    )
});
